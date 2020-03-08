export default {
  watch: {
    $route(n, o) {
      if(n.path !== o.path) {
        window.request();
      }
    }
  },
  created () {},
  mounted () {
  }
}