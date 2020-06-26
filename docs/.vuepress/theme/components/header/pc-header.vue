<template>
  <!-- PC 版 header -->
  <div class="container">
    <router-link class="title" tag="div" to="/">
      <img :src="logo" class="logo" alt="logo" srcset="">
      <h1 class="h1">{{$site.title}}</h1>
    </router-link>
    <div class="menu">
      <SearchBox />
      <Nav />
    </div>
  </div>
</template>

<script>
import Nav from '@components/Nav/index';
import SearchBox from '@SearchBox'
export default {
  name: 'PcHeader',
  components: {Nav,SearchBox},
  data() {
    return {};
  },
  computed: {
    logo() {
      return this.$themeConfig.header.logo;
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
@import '~@styles/common';
.container
  width 100vw
  height 70px
  border-bottom 1px solid #cccccc
  box-sizing border-box
  padding 0 30px
  flex()
  .title
    height 100%
    cursor pointer
    flex(row,flex-start)
    .h1
      font-size 26px
      margin 0
      font-weight 400
      margin-left 0.2em
    .logo
      width 50px
      height 50px
      border-radio 50%
  .menu
    flex()
</style>