<template>
  <div class="main">
    <div class="user-background"></div>
    <div class="user-img"></div>
  </div>
</template>

<script>
export default {
  name: "mine"
}
</script>

<style scoped>
  .main {
    height: 100%;
  }
  .user-background {
    height: 20%;
    background-image: url('../../../public/bck.jpg');
    background-position: 50% 45%;
  }
</style>