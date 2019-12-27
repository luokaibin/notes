<template>
  <div class="container">
    <span class="item" v-for="item of textList" :key="item">{{item}}</span>
  </div>
</template>

<script>

export default {
  props: {
    content: {
      type: String || Array
    }
  },
  computed: {
    textList() {
      if (Array.isArray(this.content)) {
        return this.content;
      }
      return this.content.split('|') || []
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.2em;
}
</style>