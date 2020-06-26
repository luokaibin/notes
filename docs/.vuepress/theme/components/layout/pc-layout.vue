<template>
  <div class="layout">
    <Header />
  </div>
</template>

<script>
import Header from '@components/header/pc-header';
export default {
  name: 'Layout',
  components: {Header},
  data() {
    return {};
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.layout
  width 100vw
  height 100vh
  display flex
  flex-direction column
  flex-shrink 0
</style>