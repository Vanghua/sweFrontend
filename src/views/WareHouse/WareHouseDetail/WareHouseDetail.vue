<template>
  <div style="height: 100%; overflow-y: scroll;">
    <add-Modal v-if="isAdd" @close="isAdd = false, getData()" :houseId="$route.params.houseInfo.warehouse_id" />
    <edt-Modal  v-if="isEdit" @close="isEdit = false, getData()" :shelfObj="shelfObj"/>

    <!-- 仓库基本信息 -->
    <a-card>
      <div style="font-size: 1.3rem; font-width: bold;">
        <span style="float: left; margin-bottom: 16px;">仓库基本信息</span>
        <a-icon :type="iconType"
                style="cursor: pointer; float: right;"
                @click="isDes = !isDes; iconType = isDes == true ? 'fullscreen-exit': 'fullscreen'"/>
      </div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;" v-if="isDes">
        <a-descriptions-item label="仓库编号" :span="2">{{$route.params.houseInfo.warehouse_id}}</a-descriptions-item>
        <a-descriptions-item label="仓库位置" :span="2">{{$route.params.houseInfo.warehouse_address}}</a-descriptions-item>
        <a-descriptions-item label="仓库负责人" :span="2">{{$route.params.houseInfo.warehouse_manager}}</a-descriptions-item>
        <a-descriptions-item label="仓库负责人联系方式" :span="2">{{$route.params.houseInfo.warehouse_managertel}}</a-descriptions-item>
        <a-descriptions-item label="仓库类型" :span="2">{{$route.params.houseInfo.warehouse_type}}</a-descriptions-item>
        <a-descriptions-item label="仓库存储容量" :span="2">{{$route.params.houseInfo.warehouse_storagenum}}</a-descriptions-item>
        <a-descriptions-item label="仓库经度" :span="2">{{$route.params.houseInfo.warehouse_lng}}</a-descriptions-item>
        <a-descriptions-item label="仓库纬度" :span="2">{{$route.params.houseInfo.warehouse_lat}}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <!-- 货架信息查看 -->
    <a-card style="margin-top: 24px;" v-if="!isTrans">
      <div style="font-size: 1.3rem; font-width: bold; overflow: hidden;">
        <span style="float: left; margin-bottom: 16px;">货架信息</span>
        <a-icon :type="iconTypeTable"
                style="cursor: pointer; float: right;"
                @click="isShelf = !isShelf; iconTypeTable = isShelf == true ? 'fullscreen-exit': 'fullscreen';"/>
      </div>
      <div v-if="isShelf">
        <a-table :columns="columns" :dataSource="shelfData" bordered :pagination="false" :scroll="{x: 800}">
          <div slot="edit" slot-scope="text, record, index">
            <a-button type="primary" style="margin-right: 16px;" @click="shelfObj = record, isEdit = true"><a-icon type="edit"/>编辑</a-button>
            <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="deleteShelf(record)">
              <a-button type="danger"><a-icon type="minus"></a-icon>删除</a-button>
            </a-popconfirm>
          </div>
          <div slot="show" slot-scope="text, record, index">
            <a-button type="primary" @click="$router.push({name: 'Shelf', params: {houseInfo: houseInfo, shelfInfo: record}})"><a-icon type="search"/>查看</a-button>
          </div>
        </a-table>
        <a-button type="primary" style="float: left; margin-top: 16px;" @click="isAdd = true"><a-icon type="edit"/>添加货架</a-button>
      </div>
    </a-card>

    <!-- 入库办理 -->
    <a-card style="margin-top: 24px;" v-if="!isTrans">
      <div style="font-size: 1.3rem; font-width: bold; overflow: hidden;">
        <div style="margin-bottom: 16px; float: left;">入库办理</div>
      </div>
      <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 16 },}">
        <a-form-item label="货物订单编号">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入用户提供的订单编号(数字)">
            <a-input type="text"
                     size="large"
                     placeholder="请输入用户提供的订单编号(数字)"
                     v-decorator="['orderId',{rules: [{required: true, pattern: new RegExp('^[0-9]+$','i'),message: '请输入订单编号'}], validateTrigger: 'change'}]" />
          </a-tooltip>
        </a-form-item>
        <a-form-item label="当前仓库编号">
            <a-input type="text"
                     size="large"
                     :disabled="true"
                     v-decorator="['houseId',{rules: [{required: true, pattern: new RegExp('^[0-9]+$','i'),message: '请输入仓库编号'}], validateTrigger: 'change'}]" />
        </a-form-item>
        <a-form-item label="该仓库负责人用户名">
            <a-input type="text"
                     size="large"
                     :disabled="true"
                     v-decorator="['name',{rules: [{required: true}], validateTrigger: 'change'}]" />
        </a-form-item>
        <a-button type="primary" id="ensureInHouse" htmlType="submit">入库</a-button>
      </a-form>
    </a-card>

    <!-- 待出库货物信息 -->
    <a-card style="margin-top: 24px;">
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">待出库货物信息</div>
      <a-table :columns="outColumns" :dataSource="outData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="out" slot-scope="text, record, index">
          <a-popconfirm title="确认要完成订单吗" okText="确认" cancelText="取消" @confirm="finishOrder(record)">
            <a-button type="danger" style="margin-right: 16px;" v-if="$store.state.user.role != 'trans' ? true : false">完成订单</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="handleOutHouse(record)">出库</a-button>
<!--          <a-button type="primary" @click="handleOutHouse(record)" :disabled="$store.state.user.role === 'trans' ? false : true">出库</a-button>-->
        </div>
      </a-table>
    </a-card>

    <a-button type="danger" @click="$router.push({name: 'WareHouse'})" style="margin-top: 24px; float: left;">返回</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
import AddShelf from "@/views/WareHouse/WareHouseDetail/AddShelf";
import EditShelf from "@/views/WareHouse/WareHouseDetail/EditShelf";

export default {
  name: "WareHouseDetail",
  components: {
    'add-Modal': AddShelf,
    'edt-Modal': EditShelf
  },
  mounted() {
    this.houseInfo = this.$route.params.houseInfo
    // 初始化入库办理表单的值
    if(!this.isTrans) {
      this.form.setFieldsValue({
        'houseId': this.$route.params.houseInfo.warehouse_id,
        'name': this.$route.params.houseInfo.warehouse_manager
      })
    }
    this.getData()
  },
  data() {
    return {
      form: this.$form.createForm(this),
      // 是否展示添加货架模态窗口
      isAdd: false,
      // 是否展示编辑货架
      isEdit: false,
      // 是否显示仓库描述信息
      isDes: false,
      // 是否显示货架信息
      isShelf: true,
      // 当前点击的货架的信息
      shelfObj: {},
      // 图标类型
      iconType: 'fullscreen',
      // 第二类图标类型
      iconTypeTable: 'fullscreen-exit',
      shelf: [],
      // 判断当前访问者的权限是否是运输员，如果是运输员，那么展示出库信息，运输员可以选择性接单
      isTrans: this.$store.state.user.role == 'trans' ? true : false,
      columns: [
        {
          dataIndex: 'shelfId',
          title: '货架编号',
          key: 'shelfId',
          align: 'center'
        },
        {
          dataIndex: 'shelfContent',
          title: '货架容量',
          key: 'shelfContent',
          align: 'center'
        },
        {
          title: '编辑',
          align: 'center',
          scopedSlots: { customRender: 'edit' }
        },
        {
          title: '查看',
          align: 'center',
          scopedSlots: { customRender: 'show' }
        }
      ],
      // 货架信息
      shelfData: [],
      // 仓库信息
      houseInfo: {},
      // 出库表表头描述
      outColumns: [
        {
          dataIndex: 'orderId',
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          dataIndex: 'goodName',
          title: '货物名称',
          key: 'goodName',
          align: 'center'
        },
        {
          title: '出库',
          align: 'center',
          scopedSlots: { customRender: 'out' }
        },
      ],
      // 出库表的数据来源
      outData: []
    }
  },
  methods: {

    // 加载数据
    getData() {
      let warehouseInfo = {
          warehouseId: this.$route.params.houseInfo.warehouse_id,
          warehouseType: "",
          warehhouseStoragenum: "",
          warehouseAddress: "",
          warehouseManager: "",
          warehouseManagerTel: "",
          warehouseCreationtime: "",
          warehouseLng: "",
          warehouseLat: "",
          warehouseCity: '',
          warehouseDistrict: '',
          warehouseToAddress: ''
      }
      let obj = {
        goodInfo: {},
        warehouseInfo: warehouseInfo,
        // 无关参数
        pageNum: 0,
        pageCount: 0
      }
      let that = this
      // 加载货架信息
      new Promise((resolve, reject) => {
        fetchAPI('/warehouse/shelfQueryAll','post',obj).then(res => {
          that.shelf = JSON.parse(res)
          let tempData = []
          for(var i = 0; i < that.shelf.length; i++)
            tempData.push({shelfId: that.shelf[i].shelf_id, shelfContent: that.shelf[i].shelf_storageNum, key: that.shelf[i].shelf_id})
          that.shelfData = tempData
          resolve()
        })
      }).then(res => {
        // 加载出库顺序信息
        fetchAPI('/warehouse/exwarehouseSheet','post', {
          warehouseAddress: this.$route.params.houseInfo.warehouse_address,
          warehouseToAddress: '!'
        }).then(res => {
          let tempData = JSON.parse(res)
          let tempStore = []
          for(var index in tempData) {
            tempStore.push({
              orderId: tempData[index].orders_id,
              goodName: tempData[index].good_name
            })
          }
          that.outData = tempStore
        })
      })
    },

    // 入库表单提交
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['orderId', 'name', 'houseId']
      this.form.validateFields(validateFieldsKey, (err, values) => {
         if(!err) {
           let obj = {
             goodId: 0,
             goodName: '',
             goodNum: 1,
             priority: 1,
             managerId: values.name,
             orderId: values.orderId,
             warehouseInfo: {
               warehouseId: values.houseId,
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
               warehouseDistrict: '',
               warehouseToAddress: ''
             }
           }
           fetchAPI('/warehouse/warehouing','post', obj).then(res => {
             if(res == '入库办理完成') {
               that.$notification.success({
                 description: res,
                 message: '成功',
                 duration: 4
               })
               that.getData()
             }
             else
               that.$notification.error({
                 description: res,
                 message: '失败',
                 duration: 4
               })
           })
         }
      })
    },

    // 删除货架
    deleteShelf(record) {
      let obj = {
        shelfId: record.shelfId,
        shelfWarehouseId: this.houseInfo.warehouse_id,
        shelfStorageNum: 0
      }
      let that = this
      fetchAPI('/warehouse/shelfDelete','post', obj).then(res => {
        if(res == '删除成功') {
          that.$notification.success({
            duration: 4,
            description: '删除成功',
            message: '成功'
          })
          that.getData()
        }
        else
          that.$notification.error({
            duration: 4,
            description: res,
            message: '失败'
          })

      })
    },

    // 出库操作
    handleOutHouse(record) {
      let that = this
      fetchAPI('/warehouse/exwarehousing','post',{
        orderId: record.orderId,
        managerId: this.$route.params.houseInfo.warehouse_manager
      }).then(res => {
        if(res == '出库办理完成') {
          that.$notification.success({
            duration: 4,
            message: '成功',
            description: res
          })
          that.getData()
        }
        else
          that.$notification.error({
            duration: 4,
            message: '失败',
            description: res
          })
      })
    },

    // 完成订单
    finishOrder(record) {
      let that = this
      fetchAPI('/orders/successOrders','post',{
        ordersId: record.orderId
      }).then(res => {
        if(res == '成功') {
          that.$notification.success({
            duration: 4,
            message: '成功',
            description: res
          })
          that.getData()
        } else {
          console.log(res)
          that.$notification.error({
            duration: 4,
            message: '失败',
            description: '此时无法完成订单'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>