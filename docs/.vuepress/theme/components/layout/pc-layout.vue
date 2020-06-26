<template>
  <div class="layout">
    <pc-header />
  </div>
</template>

<script>
import PcHeader from '@components/header/pc-header';
export default {
  name: 'Layout',
  components: {PcHeader},
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