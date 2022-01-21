---
updated: 2021/11/28 16:34:05
date: 2021/11/28 16:34:05
categories: 
  - web
title: Vue3原理分析
post_title: Vue3原理分析
comments: true
tags:
  - Vue3原理
description: Vue3初始化的流程Vue3初体验
---

## Vue3初始化的流程

### Vue3初体验：hello world！

```html
<div id="app">
  <h1>{{title}}</h1>
  <h1>{{title2}}</h1>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
  const app = Vue.createApp({
    data(){
      return {
        title: 'Hello world'
      }
    },
    setup() {
      const state = Vue.reactive({
        title2: 'Vue3, hello!'
      })
      return state;
    }
  })
  app.mount('#app')
</script>
```

### Vue3变化和设计原理

{% mermaid %}

graph LR
A("Vue3设计理念")---B("函数的方式")---B1("类型支持更好")
A---C("Tree shaking")
A---D("api 简化")---D1("易用性")
D---D2("一致性")---D2-1("自定义指令")
D2---D2-2("sync修饰符和v-modul")
A---E("复用性")----E1("composition-api")
A---F("性能优化")----F1("响应式系统")
F---F2("编译器优化")
A---G("扩展性")---G1("自定义渲染器")
G---G2("独立响应式")

{% endmermaid %}

### 源码刨析：初始化流程

{% mermaid %}

graph LR
A("Vue")---B("打包入口")
A---C("依赖")---C1("runtime-dom")---C1-1("依赖runtime-core")
A---D("CreateApp")---D1("renderer.createApp")
D----D2("createRenderer")
D1---D1-1("render")
D1---D1-2("hydrat")
D1---D1-3("createApp")---D1-3__1("createAppAPI")
A----E("render")
A---F("patch")
A---G("processComponent")
A---H("mountComponent")---H1("instance")
H---H2("初始化组件")---H2-1("setupComponent(instance)")---H2-1__1("属性初始化")
H2-1---H2-1__2("方法初始化")
H2-1---H2-1__3("状态初始化")---数据响应式
H---H3("初始化界面及更新机制建立")---H3-1("setupRenderEffact()")---H3-1__1("mount")
H3-1---H3-1__2("update")---diff

{% endmermaid %}

### 造轮子之旅：手写Vue3初始化

{% mermaid %}
graph LR
root("造轮子")---A("基本结构")---A1("createApp")
A---A2("app.mount")
root---B("兼容Vue2")---B1("setup")---B1-1("app.setupState")
B---B2("data")---B2-1("app.data")
B---B3("proxy")
root---C("扩展性")---C1("抽象自定义渲染器")----C1-1("让用户传入当前平台节点操作")
C---C2("createRenderer(nodeOpts)")
C---D("数据响应式")---E("Vue3和Vue2区别")---E1(Vue3)---E1-1("proxy")
E---E2("Vue2")---E2-1("defineProperty")
E2---E2-2("array")---E2-2__1("arr.prototype = arrayMethods")
E2-2---E2-2__2("7个变更方法")---具有变更通知的能力
E---E3("优缺点")---E3-1("API层面")---E3-1__1("动态属性新增和删除")
E3-1---E3-1__2("Vue.set/delete")
E3---E3-2("性能表现")----E3-2__1("初始化速度慢")
E3-2---E3-2__2("保存依赖关系")---watcher
E3-2__2---dep
E3---E3-3("V3兼容性")---E3-3__1("Vue2.7")
D---F("reactive")---F1("实现数据响应式")
D---G("effect")---G1("建立依赖关系")
D---H("track()")---H1("建立映射关系")
D---I("trigger()")---I1("触发依赖关系")

a("VDom")---b("js对象，能够描述视图")
a---c("精确的定点更新")---c1("oldVnode,newVnode")
{% endmermaid %}

<iframe height="500" style="width: 100%;" scrolling="no" title="Vue初始化流程" src="https://codepen.io/luokaibin/embed/KKXPvmq?default-tab=html%2Cresult&editable=true&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/luokaibin/pen/KKXPvmq">
  Vue初始化流程</a> by luokaibin (<a href="https://codepen.io/luokaibin">@luokaibin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 简历

