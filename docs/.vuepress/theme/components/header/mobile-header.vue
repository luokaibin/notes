<template>
  <header class="header">
    <div class="left">
      <i class="fa fa-bars" aria-hidden="true"></i>
      <h1 class="h1">&ensp;{{$site.title}}</h1>
    </div>
    <SearchBox />
  </header>
</template>

<script>
import PcHeader from './pc-header';
import SearchBox from '@SearchBox'
export default {
  name: 'Header',
  components: {
    PcHeader,
    SearchBox,
  }
}
</script>

<style lang="stylus" scoped>
@import '~@styles/common';
.header,.left
  flex();
  box-sizing border-box
.header
  padding 0.7em 1em 0.7em 1em
  border_bottom()
.h1
  font-family: pdrfont
  font-size 1.5em
</style>