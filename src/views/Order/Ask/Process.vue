<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="height: 130px; display: flex; overflow-x: scroll;">
      <a-steps :status="state" v-model="current">
        <a-step v-for="step in steps" :title="step.title" :description="step.description" :disabled="true"></a-step>
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px;"><div id="processMap" style="height: 400px;"></div></a-card>
    <a-card>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;">
          <a-descriptions-item label="订单编号" :span="2">{{item.ordersId}}</a-descriptions-item>
          <a-descriptions-item label="订单寄件人姓名" :span="2">{{item.senderName}}</a-descriptions-item>
          <a-descriptions-item label="订单寄件人联系方式" :span="2">{{item.senderPhone}}</a-descriptions-item>
          <a-descriptions-item label="订单寄件人地址" :span="2">
            {{item.senderAddress[0]+'/'+item.senderAddress[1]+'/'+item.senderAddress[2]}}
          </a-descriptions-item>
          <a-descriptions-item label="订单寄件人详细地址" :span="2">{{item.senderDetailAddress}}</a-descriptions-item>

          <a-descriptions-item label="订单收件人姓名" :span="2">{{item.receiverName}}</a-descriptions-item>
          <a-descriptions-item label="订单收件人联系方式" :span="2">{{item.receiverPhone}}</a-descriptions-item>
          <a-descriptions-item label="订单收件人地址" :span="2">
            {{item.receiverAddress[0]}}/{{item.receiverAddress[1]}}/{{item.receiverAddress[2]}}
          </a-descriptions-item>
          <a-descriptions-item label="订单收件人详细地址" :span="2">{{item.receiverDetailAddress}}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-button type="danger" @click="$router.back()" style="float:left; margin-top: 16px;">返回</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "Process",
  created() {
    this.item = this.$route.params.orderInfo
  },
  mounted() {
    this.initMap()
    this.getData()
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
      steps: [],
      // 当前坐标的覆盖物
      overlay: {}
    }
  },
  methods: {

    // 初始化地图
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
    },

    // 加载数据
    getData() {
      let that = this
      let obj = { ordersId: this.item.ordersId }

      // 加载进度数据
      let tempData = []
      for(var i = 0; i < this.item.route.length; i++) {
        tempData.push({
          title: this.item.route[i],
          description: this.item.routeTime[i]
        })
      }
      this.steps = tempData

      // 如果安排的路径不为空，那么说明货物已经入库并且已经安排好了录像，可以进行画图
      if(this.item.route != '') {
        let routePoint = []
        // 生成仓库坐标数组
        for (var i = 0; i < this.item.route.length; i++)
          routePoint.push(new BMap.Point(this.item.routeLng[i], this.item.routeLat[i]))
        let polyLine = new BMap.Polyline(routePoint,{
          strokeColor: 'red',
          strokeWeight: 2,
          strokeOpacity: '0.85',
          strokeStyle: 'dashed'
        })
        this.map.addOverlay(polyLine)
      }

      // 请求货物当前所处的位置
      fetchAPI('/orders/queryOrdersPosition','post',obj).then(res => {
        let temp = JSON.parse(res)
        let tempData = []
        if(temp.warehouseLat == null && temp.warehouseLng == null && that.item.route.length && that.item.route[0] == "") {
          tempData.push({title: '已支付运费', description: that.item.createTime})
          // that.map.panTo(new BMap.Point(that.item.senderLng, that.item.senderLat),{})
          that.steps = tempData
        } else {
          // 货物出库，此时将货物位置定位到货物出库前的仓库
          if(temp.warehouseLat == null && temp.warehouseLng == null) {
            // 判断当前所在仓库
            let nowPos = 0
            for(var i = 0; i < that.item.route.length; i++)
              if(that.item.routeTime[i] == "") {
                nowPos = i - 1
                break
              }
            that.current = nowPos
            that.map.panTo(new BMap.Point(that.item.routeLng[nowPos], that.item.routeLat[nowPos]))
            if (JSON.stringify(that.overlay) != JSON.stringify({}))
                  that.map.removeOverlay(that.overlay)
            that.overlay = new BMap.Marker(new BMap.Point(that.item.routeLng[nowPos], that.item.routeLat[nowPos]))
            this.map.addOverlay(that.overlay)
          }
          else {
            // 货物在仓库中，此时将货物定位到当前仓库
            that.map.panTo(new BMap.Point(temp.warehouseLng, temp.warehouseLat))
            for (var index in that.item.route)
              if (that.item.route[index] == temp.warehouseAddress) {
                that.current = parseInt(index)
                // 添加当前位置的点标记
                if (JSON.stringify(that.overlay) != JSON.stringify({}))
                  that.map.removeOverlay(that.overlay)
                that.overlay = new BMap.Marker(new BMap.Point(temp.warehouseLng, temp.warehouseLat))
                this.map.addOverlay(that.overlay)
                break
              }
          }
        }
      })
    },

  }
}
</script>

<style scoped>

</style>