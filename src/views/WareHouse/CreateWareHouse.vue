<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 16 },}">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">创建仓库</div>
        <a-form-item label="仓库级别">
          <a-select v-decorator="['type',{rules: [{required: true, message: '请填写仓库级别'}]}]">
            <a-select-option value="1">接收站</a-select-option>
            <a-select-option value="2">存储仓库</a-select-option>
            <a-select-option value="3">中转站</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="仓库容量">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2到10位数字表示容量">
            <a-input type="text"
                     size="large"
                     placeholder="提示：请输入至少两位数字表示容量"
                     v-decorator="['content',{rules: [{required: true, pattern: new RegExp('^[0-9]{2,10}$','i'), message: '容量输入格式有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="仓库负责人名称">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2到10位汉字">
            <a-input type="text"
                     size="large"
                     placeholder="提示：请输入2到10位汉字"
                     v-decorator="['name',{rules: [{required: true, pattern: new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$','i'), message: '姓名输入格式有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="仓库负责人联系方式">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入中国大陆11位手机号">
            <a-input type="text"
                     size="large"
                     placeholder="提示：请输入中国大陆11位手机号"
                     v-decorator="['phone',{rules: [{required: true, pattern: new RegExp('^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$','i'), message: '手机输入格式有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="仓库位置描述">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入5到20字的仓库描述">
            <a-input type="text"
                     size="large"
                     placeholder="提示：请输入5到20字的仓库描述"
                     v-decorator="['address',{rules: [{required: true, pattern: new RegExp('^.{5,30}$','i'), message: '仓库位置格式输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="仓库位置">
          <a-input type="text"
                   size="large"
                   :disabled="true"
                   v-decorator="['addressDetail',{rules: [{required: true, message: '仓库位置必须选择' }], validateTrigger: 'change'}]">
          </a-input>
        </a-form-item>
        <a-form-item label="仓库位置选择">
          <div id="createHouseMap" style="width: 100%; height: 400px;"></div>
        </a-form-item>
        <a-button type="primary" htmlType="submit" style="width: 100px;">提交</a-button>
    </a-form>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "CreateWareHouse",
  mounted() {
    this.initMap()
  },
  data() {
    return {
      form: this.$form.createForm(this),
      map: {},
      // 地图点击覆盖物
      markerPoint: {},
      // 仓库的经纬度
      point: {
        // 经度
        lng: '',
        // 纬度
        lat: ''
      },
      // 仓库地理位置描述
      address: '',
      // 仓库地理位置结构化描述
      addressComponents: {
        province: '',
        city: '',
        district: ''
      }
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      // 实例化地图
      this.map = new BMap.Map("createHouseMap");
      // 地图中心点
      this.map.centerAndZoom("威海", 15);
      // 开启滚轮缩放
      this.map.enableScrollWheelZoom(true)
      // 添加定位按钮
      this.map.addControl(new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMap.Size(20, 20)
      }))
      // 监听点击事件
      this.map.addEventListener('click', this.handleClick)
    },

    // 处理地图点击事件
    handleClick(e) {
      this.map.removeOverlay(this.markerPoint)
      this.markerPoint = new BMap.Marker(e.point)
      this.map.addOverlay(this.markerPoint)
      // 更新坐标
      this.point.lng = e.point.lng
      this.point.lat = e.point.lat
      let geo = new BMap.Geocoder()
      let that = this
      new Promise((resolve, reject) => {
        geo.getLocation(e.point, e => {
          that.address = e.address
          that.addressComponents = e.addressComponents
          console.log(e.addressComponents)
          resolve()
        },{})
      }).then(res => {
        that.form.setFieldsValue({
          'addressDetail': `经度是: ${e.point.lng}  纬度是: ${e.point.lat} 地理位置是: ${that.address}`
        })
      })
    },

    // 提交创建信息
    submitAll(e) {
      e.preventDefault()
      console.log(1)
      let that = this
      let validateFieldsKey = ['type', 'content', 'phone', 'name', 'address', 'addressDetail']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          let obj = {
              warehouseId: '',
              warehouseType: values.type,
              warehhouseStoragenum: values.content,
              warehouseAddress: values.address,
              warehouseManager: values.name,
              warehouseManagerTel: values.phone,
              warehouseCreationtime: '',
              warehouseLng: that.point.lng,
              warehouseLat: that.point.lat,
              warehouseCity: that.addressComponents.city,
              warehouseProvince: that.addressComponents.province,
              warehouseDistrict: that.addressComponents.district,
              warehouseToAddress: ''
          }
          fetchAPI('/warehouse/addWarehouse', 'post', obj).then(res => {
            if(res == '仓库已成功添加')
              that.$notification.success({
                  message: '成功',
                  description: '仓库已创建',
                  duration: 4
              })
            else
              that.$notification['error']({
                  message: '错误',
                  description: res,
                  duration: 4
              })
          })
        } else {
          that.$notification['error']({
              message: '错误',
              description: '输入格式有误',
              duration: 4
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>