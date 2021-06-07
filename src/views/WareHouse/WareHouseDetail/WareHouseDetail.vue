<template>
  <div style="height: 100%; overflow-y: scroll;">
    <add-Modal v-if="isAdd" @close="isAdd = false, getData()" :houseId="$route.params.houseInfo.warehouse_id"></add-Modal>

    <a-card>
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">仓库基本信息</div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;">
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

    <a-card style="margin-top: 24px;">
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">货架信息</div>
      <a-table :columns="columns" :dataSource="shelfData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="edit">
          <a-button type="primary" style="margin-right: 16px;"><a-icon type="edit"></a-icon>编辑</a-button>
          <a-button type="danger"><a-icon type="minus"></a-icon>删除</a-button>
        </div>
        <div slot="show">
          <a-button type="primary" @click="$router.push({name: 'Shelf', params: {houseInfo: houseInfo}})"><a-icon type="search"></a-icon>查看</a-button>
        </div>
      </a-table>
      <a-button type="primary" style="float: left; margin-top: 16px;" @click="isAdd = true"><a-icon type="edit"/>添加货架</a-button>
    </a-card>
    <a-button type="danger" @click="$router.push({name: 'WareHouse'})" style="margin-top: 24px; float: left;">返回</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
import AddShelf from "@/views/WareHouse/WareHouseDetail/AddShelf";
export default {
  name: "WareHouseDetail",
  components: {
    'add-Modal': AddShelf
  },
  mounted() {
    this.houseInfo = this.$route.params.houseInfo
    this.getData()
  },
  data() {
    return {
      // 是否展示添加货架模态窗口
      isAdd: false,
      shelf: [],
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
      houseInfo: {}
    }
  },
  methods: {
    getData() {
      let obj = {
        goodInfo: {},
        warehouseInfo: {
          warehouseId: this.$route.params.houseInfo.warehouse_id,
          warehouseType: "",
          warehhouseStoragenum: "",
          warehouseAddress: "",
          warehouseManager: "",
          warehouseManagerTel: "",
          warehouseCreationtime: "",
          warehouseLng: "",
          warehouseLat: ""
        },
        // 无关参数
        pageNum: 0,
        pageCount: 0
      }
      let that = this
      fetchAPI('/warehouse/shelfQueryAll','post',obj).then(res => {
        that.shelf = JSON.parse(res)
        let tempData = []
        for(var i = 0; i < that.shelf.length; i++)
          tempData.push({shelfId: that.shelf[i].shelf_id, shelfContent: that.shelf[i].shelf_storageNum})
        that.shelfData = tempData
      })
    }
  }
}
</script>

<style scoped>

</style>