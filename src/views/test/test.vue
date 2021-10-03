<template>
  <div class="container">
    <div style="height: calc(100% - 4.95em)">
      <router-view />
    </div>
    <div id="footer">
      <div class="bar">
        <div class="pic">&#x1F3E0</div>
        <div>主页</div>
      </div>
      <div class="bar">
        <div class="pic">&#x1F50D</div>
        <div>广场</div>
      </div>
      <div class="bar">
        <div class="pic">&#x1F466</div>
        <div>我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test"
}
</script>

<style scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 3px solid gray;
  }
  #footer {
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 100%;
    border-top: 2px solid gray;
  }
  .pic {
    font-size: 2em;
  }
  .pic + div {
    font-size: 1.3em;
  }
  .bar {
    line-height: 1.5;
    flex-basis: 0px;
    flex-grow: 1;
  }
</style>