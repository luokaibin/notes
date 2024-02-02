---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
title: 仿EventBus实现小程序兄弟组件传值
post_title: 仿EventBus实现小程序兄弟组件传值
comments: 
lang: zh-CN
description: 背景公司业务中有个场景，需要在用户点击标签的时候，把标签内容进行处理成类似微博话题的形式，插入到  中。 和标签是页面的两个组件，正常情况我可以点击标签后向外抛出事件，页面去监听，然后再把数据传给  ，但这样的处理麻烦，所以就想仿照 Vue 的 EventBus 来实现小程序的兄弟组件传值。
---

## 背景

公司业务中有个场景，需要在用户点击标签的时候，把标签内容进行处理成类似微博话题的形式，插入到 `textarea` 中。`textarea` 和标签是页面的两个组件，正常情况我可以点击标签后向外抛出事件，页面去监听，然后再把数据传给 `textarea` ，但这样的处理麻烦，所以就想仿照 Vue 的 EventBus 来实现小程序的兄弟组件传值。

首先先看下demo：

![2020042801](https://static.jindll.com/notes/2020042801.gif?123)

标签的部分和输入框部分是页面的两个组件，我们要做的就是点击标签的时候，将标签的内容添加到输入框中。

## 实现思路

实现方式一：点击标签的时候，拿到标签的文本内容，然后调用微信的 `triggerEvent` API 向外抛出一个事件；然后在页面中监听这个事件，拿到标签组件抛出的标签文本后，将其设置进页面的 data 中，然后将其传给 输入框组件，输入框组件通过 `observers` 监听传入的文本数据，最后将其拼好，赋值给输入框的的 value。

方式一是很容易想到的方案，但是缺点很明显，实现的过程太过于繁琐了，所以方式一直接 pass，我们重点来研究另一个实现方案——EventBus。

实现方式二：方式二我们就仿照 Vue 的 EventBus 来实现兄弟组件传值，实质其实利用发布订阅模式。

首先是当我们点击标签的时候，我们需要向外触发一个事件，然后把标签的内容携带过去，它就是消息的发布者；然后我们需要在 textarea 组件内监听标签组件触发的事件，然后接收标签的内容，他是消息的订阅者。我们需要实现的就是标签组件和 textarea 通信的桥梁。

> 组件我已经写好了，文末附有 demo 的 github 地址，我下面只展示关键代码，组件基础代码就不演示了。

## 编写订阅者

首先，我们需要一个对象，这个对象给我们提供了一个 **`on`** 方法，用来让我们监听另一个组件触发的事件。所以这个 `on` 方法需要接收两个参数，一个是我们要监听的事件名字，另一个参数是函数，当事件被触发的时候，通过这个函数来通知我们。

我们需要把订阅写在组件的生命周期内，确保另一个组件抛出事件时，我们是订阅过的。

```js
// textArea组件的JS
import bus from '../../utils/eventbus'; // 这里的代码还没写，我们先假定提供订阅API的对象是这个js模块提供的
Component({
  data: {},
  lifetimes: {
    ready() {
      // 当组件的ready生命周期执行的时候，我们通过bus对象提供的on方法去订阅了sendTag事件
      // 当sendTag事件被触发的时候，我们给它提供了一个函数，这个函数接收个tagText参数，这个就是标签组件被点击要传递的内容
      // 我们这里订阅的是sendTag事件，那么也就是要求标签被点击的时候也必须向外抛出sendTag事件
      bus.on('sendTag', tagText => {
        console.log(tagText);
      });
    },
  },
  methods: {}
})
```

接下来，我们编写 eventbus 模块，首先这个模块最终必须向外暴露一个对象，这个对象必须拥有 on 方法。

```js
// eventbus.js
class Bus {
  on(Event, cb) {
  }
}
export default new Bus();
```

我们继续分析 on 方法，我们需要将 Event 作为 key，cb 作为 value 存起来，这样当发布者发布消息（向外触发事件）的时候，我们找到对应的事件，然后去执行对应的方法就行。

为了通用性，同一个事件可能有多个订阅者，比如下面还有三个 textarea 组件，都需要在标签被点击的时候拿到标签内容，所以，我们就需要一个数组，把多个订阅者都放里面。

```js
class Bus {
  constructor() {
    // events 是一个容器，里面放的是，各个事件和它的订阅者，数据格式如：
    /**
    	this.events = {
    		sendTag: [cb1,cb2,cb3],
    		sendMsg: [cb4,cb5,cb6]
    	};
    */
    // 当然也可以直接this.sendTag = [cb1,cb2,cb3];个人习惯不同，我更喜欢放的容器内
    this.events = {};
  }
  on(Event, cb) {
    if(this.events[Event]) {
      // 如果这个事件存在，那说明之前已经有订阅者了，此时只需要将这个订阅者再push进去即可
      // this.events[Event] 是ES6的写法，可以百度搜索 ES6熟悉名表达式了解
      // 如果传进来的 Event 是 ‘sendTag’，this.events[Event] 就是 this.events.sendTag，也就在 events 对象上加了一个 sendTag 属性
      this.events[Event].push(cb);
    } else {
      // 如果这个事件不存在，那我们就需要对其初始化，将我们作为第一个订阅者，放到数组中赋给这个事件
      this.events[Event] = [cb];
    }
  }
}
export default new Bus();
```

## 编写发布者

在上面我们实现了基础的订阅功能，接下来我们需要实现发布的功能。

首先，我们需要 `bus` 对象再给我们提供一个 **`emit`** 方法，这个方法也接收两个参数，第一个参数是我们发布消息时的事件名字（向外触发事件时的事件name），第二个参数是发布事件时要传递的参数，当然你也可以不传递参数。

我们需要在标签被点击的时候，调用 `emit` 方法向外触发事件

```html
<!-- 标签对应的组件 -->
<view class="container">
  <view class="label">Tags</view>
  <view class="tags">
		<!-- bindtap="clickTag" 标签的点击事件-->
    <!-- data-tag="{{item}}" 标签被点击的时候，在事件对象内加一个 tag 属性，值就是标签的文本内容，小程序文档：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html -->
    <view
      class="tag"
      wx:for="{{tags}}"
      wx:key="index"
      bindtap="clickTag"
      data-tag="{{item}}">{{item}}</view>
  </view>
</view>
```

```js
// 标签组件对应的 js 逻辑
// 引入 bus 对象
import bus from '../../utils/eventbus';
Component({
  data: {
    tags: ["被骂哭的导盲犬主", "全国65亿网民月", "鲍毓明养女发声", "大学没有谈过恋爱", "多名学生曝被班主", "林奕含去世三周年", "李国庆发人事调整", "肖战发声", "和对象一起长胖是", "奔跑吧", "最春天的照片", "张杰爱人啊", "拔牙后千万不要嗜睡", "中国第四个新冠疫", "蒋凡被除名合伙人"]
  },
  methods: {
    clickTag({target: {dataset: {tag}}}) {
      // 当标签被点击的时候，调用 bus 的 emit 方法，然后向外抛一个 sendTag 事件，同时把标签内容传出去
      // 抛出的事件一定要和监听事件对应起来，呃。。。。。
      bus.emit('sendTag', `#${tag}#`);
    }
  }
})
```

接下来在 `bus` 对象上增加一个 `emit` 方法。

```js
class Bus {
  constructor() {
    // events 是一个容器，里面放的是，各个事件和它的订阅者，数据格式如：
    /**
    	this.events = {
    		sendTag: [cb1,cb2,cb3],
    		sendMsg: [cb4,cb5,cb6]
    	};
    */
    // 当然也可以直接this.sendTag = [cb1,cb2,cb3];个人习惯不同，我更喜欢放的容器内
    this.events = {};
  }
  // 新加的 emit 方法
  emit(Event, obj) {
  }
  on(Event, cb) {
    if(this.events[Event]) {
      // 如果这个事件存在，那说明之前已经有订阅者了，此时只需要将这个订阅者再push进去即可
      // this.events[Event] 是ES6的写法，可以百度搜索 ES6熟悉名表达式了解
      // 如果传进来的 Event 是 ‘sendTag’，this.events[Event] 就是 this.events.sendTag，也就在 events 对象上加了一个 sendTag 属性
      this.events[Event].push(cb);
    } else {
      // 如果这个事件不存在，那我们就需要对其初始化，将我们作为第一个订阅者，放到数组中赋给这个事件
      this.events[Event] = [cb];
    }
  }
}
export default new Bus();
```

接下来，继续分析 `emit` 方法需要完成什么工作

当 `emit` 方法被调用的时候，说明有人需要向外发布消息了，这个时候我们需要从 `events` 对象上找到对应的事件（`events[event]`），然后去通知所有订阅了这个事件的订阅者（`events[event]` 的 value 是数组，数组元素是这个订阅者提供的通知他们的函数，所以就是遍历这个数组，挨个调用这些函数，再把发布者传递的内容传入这些函数内）

```js
class Bus {
  constructor() {
    // events 是一个容器，里面放的是，各个事件和它的订阅者，数据格式如：
    /**
    	this.events = {
    		sendTag: [cb1,cb2,cb3],
    		sendMsg: [cb4,cb5,cb6]
    	};
    */
    // 当然也可以直接this.sendTag = [cb1,cb2,cb3];个人习惯不同，我更喜欢放的容器内
    this.events = {};
  }
  // 新加的 emit 方法
  emit(Event, obj) {
    // 如果要发布的这个事件不存在，说明这个事件没有订阅者，直接 return ，什么都不需要做
    if(!this.events[Event]) return
    // 这个事件存在，说明它是有订阅者的，我们去遍历它，然后再把发布者要传递的内容传入这些订阅者提供的函数内
    this.events[Event].forEach(cb => {
      cb(obj)
    })
  }
  on(Event, cb) {
    if(this.events[Event]) {
      // 如果这个事件存在，那说明之前已经有订阅者了，此时只需要将这个订阅者再push进去即可
      // this.events[Event] 是ES6的写法，可以百度搜索 ES6熟悉名表达式了解
      // 如果传进来的 Event 是 ‘sendTag’，this.events[Event] 就是 this.events.sendTag，也就在 events 对象上加了一个 sendTag 属性
      this.events[Event].push(cb);
    } else {
      // 如果这个事件不存在，那我们就需要对其初始化，将我们作为第一个订阅者，放到数组中赋给这个事件
      this.events[Event] = [cb];
    }
  }
}
export default new Bus();
```

编写完成这一部分，我们就可以先看下效果了

![2020050101](https://static.jindll.com/notes/temp/2020050101.gif?gf)

## 编写业务

可以看到，通过上方的代码，我们算是基本实现了两个组件间的通信，接下来，我们继续完善 `textarea` 的代码，我们监听到 `sendTag` 事件被触发的时候，需要把另一个组件传过来的值添加到输入框中

```html
<!-- textarea 组件模板 -->
<view class="container">
  <view class="label">内容</view>
  <!-- value="{{value}}" 控制输入框的内容 -->
  <textarea
    class="textarea"
    placeholder="请输入内容。。。"
    value="{{value}}"
    show-confirm-bar="{{false}}"
    bindinput="handleInput"></textarea>
</view>
```

```js
// textArea组件的JS
import bus from '../../utils/eventbus'; // 这里的代码还没写，我们先假定提供订阅API的对象是这个js模块提供的
Component({
  data: {
    value: ''
  },
  lifetimes: {
    ready() {
      // 当组件的ready生命周期执行的时候，我们通过bus对象提供的on方法去订阅了sendTag事件
      // 当sendTag事件被触发的时候，我们给它提供了一个函数，这个函数接收个tagText参数，这个就是标签组件被点击要传递的内容
      // 我们这里订阅的是sendTag事件，那么也就是要求标签被点击的时候也必须向外抛出sendTag事件
      bus.on('sendTag', tagText => {
        const {value} = this.data;
        this.setData({
          value: `${value} ${tagText} `
        });
      });
    },
  },
  methods: {
    handleInput({detail: {value}}) {
      this.setData({value});
    },
  }
})
```

我们再看下此时的效果

![2020050102](https://static.jindll.com/notes/temp/2020050102.gif)

## 修改bug

通过上面的演示，似乎已经完成了我们的需求了，但实际上其实还隐藏着一个bug，我们在订阅的代码里，打印一下传递过来的参数和当前的 this

```js
bus.on('sendTag', tagText => {
  console.log(tagText,this);
  const {value} = this.data;
  this.setData({
    value: `${value} ${tagText} `
  })
});
```

然后我们看一下 bug 是什么

![2020050103](https://static.jindll.com/notes/temp/2020050103.gif)

可以看到我们第一次进入这个页面点击标签的时候，控制台纸打印了一条记录；第二次进入这个页面点击标签时，控制台打印了两次；第三次进入点击标签打印了三条记录，但我们每次进入都是只点击了一次标签，为什么会打印多条记录呢。

同时通过查看第三次进入页面点击标签时控制台打印的三条记录，我们可以发现，第三条记录才是我们输入框内显示的内容；而第二条记录是第二次输入框的内容加上第三次进入页面所点击标签的内容；第一条记录是第一次输入框内容，加上第二次第三次进入页面所点击标签的内容。

所以我们可以确定这个 bug 产生的原因是因为我们返回的时候，页面销毁了，但是本次订阅的事件并没有取消订阅，且订阅的函数内 存在对当前组件 this 的引用，所以出现了点击一次标签，对应事件被多次触发的情况。

为了解决这个问题，我们就需要在当前页面被销毁组件被从页面移除时，取消对应的时间订阅。

## 取消事件订阅

取消事件订阅实质也就是把这个订阅函数从 `events[event]` 的数组中删除，这就要求我们订阅时提供的函数和取消订阅时提供的函数是同一个，**怎么保证是同一个，两次提供的函数内存地址相同。**

取消订阅的方法我们取名叫 **`off`** ，同样接收两个参数，第一个订阅时的事件名，第二个参数订阅时提供的函数

（为了使代码看起来比较清晰，我仅展示了关键代码）

```js
import bus from '../../utils/eventbus';
Component({
  data: {},
  lifetimes: {
    ready() {
      // 组件 ready 生命周期执行时进行订阅，订阅的方法是 this.handleTag
      bus.on('sendTag', this.handleTag);
    },
    detached() {
      // 组件销毁时进行取消订阅，方法同样是 this.handleTag
      bus.off('sendTag', this.handleTag)
    }
  },
  methods: {
    handleTag(tagText) {
      // 这里专门把 this 打印出来，是因为这里存在一个 this 指向的问题
      console.log(tagText, this)
    }
  }
})
```

我们再编写一下 bus （为了使代码看起来比较清晰，我仅展示了关键代码）

```js
class Bus {
  constructor() {
    // events 是一个容器，里面放的是，各个事件和它的订阅者，数据格式如：
    /**
    	this.events = {
    		sendTag: [cb1,cb2,cb3],
    		sendMsg: [cb4,cb5,cb6]
    	};
    */
    // 当然也可以直接this.sendTag = [cb1,cb2,cb3];个人习惯不同，我更喜欢放的容器内
    this.events = {};
  }
  // 取消订阅
  off(Event,cb) {
    // 如果要取消的这个事件不存在，说明这个事件一直都没有订阅者，直接 return ，什么都不需要做
    if(!this.events[Event]) return
    // 根据你提供的 你在订阅时提供的订阅函数 到所有的订阅函数中查找它所在索引
    const index = this.events[Event].findIndex(item => item === cb);
    // 如果要取消订阅的这个事件存在，但是根据你提供的函数，并没有在数组内查找到，说明你提供的函数并不是订阅者
    // 那就给用户一个报错信息，让用户去检查下他的代码
    if (index === -1) {
      console.error(new Error('该 handle 没有订阅者，取消订阅失败'));
      return;
    }
    // 如果找到了，直接根据索引删除
    this.events[Event].splice(index, 1);
  }
}
export default new Bus();
```

我们再看下此时控制台的打印

![2020050104](https://static.jindll.com/notes/temp/2020050104.gif)

## 更改 this 指向

根据控制台的打印，每次点击标签都是只打印了一条记录，说明我们取消订阅是成功了；但是打印的 `this` 却是 undefined ，this 是 undefined，说明我们就没法给输入框设置内容，所以我们需要更改订阅函数的 this 指向（为了使代码看起来比较清晰，我仅展示了关键代码）

```js
import bus from '../../utils/eventbus';
Component({
  data: {},
  lifetimes: {
    ready() {
      // 通过 bind 修改 this 指向
      bus.on('sendTag', this.handleTag.bind(this));
    },
    detached() {
      // 通过 bind 修改 this 指向
      bus.off('sendTag', this.handleTag.bind(this))
    }
  },
})
```

我使用 **`bind`** 去修改了 this 的指向，**但是调用 bind 方法会返回一个新的函数，我订阅和取消订阅都使用了 bind 所以每次都会返回新函数，这就造成两个函数的内存地址不一致，取消订阅失败。** 所以，需要在 **`data`** 中在定义一个属性来接收 **bind** 返回的新函数（为了使代码看起来比较清晰，我仅展示了关键代码）

```js
import bus from '../../utils/eventbus';
Component({
  data: {
    value: '',
    _handle: undefined, // 接收bind返回的新函数
  },
  lifetimes: {
    ready() {
      this.setData({
        // 将bind返回的新函数赋给 _handle
        _handle: this.handleTag.bind(this)
      })
      // 将 _handle 提供给 on
      bus.on('sendTag', this.data._handle);
    },
    detached() {
      // 将 _handle 提供给 off ，订阅和取消订阅提供的同一个 _handle 内存地址一致，所以可以成功取消订阅
      bus.off('sendTag', this.data._handle)
    }
  },
  methods: {
    handleInput({detail: {value}}) {
      this.setData({value});
    },
    handleTag(tagText) {
      console.log(tagText, this)
      const {value} = this.data;
      this.setData({
        value: `${value} ${tagText} `
      })
    }
  }
})
```

最后我们再看一下效果

![2020050105](https://static.jindll.com/notes/temp/2020050105.gif)

## 优化 EventBus

我们的需求基本已经是完成了，但为了使 EventBus 使用起来更加友好，我们还可以再做一些优化。

1. 消息订阅的时候添加匿名函数的判断，因为匿名函数是无法被取消订阅的，所以如果用户提供的是匿名函数，我们最好给用户一个提示

   ```js
   class Bus {
     constructor() {
       this.events = {}
     }
     on(Event, cb) {
       if(this.events[Event]) {
         this.events[Event].push(cb);
       } else {
         this.events[Event] = [cb];
       }
       // 如果是匿名函数就给用户个警告
       if(!cb.name) {
         console.warn('on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。')
       }
     }
     emit(Event, obj) {
       if(!this.events[Event]) return
       this.events[Event].forEach(cb => {
         cb(obj)
       })
     }
     off(Event,cb) {
       if(!this.events[Event]) return
       const index = this.events[Event].findIndex(item => item === cb);
       if (index === -1) {
         console.error(new Error('该 handle 没有订阅者，取消订阅失败'));
         return;
       }
       this.events[Event].splice(index, 1);
     }
   }
   export default new Bus;
   ```

2. 因为时间订阅和取消必须是同一个对象，所以我们最好再加个限制，Bus类只允许有一个实例对象

   ```js
   class Bus {
     constructor() {
       this.events = {}
     }
     on(Event, cb) {
       if(this.events[Event]) {
         this.events[Event].push(cb);
       } else {
         this.events[Event] = [cb];
       }
       // 如果是匿名函数就给用户个警告
       if(!cb.name) {
         console.warn('on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。')
       }
     }
     emit(Event, obj) {
       if(!this.events[Event]) return
       this.events[Event].forEach(cb => {
         cb(obj)
       })
     }
     off(Event,cb) {
       if(!this.events[Event]) return
       const index = this.events[Event].findIndex(item => item === cb);
       if (index === -1) {
         console.error(new Error('该 handle 没有订阅者，取消订阅失败'));
         return;
       }
       this.events[Event].splice(index, 1);
     }
     // 给这个类加一个静态方法，用来判断这个类之前有没有生成过对象
     static getInstance() {
       if (!Bus.instance) {
         Bus.instance = new Bus()
       }
       return Bus.instance;
     }
   }
   // 导出这里返回 Bus 类静态 getInstance 的执行结果
   export default Bus.getInstance();
   ```

## 总结

本文的 EventBus 模块，算是发布订阅模式的一种典型使用场景，但也不局限于小程序的组件间通信，在其他的类似场景中也完全可以通用，本文核心其实也是讲发布订阅模式，希望在项目开发中，大家能灵活运用上设计模式来解决我们遇到的问题。

本文GitHub地址：[https://github.com/luokaibin/wx-eventbus](https://github.com/luokaibin/wx-eventbus)

