---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
title: iframe架构微前端实战
comments: 
lang: zh-CN
description: 前言最近看到了好几篇与为前端相关的文章，对于微前端的架构基本都提到了  方式，但最终也没看到那篇文章最后选择了  架构。既然如此，那我就来试试看用  实现微前端怎么样。项目介绍demo演示：https //notes.jindll.com/frame项目地址：https //github.com/luokaibin/miniWeb
---

## 前言

最近看到了好几篇与为前端相关的文章，对于微前端的架构基本都提到了 `iframe` 方式，但最终也没看到那篇文章最后选择了 `iframe` 架构。既然如此，那我就来试试看用 `iframe` 实现微前端怎么样。

## 项目介绍

demo演示：[https://notes.jindll.com/frame](https://notes.jindll.com/frame)

项目地址：[https://github.com/luokaibin/miniWeb](https://github.com/luokaibin/miniWeb)

![image-20200305000033162](https://static.jindll.com/notes/image-20200305000033162.png?imageView2/0/w/600/h/1000/q/75|imageslim)

![image-20200305000001482](https://static.jindll.com/notes/image-20200305000001482.png?imageView2/0/w/600/h/1000/q/75|imageslim)

项目可以分为两部分，一部分是统一的登陆注册入口，一分部是主要的管理内容区。

我计划是登陆注册部分、内容管理区的header和aside作为一个基础的框架项目（后续称之为父级项目），内容区（也是表格的那部分）根据业务来划分不同的子项目，然后用户访问不同的业务，父级项目通过 **iframe** 将不同的子项目加载进来。

## 预计目标

- 将一个大项目拆分成多个小项目，降低项目的维护复杂度
- 使各个业务最大程度地解耦，当一个业务进行迭代开发，或者多个业务同时进行迭代开发，避免各业务间互相影响，代码冲突等问题。
- 增量更新，独立部署，快速回滚。当各个业务开发完成或迭代完成后，可以将业务独立部署，无须牵扯其他业务。当上线后发现出现了问题，可以及时回退，不会造成其他不可预知问题。
- 技术栈无关。当一个项目变得庞大无比之后，强行统一技术栈也许并不是很合适，各个具体业务的目标要求也不一样，也许使用其他技术栈可以更好地去实现业务。
- 极速打包，优化加载速度。一个项目变得庞大之后，依赖也会越来越多，但这些依赖也许只是某个业务有用，但这些依赖最终都会被打包进项目，造成两个问题，(1) 项目打包速度越来越慢 (2) 打出来的包也越来越大, 浏览器加载速度也越来越慢。
- ......

## 实现思路

### 项目划分

整个 Demo 计划划分为一个父项目，两个子项目；子项目根据业务来划分，由于主要做演示用，Demo也比较简单，也没有严格根据业务区分；父项目包括登录、注册、找回密码、管理区的header和aside，子项目A为aside数据管理部分和首页部分，子项目B为个人中心和账号管理部分。

### 父子项目通信

微前端架构必然是会涉及到数据共享，业务通信。采用 iframe 作为微前端架构，可以使各个项目进行高度的独立，同时 iframe 也可以非常好的使阻止各个项目的JS、CSS间的互相影响；同时采用iframe作为微前端架构，也就意味着我们的所有项目没有必要部署在同一域名下，更直白点说，我们可以引入第三方产品，向外公开一套API，使第三方基于这套API进行开发，引入第三方产品，第三方产品可以自由部署。

这些是iframe的优点，但同时高度的独立，引入第三方产品，也造成项目间信息共享的不方便，域名等的不通也造成了，父项目不能去操作子项目的DOM，子项目不能访问父项目的本地 storage。基于此，我们需要引入一个新的API **postMessage** ，postMessage是H5引入的新的API，它可以使不同源的脚本可以安全地进行跨源通信，它可以很好支撑起我们父子项目间的信息共享，消息传递。

## 相关问题及解决方案

### 一、主内容区组件划分

![image-20200307232341533](https://static.jindll.com/notes/image-20200307232341533.png)

主内容区由四部分组成，header组件(对应的文件是 `/src/components/header.vue` )，aside组件(对应的文件是 `/src/components/menu.vue` )， 和面包屑导航与具体菜单项对应的欢迎部分组成；四部分在 `/src/views/main.vue` 中完成组装，面包屑没有单独提出来封装直接在 `main.vue` 中写的，欢迎部分是 `router-view`。

### 二、路由管理及父子通信

首先点击不同的菜单， “欢迎区域” 需要显示不同的页面，这些不同的页面我们根据业务划分在了不同的项目中，这些项目打包部署后，最后通过 **iframe** 去加载不同项目的线上地址。 

#### 第一步

所以第一步我们需要知道用户点击的是哪个菜单，最好的方式就是监听路由。

所以我们编写个 `/src/views/template.vue` 组件，在这个组件中监听路由变化。

```vue
<template>
  <div class="container">
    <iframe
      :src="src"
      name="content"
      seamless
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: undefined,
    };
  },
	watch: {
    $route() {
      
    },
  },
}
</script>

```

然后让所有菜单对应的路由渲染的组件都是 `template.vue` ，也就是说，父项目点击任何菜单都会跳转到 `template` 页面。

```js
[
  {
    path: '/data/table',
    name: 'Table',
    component: template,
    meta: {
      name: '表格管理',
      title: '表格管理',
      icon: 'fa fa-table',
      auth: true,
    },
  },
  {
    path: '/data/chart',
    name: 'Chart',
    component: template,
    meta: {
      name: '图表管理',
      title: '图表管理',
      icon: 'fa fa-bar-chart',
      auth: true,
    },
  },
]
```

如此一来，我们也可以成功的实现在 `template` 中监听路由变化。

#### 第二步

当我们监听到路由的变化后，我们第二步就需要知道这个路由属于那个子项目，项目地址是什么，然后将地址赋值给 `src` ，让 **iframe** 去加载子项目。

所以我们可以在路由的 `meta` 属性中在配置上对应的 `orgin` 子项目的地址；同时有可能子项目不一定部署在域名的根目录下，所以最好在提供一个 `pathName` 项目路径，所以路由就可以这么写

```js
/* router.js */
const itemA = {
  orgin:
    process.env.NODE_ENV === 'production'
      ? 'https://notes.jindll.com'
      : 'http://192.168.2.110:8128',
  pathName: '/itemA/',
}; // 配置不同环境的地址
export const menuRouter = [
  {
    path: '/',
    component: main,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: template,
        meta: {
          ...itemA,
          name: '首页',
          title: '欢迎使用',
          icon: 'fa fa-home',
          auth: true,
        },
      },
    ],
  },
];
```

然后 `template.vue` 中监听到路由变化后，就可以将子项目通过 **iframe** 加载进来了

```vue
export default {
  data() {
    return {
      src: undefined,
    };
  },
	watch: {
    $route() {
      this.init();
    },
  },
	methods: {
		init() {
      const { meta: { orgin, pathName } } = this.$route;
      this.src = `${orgin}${pathName};
    },
	}
}
```

#### 第三步

这里会出一个问题，当你第一次到template这个页面时，你会发现 `watch` 并不能监听到路由变化。这里有两种解决方法，第一种是在 `mounted` 生命周期执行的时候去调一次 `init()` 方法，第二种是 `iframe` 标签有一个 `onload` 方法，当 **iframe** 加载完成后执行，虽然第一次 `src` 是 `undefined` , 但 `onload` 依旧会触发。这里我选择的第二种解决方法。

`template.vue` 改动

```vue
<template>
  <div class="container">
    <iframe
      :src="src"
      name="content"
      @load="postMsg"
      seamless
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: undefined,
    };
  },
	watch: {
    $route() {
      this.init();
    },
  },
	methods: {
    postMsg() {
      this.init();
    },
		init() {
      const { meta: { orgin, pathName } } = this.$route;
      this.src = `${orgin}${pathName};
    },
	}
}
</script>

```

#### 第四步

至此，我们虽然成功的将子项目加载进来了，但加载进来的是子项目的首页，这并不是我们需要的，所以第一子项目的首页需要是空白的，第二把我们要展示的页面告诉子项目，让子项目去跳转；这里还有一种解决方法，就是将对应的子项目地址，组成 `src` 让 **iframe** 去加载，但由于 `src` 的改变会使 **iframe** 重新加载，页面空白，体验并不好，所以果断放弃。

所以接下来第一步，当路由改变的时候，我们需要判断项目地址有没有变，如果项目地址变了，直接修改 `src` ，重新加载另一个子项目，如果项目地址没有变，就直接去给子项目发消息，让子项目跳转对应页面。

`template.vue` 改动

```vue
<template>
  <div class="container">
    <iframe
      :src="src"
      name="content"
      @load="postMsg"
      seamless
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: undefined,
    };
  },
	watch: {
    $route() {
      this.init();
    },
  },
	methods: {
    postMsg() {
      this.init();
    },
		init() {
      const {
        path,
        name,
        meta: { orgin, pathName },
      } = this.$route;
      if (this.src === `${orgin}${pathName}`) {
        // 给子项目发消息
      } else {
        this.src = `${orgin}${pathName}`;
      }
    },
	}
}
</script>

```

然后第二步就该给子项目发消息了，父子项目通信工具使用的 `postMessage` , 这是H5新增的API，同时也支持跨窗口跨域通信。

给子项目发消息，首先得拿到子项目的窗口对象，所以在 `methods` 中再加个方法，获取子项目对象

```js
methods: {
  getIframe() {
    return window.frames['content'];
  },
}
```

然后再写个发消息的方法，它需要接收个消息内容，再给消息内容加个参数，子项目收到之后进行判断这个消息是我要的，并且确实是我发的。

```js
methods: {
  getIframe() {
    return window.frames['content'];
  },
  sendmessage(msg) {
    const content = this.getIframe();
    msg.source = 'main';
    const {
      meta: { orgin },
    } = this.$route;
    content.postMessage(msg, orgin);
  },
}
```

最后消息发送，`template.vue` 对应代码

```vue
<template>
  <div class="container">
    <iframe
      :src="src"
      name="content"
      @load="postMsg"
      seamless
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: undefined,
    };
  },
	watch: {
    $route() {
      this.init();
    },
  },
	methods: {
    getIframe() {
      return window.frames['content'];
    },
    sendmessage(msg) {
      const content = this.getIframe();
      msg.source = 'main';
      const {
        meta: { orgin },
      } = this.$route;
      content.postMessage(msg, orgin);
    },
    postMsg() {
      this.init();
    },
		init() {
      const {
        path,
        name,
        meta: { orgin, pathName },
      } = this.$route;
      if (this.src === `${orgin}${pathName}`) {
        this.sendmessage({ path, name });
      } else {
        this.src = `${orgin}${pathName}`;
      }
    },
	}
}
</script>

```

#### 第五步

当父项目发送消息成功之后，子项目就该接收消息进行跳转了；但还有前一个问题，**iframe** 加载默认地址也就是子项目的首页的时候，页面需要是空白的，也就是我们第四步开始说的那个场景。

保证子项目首页是空白的，也就是首页没内容，所以子项目的首页为(itemA和itemB一样) `/src/views/layout.vue`。

```vue
<template>
  <div class="fixedLayout">
    <router-view />
  </div>
</template>

<script>
export default {
};
</script>
```

`layout.vue` 中嵌了一个 `router-view` 这样我们也就可以在 `layout.vue` 中接收父项目的消息，控制跳转。

```vue
<template>
  <div class="fixedLayout">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    // receiveMsg 被触发的时候会被传进来一个 event 事件对象，event.data 就是父项目发的消息，在参数这里我进行了解构赋值
    receiveMsg({ data }) {
      // 父项目发消息的时候，我们加了一个source属性，所以在这里我们就可以根据source来判断这个消息是不是我们父项目发的
      if (data.source !== 'main') {
        return;
      }
      // 如果这个消息是父项目发的，我们就去消息中的name属性，这是我们父项目告诉子项目需要往那里跳转
      // 因为我父项目路由的name和子项目路由name是完全对应的所以我这里直接用name跳转了
      // 如果你的父项目路径和子项目不一样，这里你需要自行去映射，然后跳转
      const { name } = data;
      this.$router.push({ name });
    },
  },
  mounted() {
    // 监听 message 事件，当监听到父项目发消息过来之后，去执行 this.receiveMsg 方法
    window.addEventListener('message', this.receiveMsg);
  },
};
</script>
```

#### 第六步

至此，其实整个项目最核心的问题，我们已经解决了。项目开发过程中，也就是在开发环境时，我们通过iframe直接去加载子项目，生产环境时我们去加载子项目的线上地址，代码其实就是父项目 `router.js` 中的 `const itemA = ......` 那些，在哪里我们根绝环境设置了不同的地址。

然后我们使用 `postMessage` 构建起了父子通信的桥梁，并且因为 `postMessage` 是H5标准的一部分，它不会限制你的技术栈，它可以在 `Vue` `React` `angular` 三大前端框架间随意发送消息；第二点也由于他是H5标准的一部分，到目前为止，所有的浏览器已经都支持了 `postMessage` API。

![image-20200308152830958](https://static.jindll.com/notes/image-20200308152830958.png)

最核心的部分已经完了，接下来就是与交互有关的问题与解决方案了。

### 三、Dialog对话框的遮罩覆盖整个屏幕

在数据管理==》表格管理内，我们有一个新建按钮，当点击新建按钮后，会弹出一个 Dialog 对话框，在对话框我们可以进行数据录入。

首先我们需要明确一点，弹出的这个对话框，需要属于子项目；这个对话框输入子项目，一来业务划分更清晰，二来子项目可以拿到这个数据，相关处理也更方便。所以结论就是这个对话框的代码必须写在子项目中。

正常来说，子项目是父项目用 iframe 加载进来的，iframe 也就红色框起来这么大。那对话框的遮罩也就这么大。

![image-20200308154205316](https://static.jindll.com/notes/image-20200308154205316.png)

所以对话框的遮罩要覆盖住全屏，那么 iframe 的宽高就需要和屏幕宽高一样大（准确说是浏览器可视区域）；这里有两个实现方式：

1. 当用户点击新建按钮的时候，给父项目发个消息，让父项目去修改下 iframe 的宽高，然后子项目在同时在给自身添加 padding ，使内容区（表格部分）缩小到红框那个部分。
2. iframe 的宽高本身就和屏幕宽高相等，子项目给自身添加 padding ，使内容区缩小到红框部分；同时正常情况下，header、aside、面包屑的层级需要高于iframe的层级，如此，iframe 不会阻止这些区域的点击；当用户点了新建按钮，对话框出现的时候，给父项目发送一条消息，让父项目调高 iframe 的层级，如此，遮罩便可以覆盖全屏。

在这里，我最终选择了第二种方案，因为使用第一种方案时，由于 iframe 突然之间的宽高变化，会使得内容区一闪而过的宽高改变，用户体验很不好，所以最后我使用的第二种方案。

#### 第一步

那么第一步，我需要修改header、aside、面包屑的层级。这三个的层级我给的是2，iframe 的层级默认是1，这样正常情况，这三个就会在前方盖住 iframe。

改动代码 `/src/views/main.vue` ，这里删除了相对于这步来说不重要的代码。

```vue
<template>
  <el-container class="main_container">
    <!-- S header -->
    <el-header class="main_header">
      <MainHeader />
    </el-header><!-- E header -->
    <el-container class="main_content">
      <!-- S aside -->
      <el-aside class="main_aside">
        <Menu />
      </el-aside><!-- E aside -->
      <el-main class="main_primary">
        <!-- S 面包屑 -->
        <el-breadcrumb class="coutom_bread" separator="/">
          <el-breadcrumb-item
            v-for="item of breadcrumbList"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb><!-- E 面包屑 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.main_header {
  z-index: 2;
  height: 80px !important;
}
.main_aside {
  z-index: 2;
  width: 230px !important;
}
.main_primary {
  .coutom_bread {
    z-index: 2;
    height: 50px;
  }
}
</style>

```

#### 第二步

第二步就需要给 iframe 设置默认层级，和激活层级，同时监听子项目发送过来的消息。

改动代码 `/src/views/template.vue` , 这里删除与这步无关的代码

```vue
<template>
  <div class="container">
    <iframe
      :class="{ item: true, cover_item: isCoverIframe }"
      :src="src"
      frameborder="0"
      name="content"
      id="content"
      ref="content"
      @load="postMsg"
      seamless
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCoverIframe: false, // Iframe是否全屏
    };
  },
  mounted() {
    window.addEventListener('message', this.receiveMsg);
  },
  methods: {
    // 收到子窗口消息
    receiveMsg({ data }) {
      if (data.source !== 'content') {
        return;
      }
      const { action } = data;
      if (action === 'methodRun') {
        // 子级调用父级方法, 可以考虑是否可以接收数组, 一次调用多个方法, 方法是顺序执行, 还是Promise.all并行, 调用多个方法,参数如何接收
        // 子级要调用那个组件的方法等, 多预留扩展接口
        const { funName, params = undefined } = data;
        this[funName](params);
      }
    },
    // 设置Iframe全屏
    setIframeCover() {
      this.isCoverIframe = true;
    },
    // 取消Iframe全屏
    cancelIframeCover() {
      this.isCoverIframe = false;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}
.cover_item {
  z-index: 2;
}
</style>

```

以上代码，我们首先当 `mounted` 执行的时候，我们监听了 `message` 事件，当监听到有消息过来的时候，去执行 `this.receiveMsg` 方法，在 `receiveMsg` 方法内，我们进行了解构赋值，首先判断这是不是我们子项目发的消息，然后在取 `action` 判断子组件要做什么，是不是要调用父组件的方法，如果是的话，在取下 `funName` 和 `params` ，看子项目要调用父项目的那个方法，给这个方法的传参是什么，最后 `this[funName](params);` 去调用相应的方法，把参数传进去。

然后 `setIframeCover` 和 `cancelIframeCover` 方法，就是用来给 iframe 添加和取消一个class，改变iframe的层级。

#### 第三步

父项目相关内容我们修改好了，接下来就该修改子项目了，首先给子项目添加 `padding` ，使内容区缩小到红框部分，itemA 和 itemB 文件路径一样，都是 `/src/views/layout.vue` ，这里删除与这步无关的代码

```vue
<template>
  <div class="fixedLayout">
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.fixedLayout {
  box-sizing: border-box;
  padding-left: 230px;
  padding-top: 130px;
  width: 100vw;
  height: 100vh;
}
</style>

```

首先我这里 `padding` 值是固定的，因为我父项目是弹性盒布局，header、aside和面包屑的高是固定的，所以我子项目 `padding` 固定是没有问题的。

#### 第四步

最后就是子项目点击新建按钮，然后向父项目发消息了。修改代码itemA项目 `/src/views/tableManage.vue`

```vue
<script>
export default {
  methods: {
    openDialog() {
      top.postMessage(
        {
          source: 'content',
          action: 'methodRun',
          funName: 'setIframeCover',
        },
        this.topOrgin,
      );
    },
  },
};
</script>

```

要向父项目发消息，首先我们要拿到父项目的窗口对象，由于我这里只嵌套了一层 iframe，父项目窗口对象和顶层窗口对象是同一个，所以这里我取的 `top` ，消息内容 `action` 表示对应的动作，`funName` 表示要调用父项目方法的方法名；

`this.topOrgin` 是父项目地址，这个值是混入进来的，代码在 `/src/utils/mixin.js` 中，同时也区分环境。

#### 第五步

到这里遮罩覆盖全屏也解决了，但还有一些，数据添加完成之后再将遮罩取消，iframe 层级修改；添加完成之后，在页面显示个成功的提示消息。

剩下的这些，和覆盖全屏解决思路是一样的，无非还是发送消息；显示成功提示需要在调用父项目方法的时候在给传个参数，解决方法都是差不多的。

最后，解决 Dialog 对话框遮罩覆盖全屏也完了。

### 四、干掉 iframe 中的滚动条

由于各种原因你会发现你的 iframe 中出现了滚动条，但父项目也有滚动条，不必要的滚动条会使得感觉页面非常乱，所以我们就需要干掉一些没必要的滚动条，同时页面也要可以正常滚动。

改动代码 `/src/App.vue` ，两个子项目文件路径一样，这里删除了与这步无关的代码。

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  -ms-overflow-style: none; /* IE 和 Edge 浏览器隐藏滚动条 */
  scrollbar-width: none; /* FireFox隐藏浏览器滚动条 */
}
/* Chrome浏览器隐藏滚动条 */
#app::-webkit-scrollbar {
  display: none;
}
</style>

```

这几个隐藏滚动条的属性可以在任何地方用，不局限于 iframe 内。

## 总结

到这里，整个项目的核心部分其实也已经完成了，剩余的部分登陆功能，登录其实是本地，账号密码随便输入，点击登录之后我在Cookie中存了个状态，然后 domain 设置的顶级域名，这样子项目也可以访问Cookie；

第二个表格管理的数据是 Mock 生成的，对话框里的表单和表单管理的表单都是 element-UI 的组件，做了个判空校验。

图标管理的图表是用阿里的 `g2plot` ，数据也是写死的。

itemB项目的个人中心和账号管理，原本是想写内容的，但发现也无非是表格之类的内容，没有什么新的问题需要注意解决的了，也就没有写了。

另外这个demo写的时候也踩了很多坑，走了很多弯路，接下来再总结下。

### postMessage

第一个使用 `postMessage` 来发送消息，在 A窗口中要给B窗口发消息，那么得这么写 `Bwindow.postMessage()` ，`Bwindow` 就是B窗口对象，不能是 `window.postMessage()` 

### iframe

因为子项目和父项目地址不一样，也就是涉及到了跨域问题，跨域的时候父子项目均受跨域限制。

然后 `console.log` 去打印 `top` 和 `window.frames['content']` 会报错，我做的时候，想看下这个窗口对象中都有哪些内容，结果一直报错，最后甚至怀疑 `postMessage` 能不能用，到最后偶然间把 `console.log` 注释了，直接 `postMessage` 发消息，发现居然没有报错，猜测可能这里打印也受到了同源限制。

第二个与 iframe 有关的弯路是，最开始想测 `postMessage` 发消息，然后在父项目的 `mounted` 生命周期中，去拿子窗口对象，发消息，发现报错了，但是通过主动点击按钮发消息，又是没问题的；后来明白这里报错是因为 iframe 还没有加载完成，拿子项目窗口对象报的错，所以父项目给子项目发消息，一定要先确认 iframe 是否加载完成了。

### 对话框遮罩覆盖全屏

这里最开始我用的是方法一，结果发现由于 iframe 宽高突然之间的改变，会造成页面一闪而过的变化，严重影响用户体验，所以最后才又想到了方法二的解决方式，所以项目中可能还遗留部分走弯路踩坑过程中的无用代码。

### 对比

这块不是踩坑了，计划写与其他微前端架构方案的对比，但目前只用 iframe 实现了demo，其他方案的demo还没开始，所以这部分先空余，来总结下 iframe 的优缺点（其也不叫优缺点，主要是对预计目标的实现情况）

- 第一个优点就是业务间完全实现了解耦，完成了业务拆分
- 第二个优点是完全实现了增量更新，之后其他业务在进行迭代等操作，完全只需要业务项目自行打包部署，都其他业务的影响为0。
- 第三个iframe的物理隔离完全可以实现各项目的技术栈独立。
- 第四个至于极速打包，项目越拆越小，打包速度自然会提升。
- 第五个优点还有由于 iframe 的硬隔离使得各个项目的JS和CSS完全独立，不会产生样式污染和变量冲突
- 第六个不太好的地方是，业务完全解耦项目独立，那么各业务间的公共组件就不能共享了，只能各个业务去再次封装，但这个也不算缺点，只能说有一得必有一失，但总的看还是利大于弊

## 部署上线

最开始父子项目是想部署在不同的域名下的，这样可以演示跨域，但由于开发环境父子项目本来就是跨域的，又懒得再去配域名解析，所以最后就部署在了同一域名的不同路径下，这样也就个好处，就是同源，父子项目可以操作同一 Cookie 、storage、indexDB，本地数据共享比较方便。

## 遗留问题及优化方向

### 取消message事件监听

我们父项目和子项目都在 `mounted` 生命周期中通过 `window.addEventListener` 监听了 `message` 事件，但这个监听其实是绑在 `window` 上的，也就是用户不在这个页面了，监听依旧在进行，所以最好当页面销毁的时候，同时取消 `message` 事件监听，取消监听可以用 `removeEventListener` API

### 动态添加设置菜单栏

我们目前父项目的路由都是写死进项目的，这样如果之后再加新的子项目，或者侧边栏加入新内容，我们都需要再次修改父项目的路由，父项目也需要再次发版。

所以这个逻辑可以修改下，在添加个添加菜单管理路由管理的功能，仅针对开发人员开放，去实现通过功能去添加路由，然后调接口通过 `vue-router` 的 `addRoutes` API 去实现动态的添加路由。

### 将子项目和父项目做成模板

在技术栈相同的情况下，例如demo父项目和子项目都是Vue，而且子项目都有共同点就是要修改padding缩小至红框范围内，那为了方便之后新开项目，父项目和子项目就可以做成 Vue模板，用Vue-Cli去创建项目时直接去拉取指定的模板，省却再进行认为修改的过程，直接开箱即用。

### 二次封装postMessage

目前我们父项目和子项目接受和发送消息基本上是散落在各个页面中的，没有统一的方法，这样其实并不是特别好，所以可以考虑对 `postMessage` 进行二次封装，各组件页面发送接收消息走统一的方法，方便日后的维护和修改。

另一个可以考虑将 `postMessage` 封装成同步的形式，例如子项目需要获取父项目的数据，直接调用一个方法，这个方法直接将数据 `return` 回来，而不是子项目发消息要，父项目发消息子项目接收（这里的封装主要是把这一过程封装起来）。

### iframe无感切换

这个demo有两个子项目，可以很明显看到从一个子项目切换到另一个子项目，内容区会出现两三秒的空白，这体验就很不好，所以需要实现子项目间无感切换，去掉页面空白。这里可以考虑在父项目 `template.vue` 中显示多个 `iframe` 用 `keep-alive` 包裹起来，也就是提前将所有子项目加载进来，然后根据路由 `meta` 属性的 `orgin` 来决定显示哪一个 `iframe` ，这样提前将所有iframe加载进来，子项目间路由切换也可以去掉那两三秒的空白。
