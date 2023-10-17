## bun安装

根据官方教程安装即可。【安装完成之后需要根据控制台的指引，执行 `exec /bin/zsh` 添加环境变量】

## webWorker

### 如何注册一个 webworker?

```js
const worker = new Worker('js/upload.js')
```

- 其中 `js/upload.js` 是worker脚本的路径地址；在上面的例子上表示 【当前浏览器窗口的 `协议` + `域名` + `js/upload`】

### 如何让Worker工作？

1. 在worker 初始化的时候直接执行，例如

   ```js
   // js/upload.js
   const chunk = 1024 * 512; // 定义一些变量
   add(1,2) // 执行一些方法
   ```

2. 也可以由主线程发送消息给 worker ，Worker 收到消息后开始工作

   ```js
   // 主线程发送消息
   worker.postMessage({name: "files", files: e.target.files})
   
   // worker 接收消息 js/upload.js
   const handleFiles = (data) => {
     // ....
   }
   self.addEventListener('message', function (e) {
     //
     const data = e.data;
     handleFiles(data);
   }, false);
   ```

   > Self 指当前worker本身
   >
   > event.data 是消息的载体

### 主线程如何知道 worker 工作完毕

worker事件完成之后发消息给主线程，主线程接收处理结果

```javascript
// 主线程接收worker消息
const handleMessage = (data) => {
  // ...
}
worker.onmessage = (e) => {
  const data = e.data;
  handleMessage(data)
}

// worker 线程
const handleFiles = (data) => {
  self.postMessage({name: "upload-start", currNo: 0, chunkTotal: chunkTotal, fail: []})
}
```

> `worker.onmessage` 中的worker 指的是你注册的某一个worker实例。举例来说如果你注册了两个webworker
>
> ```javascript
> const worker1 = new Worker('js/upload.js')
> const worker2 = new Worker('js/upload2.js')
> ```
>
> 那你要监听worker1的消息就是
>
> ```javascript
> worker1.onmessage = (e) => {}
> ```
>
> 监听worker2就是
>
> ```javascript
> worker2.onmessage = (e) => {}
> ```

### worker 内能否使用三方插件？

可以，有两种方式 `importScripts` 和 `import`

1. importScripts 为常规导入，导入的脚本仅在当前 worker 生效，与常规使用 `<script src=""></script>` 相当

   ```javascript
   // 顶层导入
   importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.3.0/dist/pouchdb.min.js')
   
   // 使用脚本内的方法
   const db = new PouchDB('fileList')
   ```

   在脚本内定义 `PouchDB` 即可

   ```javascript
   // pouchdb.min.js
   class PouchDB {}
   ```

2. import 为模块导入，在注册 worker 时，需要声明类型

   ```javascript
   // type 默认为 classic ，仅支持 importScripts 导入脚本
   // 当声明为module时，仅支持import导入脚本
   const worker = new Worker('js/upload.js', {type: "module"})
   ```

   ```javascript
   // js/upload.js
   import PouchDB from 'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/+esm'
   
   // 使用脚本内的方法
   const db = new PouchDB('fileList')
   ```

   ```javascript
   // pouchdb.js
   class PouchDB {}
   
   export default PouchDB;
   ```

## 分片上传

### 如何对文件进行分片？

1. 先来个input文件选择框

   ```html
   <input type="file" id="file">
   ```

2. 拿到文件

   ```javascript
   const input = document.querySelector('#file');
   input.onchange = (e) => {
     const file = e.target.files[0];
     sliceFile(file)
   }
   const sliceFile = (file) => {
     // ...
   }
   ```

   > 拿到文件之后，就可以发消息给worker，由worker对文件进行切片上传

3. 对文件进行切片

   ```javascript
   // 定义每一片的大小
   const chunk = 1024 * 512; // 512kb为一片
   const sliceFile = (file) => {
     // 存放切片
     const arr = []
     // 定义切片的起止位置；即原文件的那个字节开始，到那个字节结束为一片
     let start = 0;end = start + chunk;
     // 设置切割的条件 只要开始字节小于文件的总字节数，就说明可以被切割
     // ? 如果开始位置已经等于或大于总字节数了，说明已经切割完成了
     while (start < file.size) {
       const chunkBlob = file.slice(start, end)
       arr.push(chunkBlob)
       start = start + chunk;
       end = start + chunk;
     }
   }
   ```

### 服务端如何知道切片序号，如何知道是哪个文件的切片？

如果以二进制流的形式给服务端，服务端确实不知道是哪个文件的，切片序号是什么；

但是我们可以以 `FormData` 的形式给服务端，除了二进制文件，我们可以传递其他信息；

```javascript
// 修改一下上面的代码
const chunk = 1024 * 512;
const sliceFile = (file) => {
  let start = 0;end = start + chunk;
  // + 新增代码，标记当前切片序号
  let num = 0;
  while (start < file.size) {
    const chunkBlob = file.slice(start, end)
    // + 新增代码 添加formdata
    const form = new FormData()
    // + 文件名
    form.append('filename', file.name);
    // + 切片 最后一个参数表示这个切片的源文件名 和 切片序号
    form.append('chunk', chunkBlob, `${file.name}/${num}`);
    // + 原文件大小
    form.append('totalSize', file.size);
    // + 上传切片
    fetch('/upload/chunk', {
      method: 'POST',
      body: form
    })
    start = start + chunk;
    end = start + chunk;
    num++
  }
}
```

### 服务端要如何接收切片？以 nodejs 为例

> 核心在于接收 multipart/form-data 格式的数据，和文件流的写入

使用 `formidable` 接收 `multipart/form-data` 格式的数据

```javascript
import formidable from 'formidable';

// 配置 formidable
const form = formidable({
  maxFileSize: 500*1024*1024, // 最大解析文件大小
  fileWriteStreamHandler: (file) => {
    // 拿到源文件名字
    const [finder, name] = file.originalFilename.split('/');
    // 以原文件名 建一个目录
    let dir = path.join(__dirname, 'assets', finder);
    fs.mkdirSync(dir, {recursive: true})
    // 生成切片存放位置
    const filePath = path.resolve(dir, name);
    // 生成一个可写流，将上传上来的文件流写道目标位置
    const upStream = fs.createWriteStream(filePath);
    return upStream;
}});

router.post('/upload/chunk', async (ctx, next) => {
  const paramsPromise = new Promise((resolve, reject) => {
    // 接收到的原始请求
    form.parse(ctx.req, (err, fields, files) => {
      resolve({
        filename: fields.filename[0],
        totalSize: Number(fields.totalSize[0])
      });
    });
  })
  const {filename, totalSize} = await paramsPromise
})
```

## 如何把切片了的文件下载下来，并把切片合并成源文件

> 前置条件知晓文件有多少个切片

1. 先来个下载按钮

   ```html
   <button class="down-btn" onclick="onDown('<%= item.name %>', '<%= item.chunkTotal %>')">下载</button>
   ```

2. 拿到文件名和总分片数

   ```javascript
   const onDown = (fileName, chunkTotal) => {
     // 这里可以交给 webworker
     // 生成一个与总分片数长度相等的数组
     const arr = new Array(chunkTotal);
     let i = 0;
     while (i <= chunkTotal) {
       // 下载切片 以arrayBuffer形式接收切片
       const res = await (await fetch(`/down/chunk/${fileName}/${i}`)).arrayBuffer();
       // 将切片放入存放切片的数组
       arr[i] = res;
       i++
     }
     // 切片下载完成之后，合并切片，还原文件
     const file = new Blob(arr);
     // 下载源文件
     const a = document.createElement('a');
     a.href = URL.createObjectURL(file)
     a.download = fileName
     const event = new MouseEvent('click');
     a.dispatchEvent(event);
   }
   ```

## 服务端如何下发切片

> 核心在于将文件转为可读流下发给客户端

```javascript
router.get('/down/chunk/:name/:currNo', async (ctx, next) => {
  // 获取切片位置
  const {name, currNo} = ctx.params;
  const chunkPath = path.join(__dirname, 'assets', name, currNo);
  // 读取切片
  const stream = fs.createReadStream(chunkPath);
  // 获取切片大小等信息
  const stat = fs.statSync(chunkPath);
  ctx.set({
    // 返回的数据格式为二进制流
    'Content-Type': 'application/octet-stream',
    'Content-Length': stat.size,
    // 返回的文件名
    'Content-Disposition': `attachment; filename="${currNo}"`,
  });
  // 返回一个二进制流
  ctx.body = stream;
})
```

## 分片的优点是什么？

> 针对大文件

1. 为断点续传做好基础；假设一个 1G 的文件在上传过程中失败，失败前已经上传了500M了，但是失败后只能重头再传；但是采用分片之后，可以近传未上传的部分
2. 并发，加速传输；对文件切片之后，可以多个切片一起上传；

## 如何并发传输切片

```javascript
class Upload {
  constructor() {
    // 定义待一个队列
    this.queue = [];
    // 定义并发数
    this.count = 0
  }
  // 需要上传时调用 代理上传上发
  proxyUpload(chunk, info) {
    const form = new FormData()
    form.append('name', info.name);
    form.append('currNo', info.currNo);
    form.append('size', info.size);
    form.append('chunkTotal', info.chunkTotal);
    form.append('file', chunk, `${info.name}/${info.currNo}`);
    // 将要上传的数据push进队列
    this.queue.push(form);
    // 调用切片上传
    this.uploadChunk();
  }
  // 上传切片
  async uploadChunk() {
    // 被调用时先判断是否已达最大并发量
    if (this.count > 8) return
    // 未达到最大并发量，则获取最早进入队列的数据 并发起上传
    const form = this.queue.shift()
    // 上传前并发数+1
    this.count++
    await fetch('/api/chunk-upload', {
      method: 'POST',
      body: form
    })
    // 上传结束后并发数 - 1
    this.count--
    // -1 之后如果并发小于设定量，并且队列还有待上传数据，则递归调用
    if (!(this.count > 8) && this.queue.length) {
      this.uploadChunk()
    }
  }
}
```

## 断点续传--上传

### 用户无需再次选择文件，既可自动续传

实现思路：将切片存在 indexDB 内，每上传完成一个就删除对应的切片；用户下次进来，检查是否还存在未上传的切片，如果存在则继续上传

### 用户再次选择文件，然后开始自动上传

实现思路：计算文件的md5值，存储这个md5值的切片上传进度，例如：有十个切片，现在上传到第5个，则记5；

用户再次选择文件，比较md5值，如果之前上传过，则查看之前上传到第几个切片，然后重新切片上传

## 断点续传--下载

下载则必须使用到IndexDB，将下载完成的切片存储到indexDB，用户再次下载时则获取下载的切片位置，接着继续下载即可

## service worker

与webworker相比，service worker 的【生命周期更长】，不会随着页面的销毁而销毁；页面关闭，service worker 可以继续在后台工作；以文件上传下载为例，页面关闭，它可以在后台继续完成上传下载。**【但是service worker 只能在https协议下工作，不同于webWorker可以在http协议下工作】**

### 如何注册一个 service worker？

```javascript
navigator.serviceWorker.register('service.worker.js', {type: 'module'})
```

> `service.worker.js` 表示脚本路径，等同于 `https://abc.com/service.worker.js` ，表示这个worker可以管理的范围是根目录，即根目录下所有路径，例如：它可以在 `/page1` `/page2` `/page/5` 下工作
>
> **注意：如果注册的脚本路径是 `/js/service.worker.js` 那这个 worker 的工作路径只能是 `/js` 及其子路径；例如：它可以在 `/js/a` `/js/b/c` 下工作，但不能在 `/page` 下工作 **

### 主线程如何向service worker 发送消息

1. 主线程向worker发送消息

   ```javascript
   // 1. 先拿到 service worker 的controller
   async postMessage = (message) => {
     let controller = navigator.serviceWorker.controller;
     if(!controller) {
       const res = await navigator.serviceWorker.ready;
       controller = res?.active;
     }
     controller.postMessage(message)
   }
   postMessage({name: "hello world", aaa: 1})
   ```

2. service worker 监听消息

   ```javascript
   self.addEventListener('message', (e) => {
     const data = e.data;
     console.log(data)
   })
   ```

### service worker 如何向主线程发送消息

与webWorker不同，一个service worker可能可以管理多个页面，也就是说，如果浏览器同时打开了 `/page1` `page1/list` 两个标签页，正巧我们注册的service worker可以管理这两个页面，那这里就存在我们是要同时给这两个标签页都发消息，还是只给某一个发消息；

1. 先拿到可以管理的所有标签页的client

   ```javascript
   const clients = await self.clients.matchAll({type: 'window'});
   ```

2. 如果我们要给所有的客户端都发送消息

   ```javascript
   clients.forEach(client => client.postMessage(message))
   ```

3. 如果我们只给某几个页面发送消息

   ```javascript
   const clientList = clients.filter(client => {
     return client.url.includes('/page1/list');
   })
   clientList.forEach(client => client.postMessage(message))
   ```

4. 主线程接收消息

   ```javascript
   navigator.serviceWorker.addEventListener('message', (e) => {
     const data = e.data;
     console.log('收到worker发送的消息', data)
   })
   ```

### worker 内是否可以使用三方插件

【可以】使用方式与webWorker一致

## 关于通知

浏览器想要使用通知功能，必须【**先向用户申请权限，申请权限的操作必须在主线程，也就是页面内申请，不能在worker内**】

```javascript
Notification.requestPermission().then(res => {
  console.log('申请结果', res)
})
```

申请结果 `res` 只有3个值 **`granted【同意】`** **`denied【拒绝】`** **`default【默认】`即用户没有做任何操作，关了申请弹窗**

- **`granted`** 用户下次进入页面，不会再申请权限，可以直接发送通知
- **`denied`** 用户下次进入页面，也不会再次申请权限，不能发送通知
- **`default`** 用户下次进入页面，会再次申请权限，在用户同意之前不能发送通知

> 用户可以重置或修改权限
>
> <img src="https://static.jindll.com/notes/image-20230925163729540.png" alt="image-20230925163729540" style="zoom:25%;" />

### 主线程发送通知

```javascript
const sendNotification = (message, options) => {
  // 如果没有权限，则什么都不做
  if (Notification.permission !== 'granted') return;
  return new Notification(message, options)
}
const notify = sendNotification('hello world')
```

### 主线程处理通知被点击

```javascript
// data 是通知携带的数据载体，固定字段
const notify = sendNotification('hello world', {data: {id: 'hello'}})
notify.addEventListener('click', (event) => {
  console.log('通知被点击', event)
})
```

### worker 发送通知

```javascript
const showNotification = async (message, options) => {
  if (self.Notification.permission !== 'granted') return;
  // 和主线程发送通知不一样
  self.registration.showNotification(message, options)
}
```

### worker 处理通知被点击

```javascript
showNotification('hello world', {data: {id: 'hello'}})
self.addEventListener("notificationclick", (event) => {
  // 关闭通知
  event.notification.close();
});
```

### worker 内通知被点击，想要打开对应的页面怎么做

```javascript
self.addEventListener("notificationclick", (event) => {
  // waitUntil()该方法通知事件分发器该事件仍在进行
  event.waitUntil(
    clients.matchAll({
        type: "window",
        includeUncontrolled: true, 
      })
      .then((clientList) => {
        for (const client of clientList) {
        	// 如果存在对应页面，对应页面就使其聚焦
          if (client.url.includes('/page1') && "focus" in client) return client.focus();
        }
        // 否则就打开具体页面
        if (clients.openWindow) return clients.openWindow('/page1');
      })
  );
});
```

- **`client.focus()`** 使窗口聚焦
- **`clients.openWindow('/page1')`** 打开页面

## 原生的webComponent

1. 必须继承 **`HTMLElement`**

   ```javascript
   class BaseItem extends HTMLElement {
     constructor() {
       super()
       const content = document.createElement('div')
       content.textContent = 'hello webComponent'
       this.attachShadow( { mode: 'closed' } ).appendChild(content)
     }
   }
   ```

2. 注册 webComponent

   ```javascript
   window.customElements.define('base-item', BaseItem);
   ```

   > 然后就可以在页面中使用 **`<base-item></base-item>`**

### 如何接收外部传入的参数，希望外部参数变了可以组件重新渲染

- webComponent 提供了一个静态方法 `observedAttributes` 用来观察属性变化

- 提供了一个属性变化时的回调函数 `attributeChangedCallback`

```javascript
class BaseItem extends HTMLElement {
  constructor() {
    super()
    const content = document.createElement('div')
    content.textContent = 'hello webComponent'
    this.attachShadow( { mode: 'closed' } ).appendChild(content)
  }
  // name 发生变化的属性名
  // oldVal 变化前的值
  // newVal 变化后的值
  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'text') {
      this.textContent = newVal
    }
  }
  static get observedAttributes() {
    // 监听 text 属性变化
    return ['text'];
  }
}
```

### webComponent发生点击事件后，外部如何响应

webComponent 向外部抛出自定义事件

```javascript
class BaseItem extends HTMLElement {
  constructor() {
    super()
    const content = document.createElement('div')
    content.textContent = 'hello webComponent'
    content.addEventListener('click', this.onActionClick)
    this.attachShadow( { mode: 'closed' } ).appendChild(content)
  }
  // 这里用箭头函数是为了拿到组件的this，如果不用箭头函数，拿到的是发生点击事件的元素
  onActionClick = () => {
    const event = new CustomEvent('action', {
      detail: {
        name: '组件内向外抛出的事件'
      }
    })
    this.dispatchEvent(event);
  }
  // name 发生变化的属性名
  // oldVal 变化前的值
  // newVal 变化后的值
  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'text') {
      this.textContent = newVal
    }
  }
  static get observedAttributes() {
    // 监听 text 属性变化
    return ['text'];
  }
}
```

外部监听 `action` 事件

```javascript
const itemEl = document.querySelector('base-item')
itemEl.addEventListener('action', (event) => {
  console.log('组件内抛出的事件', event.detail)
})
```

