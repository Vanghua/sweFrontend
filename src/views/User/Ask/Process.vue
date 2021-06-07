<template>
  <div style="height: 100%;">
    <a-card style="height: 130px; display: flex; overflow-x: scroll;">
      <a-steps :status="state" v-model="current">
        <a-step v-for="step in steps" :title="step.title" :description="step.description" :disabled="true"></a-step>
      </a-steps>
    </a-card>
    <div id="processMap" style="height: 400px; margin-top: 24px;"></div>
    <a-button type="danger" @click="$router.back()" style="float:left; margin-top: 16px;">返回</a-button>
  </div>
</template>

<script>
export default {
  name: "Process",
  mounted() {
    this.item = this.$route.params
    this.initMap()
  },
  data() {
    return {
      // 当前订单信息
      item: {},
      // 实例化地图
      map: {},
      // 当前状态
      state: 'finish',
      // 当前进度
      current: 1,
      // 当前的进度
      steps: [
        {
          title: '山大接收站',
          description: '2021-6-6 12:31:21'
        },
        {
          title: '威高仓库',
          description: '2021-6-6 16:21:11'
        }
      ]
    }
  },
  methods: {
    initMap() {
      // 实例化地图
      this.map = new BMap.Map("processMap");
      // 地图中心点
      this.map.centerAndZoom("威海", 15);
      // 开启滚轮缩放
      this.map.enableScrollWheelZoom(true)
      // 添加定位按钮
      this.map.addControl(new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMap.Size(20, 20)
      }))
    }
  }
}
</script>

<style scoped>

</style>