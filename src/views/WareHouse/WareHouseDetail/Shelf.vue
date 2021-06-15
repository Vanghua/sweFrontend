<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card>
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">货架基本信息</div>
      </div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;">
        <a-descriptions-item label="货架编号" :span="2">{{$route.params.shelfInfo.shelfId}}</a-descriptions-item>
        <a-descriptions-item label="货架容量" :span="2">{{$route.params.shelfInfo.shelfContent}}</a-descriptions-item>
      </a-descriptions>
      <a-button type="danger" @click="$router.push({name: 'WareHouseDetail', params: {houseInfo}})" style="float: left;">返回</a-button>
    </a-card>

    <a-card style="margin-top: 24px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">货架货物信息</div>
        <a-table :columns="columns" :dataSource="goodData" bordered :pagination="false" :scroll="{x: 800}">
          <div slot="out" slot-scope="text, record, index">
            <a-popconfirm title="确认要出库吗" okText="确认" cancelText="取消" @confirm="">
              <a-button type="primary"><a-icon type="minus"/>出库</a-button>
            </a-popconfirm>
          </div>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "Shelf",
  mounted() {
    this.houseInfo = this.$route.params.houseInfo
    if(this.houseInfo.warehouse_type == '接收站')
      this.columns.push({
          title: '出库',
          align: 'center',
          scopedSlots: { customRender: 'out' }
      })
    this.getData()
  },
  data() {
    return {
      // 仓库信息(back回退无法传递参数，这里只是简单push回去，上一级的仓库详情界面需要带参数，这里保存参数)
      houseInfo: {},
      // 货物表表头描述
      columns: [
        {
          dataIndex: 'orderId',
          title: '货物订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          dataIndex: 'goodId',
          title: '货物编号',
          key: 'goodId',
          align: 'center'
        },
        {
          dataIndex: 'goodName',
          title: '货物名称',
          key: 'goodName',
          align: 'center'
        },
      ],
      // 货物表信息来源
      goodData: []
    }
  },
  methods: {
    // 加载数据
    getData() {
      let that = this
      let obj = {
        shelfId: this.$route.params.shelfInfo.shelfId,
        shelfWarehouseId: this.$route.params.houseInfo.warehouse_id,
        shelfStorageNum: 0
      }
      // 请求该货架上的货物信息
      fetchAPI('/warehouse/goodQueryByShelf','post', obj).then(res => {
        that.goodData = JSON.parse(res)
        let tempData = []
        for(var index in that.goodData) {
          let temp = {
            orderId: that.goodData[index].orders_id,
            goodId: that.goodData[index].good_id,
            goodName: that.goodData[index].good_name
          }
          tempData.push(temp)
        }
        that.goodData = tempData
      })
    }
  }
}
</script>

<style scoped>

</style>