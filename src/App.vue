<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    //当页面刷新时会销毁Vuex中的数据,这里设置全局监听,当页面刷新时把state存入缓存
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store',JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
