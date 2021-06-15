<template>
  <a-card style="height: 100%; overflow-y: scroll;">
    <div id="houseMap" style="height: 400px; margin-bottom: 24px;"></div>
    <a-input-search addon-before="按编号搜索仓库"
                  enter-button="Search"
                  v-if="isShowSearch"
                  @search="handleIdSearch"
                  placeholder="请输入仓库编号"
                  class="firstSearch"/>
    <a-input-search addon-before="按地址搜索仓库"
                  enter-button="Search"
                  v-if="isShowSearch"
                  @search="handleAddressSearch"
                  placeholder="请输入仓库地址"
                  style="margin-top: 16px;"
                  class="secondSearch"/>
    <a-input-search addon-before="按省搜索仓库"
                    enter-button="Search"
                    v-if="isShowSearch"
                    @search="handleProvinceSearch"
                    placeholder="请输入仓库所属省份"
                    style="margin-top: 16px;"
                    class="firstSearch"/>
    <a-input-search addon-before="按城市搜索仓库"
                    enter-button="Search"
                    v-if="isShowSearch"
                    @search="handleCitySearch"
                    placeholder="请输入仓库所属城市"
                    style="margin-top: 16px;"
                    class="secondSearch"/>
    <a-input-search addon-before="按县或区搜索仓库"
                    enter-button="Search"
                    v-if="isShowSearch"
                    @search="handleDistrictSearch"
                    placeholder="请输入仓库所属区县"
                    style="margin-top: 16px;"/>
    <div style="overflow: hidden; margin-top: 16px;">
      <a-button  style="float: left;" @click="getData(1)" v-if="isShowSearch"><a-icon type="sync"/>显示所有仓库</a-button>
    </div>
    <a-card style="font-weight: bold; font-size: 1.2rem;" v-if="!isShowSearch">
      <div style="float: left;">您的仓库</div>
    </a-card>
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
import houseType from "@/utils/houseType";

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

    // 地图上添加坐标以及数据处理
    addPoint() {
      // 先删除旧标记
      if (this.overlay.length)
        for (var i = 0; i < this.overlay.length; i++)
          this.map.removeOverlay(this.overlay[i])
      // 在地图上添加仓库标记
      let overlays = []
      for (var i = 0; i < this.houses.length; i++) {
        if(i == 0)
          this.map.panTo(new BMap.Point(this.houses[0].warehouse_lng, this.houses[0].warehouse_lat), {})
        overlays.push(new BMap.Marker(new BMap.Point(this.houses[i].warehouse_lng, this.houses[i].warehouse_lat)))
        this.map.addOverlay(overlays[i])
        this.houses[i].warehouse_type = houseType(this.houses[i].warehouse_type)
      }
      this.overlay = overlays
    },

    // 处理搜索结果
    handleIdSearch(value) {
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
          that.addPoint()
        })
      } else {
        this.$notification['error']({
            message: '失败',
            description: '请输入数字编号',
            duration: 4
         })
      }
    },

    // 按地址搜索仓库
    handleAddressSearch(value) {
      let obj = {
        warehouseId: "",
        warehouseType: "",
        warehhouseStoragenum: "",
        warehouseAddress: value,
        warehouseManager: "",
        warehouseManagerTel: "",
        warehouseCreationtime: "",
        warehouseLng: "",
        warehouseLat: ""
      }
      let that = this
      fetchAPI('/warehouse/warehouseQueryAddress', 'post', obj).then(res => {
          that.isPage = false
          that.houses = JSON.parse(res)
          that.addPoint()
      })
    },

    // 获取数据
    getData(page) {
      let that = this
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
            that.addPoint()
          })
        })
      }
      else if(this.$store.state.user.role == 'trans') {
        new Promise((resolve, reject) => {
          fetchAPI('/assign/getTransInfo','post',{accountName: that.$store.state.user.username, warehouseId: 0}).then(res => {
            if(JSON.parse(res) == 0) {
              // 如果所属仓库编号为0说明运输员没有绑定所属仓库，不显示仓库信息
              reject()
            }
            else {
              resolve(JSON.parse(res).warehouse_id)
            }
          })
        }).then(res => {
          let obj = {
            warehouseId: res,
            warehouseType: 0,
            warehhouseStoragenum: 0,
            warehouseAddress: '',
            warehouseManager: '',
            warehouseManagerTel: '',
            warehouseCreationtime: '',
            warehouseLng: '',
            warehouseLat: '',
            warehouseProvince: '',
            warehouseCity: '',
            warehouseDistrict: '',
            warehouseToAddress: ''
          }
          fetchAPI('/warehouse/warehouseQuery','post',obj).then(res => {
            that.houses = JSON.parse(res)
            that.addPoint()
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

    // 按照区查询仓库
    handleDistrictSearch(value) {
      let that = this
      let obj = {
        warehouseId: '',
        warehouseType: '',
        warehhouseStoragenum: '',
        warehouseAddress: '',
        warehouseManager: '',
        warehouseManagerTel: '',
        warehouseCreationtime: '',
        warehouseLng: '',
        warehouseLat: '',
        warehouseProvince: '',
        warehouseCity: '',
        warehouseDistrict: value,
        warehouseToAddress: ''
      }
      fetchAPI('/warehouse/warehouseDistrict','post',obj).then(res => {
        that.isPage = false
        that.houses = JSON.parse(res)
        that.addPoint()
      })
    },

    // 按照市查询仓库
    handleCitySearch(value) {
      let that = this
      let obj = {
        warehouseId: '',
        warehouseType: '',
        warehhouseStoragenum: '',
        warehouseAddress: '',
        warehouseManager: '',
        warehouseManagerTel: '',
        warehouseCreationtime: '',
        warehouseLng: '',
        warehouseLat: '',
        warehouseProvince: '',
        warehouseCity: value,
        warehouseDistrict: '',
        warehouseToAddress: ''
      }
      fetchAPI('/warehouse/warehouseCity','post',obj).then(res => {
        that.isPage = false
        that.houses = JSON.parse(res)
        that.addPoint()
      })
    },

    // 按照省查询仓库
    handleProvinceSearch(value) {
      let that = this
      let obj = {
        warehouseId: '',
        warehouseType: '',
        warehhouseStoragenum: '',
        warehouseAddress: '',
        warehouseManager: '',
        warehouseManagerTel: '',
        warehouseCreationtime: '',
        warehouseLng: '',
        warehouseLat: '',
        warehouseProvince: value,
        warehouseCity: '',
        warehouseDistrict: '',
        warehouseToAddress: ''
      }
      fetchAPI('/warehouse/warehouseProvince','post',obj).then(res => {
        that.isPage = false
        that.houses = JSON.parse(res)
        that.addPoint()
      })
    },
  }
}
</script>

<style scoped>
  @media screen and  (max-width: 1000px) {
    .firstSearch {
      width: 100%;
    }
    .secondSearch {
      width: 100%;
    }
  }

  @media screen and  (min-width: 1000px) {
    .firstSearch {
      width: 47.5%;
      margin-right: 5%;
      margin-top: 16px;
    }
    .secondSearch {
      width: 47.5%;
      margin-top: 16px;
    }
  }
</style>