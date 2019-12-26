<template>
  <div class="container">
    <span class="item" v-for="i of count" :key="i">&#9733;</span>
  </div>
</template>

<script>

export default {
  props: {
    count: {
      type: Number,
      default: 5,
    }
  },
  methods: {

  }
}
</script>

<style>
.container {
  display: inline-block;
}
.container .item {
  font-size: 20px;
  letter-spacing: 0.1em;
  color: #F1F100;
}
</style>