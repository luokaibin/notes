<template>
  <div class="layout">
    <pc-layout v-device="'pc'" />
    <mobile-layout v-device="'mobile'"/>
  </div>
</template>

<script>
import PcLayout from '@components/layout/pc-layout';
import MobileLayout from '@components/layout/mobile-layout';
export default {
  name: 'Layout',
  components: {
    PcLayout,
    MobileLayout,
  },
  data() {
    return {};
  },
  mounted() {
    console.log('this 都有什么', this);
  }
}
</script>

<style lang="stylus" scoped>
.nav {
}
</style>