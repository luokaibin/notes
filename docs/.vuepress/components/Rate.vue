<template>
  <div class="container">
    <span :class="['item', red]" v-for="i of rateCount" :key="i">&#9733;</span>
  </div>
</template>

<script>

export default {
  props: {
    count: {
      type: Number | String,
      default: 5,
    }
  },
  computed: {
    rateCount() {
      if (typeof this.count === 'string') {
        return Number(this.count)
      }
      return this.count;
    },
    red() {
      if (this.rateCount === 1) {
        return 'red'
      }
      return ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.container {
  display: inline-block;
}
.container .item {
  font-size: 20px;
  letter-spacing: 0.1em;
  color: #F1F100;
}
.container .red {
  color: #de1c31;
}
</style>