<template>
  <a-card style="height: 100%; overflow-y: scroll;">
    <div id="houseMap" style="height: 400px; margin-bottom: 24px;"></div>
    <a-card v-for="house in houses" :key="house.name">
      <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 1.3rem;">
        <div>仓库名称：{{house.name}}</div>
        <div>仓库地址：{{house.pos}}</div>
        <div>仓库级别：{{house.type}}</div>
      </div>
    </a-card>
    <a-pagination style="float: right; margin-top: 24px;"
                  v-model="pageNum"
                  :defaultPageSize="10"
                  :total="23"/>
  </a-card>
</template>

<script>
export default {
  name: "WareHouse",
  mounted() {
    this.initMap()
  },
  data() {
    return {
      map: {},
      pageNum: 10,
      houses: [
        {
          name: '威海市仓库',
          pos: '威高广场',
          type: '3级',
          lnt: '122.129278',
          lat: '37.510029'
        }
      ]
    }
  },
  methods: {
    initMap() {
        // 实例化地图
        this.map = new BMap.Map("houseMap");
        // 地图中心点
        this.map.centerAndZoom("威海", 15);
        // 开启滚轮缩放
        this.map.enableScrollWheelZoom(true)
        // 添加定位按钮
        this.map.addControl(new BMap.GeolocationControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: new BMap.Size(20, 20)
        }))
        var pos1 = new BMap.Marker(new BMap.Point(this.houses[0].lnt,this.houses[0].lat))
        this.map.addOverlay(pos1)
    }
  }
}
</script>

<style scoped>

</style>