<template>
  <nav class="nav">
    <ul class="ul">
      <template v-for="item of nav">
        <router-link class="li" v-if="item.link" :to="item.link" tag="li">
          {{item.text}}
        </router-link>
        <li class="li hasDrop" v-else>
          <p class="menu"><span>{{item.text}}&ensp;</span><span class="downicon"></span></p>
          <ul class="dropmenu">
            <template v-for="el of item.items">
              <router-link class="li" :to="el.link" tag="li">
                {{el.text}}
              </router-link>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    nav() {
      return this.$themeConfig.nav;
    }
  },
  mounted() {
    console.log(this.nav);
    console.log(this.$route);
  }
}
</script>

<style lang="stylus" scoped>
@import '~@styles/common';
closeUlDefault()
  margin 0
  padding 0
  list-style: none
.ul
  closeUlDefault();
  flex(row,flex-start);
  .li
    position relative
    cursor pointer
    margin-right 1em
    font-size 16px
    &:hover
      color #3eaf7c
  .hasDrop
    position relative
    .menu
      display: flex;
      align-items: center;
      closeUlDefault();
    .dropmenu
      display none
      position absolute
      right -1em
      border 1px solid #999
      border-radius 5px
      closeUlDefault();
      margin-top 0.7em
      padding 0.2em 1em;
      .li
        font-size 14px
        color #666666
        line-height 2em
        text-align center;
        margin-right 0
        border-bottom 1px solid #cccccc;
        &:hover
          color #3eaf7c
        &:last-child
          border 0
    &:hover > .dropmenu
      display block

</style>