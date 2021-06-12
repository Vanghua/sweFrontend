<template>
  <a-card style="height: 100%; overflow-y: scroll;">
    <div id="houseMap" style="height: 400px; margin-bottom: 24px;"></div>
    <a-input-search addon-before="搜索仓库"
                    enter-button="Search"
                    v-if="isShowSearch"
                    @search="handleSearch"
                    placeholder="请输入仓库编号"/>
    <div style="overflow: hidden; margin-top: 16px;">
      <a-button  style="float: left;" @click="getData(1)" v-if="isShowSearch"><a-icon type="sync"/>显示所有仓库</a-button>
    </div>
    <a-card v-for="house in houses"
            :key="house.name"
            style="margin-top: 16px; cursor: pointer;"
            @click="$router.push({name: 'WareHouseDetail', params: {houseInfo: house}})">
      <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 1.3rem;">
        <div>仓库编号：{{house.warehouse_id}}</div>
        <div>仓库负责人：{{house.warehouse_manager}}</div>
        <div>仓库地址：{{house.warehouse_address}}</div>
        <div>仓库级别：{{house.warehouse_type}}</div>
        <div>仓库容量：{{house.warehouse_storagenum}}</div>
      </div>
    </a-card>
    <a-pagination style="float: right; margin-top: 24px;"
                  v-model="pageNum"
                  :defaultPageSize="10"
                  :total="total"
                  @change="handleChange"
                  v-if="isPage"/>
  </a-card>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "WareHouse",
  mounted() {
    this.initMap()
    // 加载第一页的数据
    this.getData(1)
    // 是否显示搜索框
    this.isShowSearch = this.$store.state.user.role === 'all' ? true : false
  },
  data() {
    return {
      map: {},
      pageNum: 1,
      total: 0,
      houses: [],
      // 仓库标记覆盖物
      overlay: [],
      // 是否显示查询仓库搜索框(只有全局管理员有这个权限)
      isShowSearch: false,
      // 是否显示页码
      isPage: this.$store.state.user.role == 'all' ? true : false
    }
  },
  methods: {
    // 处理搜索结果
    handleSearch(value) {
      let pattern = /^[0-9]+$/
      if(pattern.test(value)) {
        this.isPage = false
        let obj = {
          warehouseId: value,
          warehouseType: "",
          warehhouseStoragenum: "",
          warehouseAddress: "",
          warehouseManager: "",
          warehouseManagerTel: "",
          warehouseCreationtime: "",
          warehouseLng: "",
          warehouseLat: ""
        }
        let that = this
        fetchAPI('/warehouse/warehouseQuery', 'post', obj).then(res => {
          that.houses = JSON.parse(res)
          for (var i = 0; i < that.houses.length; i++)
            switch (that.houses[i].warehouse_type) {
              case 1:
                that.houses[i].warehouse_type = '接收站'
                break
              case 2:
                that.houses[i].warehouse_type = '存储仓库'
                break
              case 3:
                that.houses[i].warehouse_type = '中转站'
                break
            }
        })
      } else {
        this.$notification['error']({
            message: '失败',
            description: '请输入数字编号',
            duration: 4
         })
      }
    },

    // 获取数据
    getData(page) {
      // 如果当前是最高管理员权限，那么显示所有仓库
      if(this.$store.state.user.role == 'all') {
        this.isPage = true
        let obj = {
          goodInfo: {},
          warehouseInfo: {},
          pageNum: page,
          pageCount: 10
        }
        let that = this
        new Promise((resolve, reject) => {
          // 请求仓库总数量
          fetchAPI('/warehouse/warehouseNumQuery', 'post', obj).then(res => {
            that.total = res
            resolve()
          })
        }).then(() => {
          // 请求仓库具体数据
          fetchAPI('/warehouse/warehouseQueryAll', 'post', obj).then(res => {
            that.houses = JSON.parse(res)
            // 先删除旧标记
            if (that.overlay.length)
              for (var i = 0; i < that.overlay.length; i++)
                that.map.removeOverlay(that.overlay[i])
            // 在地图上添加仓库标记
            let overlays = []
            for (var i = 0; i < that.houses.length; i++) {
              overlays.push(new BMap.Marker(new BMap.Point(that.houses[i].warehouse_lng, that.houses[i].warehouse_lat)))
              that.map.addOverlay(overlays[i])
              switch (that.houses[i].warehouse_type) {
                case 1:
                  that.houses[i].warehouse_type = '接收站'
                  break
                case 2:
                  that.houses[i].warehouse_type = '存储仓库'
                  break
                case 3:
                  that.houses[i].warehouse_type = '中转站'
                  break
              }
            }
            that.overlay = overlays
          })
        })
      }
    },

    // 初始化地图
    initMap() {
        // 实例化地图
        this.map = new BMap.Map("houseMap");
        // 地图中心点
        this.map.centerAndZoom("威海", 11);
        // 开启滚轮缩放
        this.map.enableScrollWheelZoom(true)
        // 添加定位按钮
        this.map.addControl(new BMap.GeolocationControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: new BMap.Size(20, 20)
        }))
    },

    // 页码更换(参数是当前页码和默认页数)
    handleChange(page) {
      this.getData(page)
    },
  }
}
</script>

<style scoped>

</style>