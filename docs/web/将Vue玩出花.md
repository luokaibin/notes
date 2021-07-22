---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
title: 将Vue玩出花
comments: 
lang: zh-CN
description: 使用ref来主动操作子组件背景代码这是从element-ui复制的代码 的代码，删除了提交和重置子组件：假设你的一个表单提交页面分为了基础信息，常规信息，扩展信息，附加信息四大块，一般来说我们会将四块做成四个组件，每个组件都是一个表单，当用户点击提交按钮的时候我们拿取四个组件传出来得值，整理之后进行提交。
---

## 使用ref来主动操作子组件

### 背景代码

这是从element-ui复制的代码`自定义校验规则` 的代码，删除了提交和重置

- 子组件：`form.vue`

```vue
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {}
  }
</script>
```

假设你的一个表单提交页面分为了基础信息，常规信息，扩展信息，附加信息四大块，一般来说我们会将四块做成四个组件，每个组件都是一个表单，当用户点击提交按钮的时候我们拿取四个组件传出来得值，整理之后进行提交。

但此处的问题是，这个表单提交页面整体只有一个提交按钮。Vue的父子组件通信是父组件通过**props**传值进去，子组件通过**emit** 向外触发事件，父组件监听子组件的事件来获取子组件的值。四个子组件没有按钮，也就是无法向外触发事件，这个时候用户点页面的提交按钮，没办法拿到子组件的值，这就要了命了。

当然可以使用`input`或者`change` 什么事件来向外触发，但总体来说都不完美。所以我们更希望的是父组件主动的拿子组件的值，调用子组件的方法，所以我们这里的核心就是借用Vue的 **`ref`** API。

先引入父组件，正常使用

```vue
<template>
	<div class="container">
    <p-form ref="p_form"></p-form>
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script>
import PForm from './form.vue';
export default {
  components: {PForm},
}
</script>
```

### 取值

痛过`ref` 直接去拿子组件**data**的数据

```vue
<template>
	<div class="container">
    <p-form ref="p_form"></p-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
import PForm from './form.vue';
export default {
  components: {PForm},
  methods: {
    handleSubmit() {
      const {ruleForm: {pass,checkPass,age}} = this.$refs.p_form;
      console.log(pass,checkPass,age,this.$refs.p_form); // 可以打印出来看一下都是些什么东西；其实通过this.$refs.p_form就拿到了子组件的实例，就可以对子组件进行任意操作了
    }
  }
}
</script>
```

### 调用方法

如果在取值之前我想先进行校验，校验通过再取值往下执行，校验不通过就标红，提示用户信息不完整

```vue
<template>
	<div class="container">
    <p-form ref="p_form"></p-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
import PForm from './form.vue';
export default {
  components: {PForm},
  methods: {
    async handleSubmit() {
      const {ruleForm: {pass,checkPass,age},$refs: {ruleForm}} = this.$refs.p_form;
      try {
        await ruleForm.validate();
        // PForm子组件的form表单上也有一个ref，ref的name就是ruleForm
        // validate这个方法就是element-ui在表单这个子组件上提供的方法
        // 这里我用了async/await，validate校验通过会返回resolve，失败会返回reject，也就失败了会走catch语句
        // 调用PForm组件的其他方法，是同样的原理，PForm实例打印出来看起一下也就知道怎么用了
        console.log(pass,checkPass,age,this.$refs.p_form); // 可以打印出来看一下都是些什么东西；其实通过this.$refs.p_form就拿到了子组件的实例，就可以对子组件进行任意操作了
      } catch(err) {
        throw new Error('表单校验不通过');
      }
    }
  }
}
</script>
```

## 子组件直接调用父组件的方法

上文说了父组件主动拿子组件的数据，调用子组件的方法，那这里就说下子组件主动去调父组件的方法。

正常情况父子组件通信都是父组件`props` 把数据传进去，子组件通过`$emit` 触发事件，将数据传出去，父组件监听向外触发的事件，接收子组件向外传的值，然后父组件拿到值之后在做后续处理。

现在我们要实现的就是绕过`$emit` ,子组件直接调用父组件的方法。

流程就是我们通过**props** 给子组件传个父组件的方法让子组件直接调用

### 通过props给子组件传个函数

- 父组件

```vue
<template>
	<div class="container">
    <!-- text给子组件传进去的是一个函数 -->
    <p-child :text="updateText"></p-child>
    {{text}}
  </div>
</template>

<script>
import PChild from './child';
export default {
  components: {PChild},
  data() {
    return {
      text: '默认值'
    }
  },
  methods: {
    updateText(content) {
      this.text = content;
    }
  }
}
</script>
```

- 子组件

  这里用了iVew-ui

```vue
<template>
	<div class="container">
    <Input v-model="value11">
      <Button slot="append" @click="handleBtnClick">确认</Button>
    </Input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value11: '',
    }
  },
  methods: {
    handleBtnClick() {
      // 父组件通过text传进了一个父组件的方法,但子组件并没有通过props接收,此时父组件传进了的内容就在$attrs中
      this.$attrs.text(this.value11);
    }
  }
}
</script>
```

这个代码示例比较极端，但如果当你感觉`props/emit` 的流程比较麻烦的时候，可以考虑这么来玩一下，可以少写部分代码。

## 通过`provide / inject` 来进行父子组件传值

> `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。[官方文档](https://cn.vuejs.org/v2/api/#provide-inject)

有没有遇到过这种业务场景，用户下单但是未支付，半小时未支付自动取消订单，前端在这个时候就需要做一个倒计时，在倒计时结束的时候刷新下页面，使订单状态更新。

固然，当倒计时结束的时候你可以使用`window.location.reload()` 来使页面更新，但这样会造成整个页面的刷新，而我们只希望某一块区域小范围刷新。所以这个时候其实我们就可以借助`provide / inject` 来玩下（其实有其他更好的方法，这里主要为了演示`provide / inject` 使用）。

### 父组件

```vue
<template>
	<div class="page">
    <p-child v-if="isShow"></p-child>
  </div>
</template>

<script>
import PChild from 'pchild';
export default {
  components: {PChild},
  // 通过provide向子组件提供一个函数,这个函数来源于methods
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    // 这个方法被调用的时候子组件首先会被销毁，然后等待销毁之后也就是dom更新后，重新渲染这个组件（相当于组件重启）
    reload() {
      this.isShow = false;
      this.$nextTick(function() {
        this.isShow = true;
      });
    }
  }
}
</script>
```

### 子组件: pchild.vue

```vue
<template>
	<div class="page">
    <button @click="handleReload">
      刷新
  	</button>
  </div>
</template>

<script>
export default {
  // 将父组件提供的函数通过inject注入到子组件中
  inject: ['reload'],
  methods: {
    // 被点击的时候执行父组件的方法（其实可以直接点击的时候执行reload，没必要通过handleReload来调用）
    handleReload() {
      this.reload();
    }
  }
}
</script>
```

## 把你的组件改为通过JS方法来调用

## 在Vue中使用JSX

