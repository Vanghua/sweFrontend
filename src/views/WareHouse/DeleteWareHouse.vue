<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">仓库信息</div>
        <a-input-search addon-before="搜索仓库"
                    enter-button="Search"
                    placeholder="请输入仓库编号"
                    @search="chokeHandleSearch"/>
        <a-button  style="float: left; margin-top: 16px;" @click="chokeGetData(1)"><a-icon type="sync"/>显示所有仓库</a-button>
      </div>
    </a-card>
    <a-card v-for="house in houses"
          :key="house.name"
          style="margin-top: 16px;">
      <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 1.3rem;">
        <div>仓库负责人：{{house.warehouse_manager}}</div>
        <div>仓库地址：{{house.warehouse_address}}</div>
        <div>仓库级别：{{house.warehouse_type}}</div>
        <div>仓库容量：{{house.warehouse_storagenum}}</div>
      </div>
      <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="handleDelete(house)">
        <a-button type="danger" style="float: left;" :disabled="true">删除</a-button>
      </a-popconfirm>
    </a-card>
    <a-pagination style="float: right; margin-top: 24px;"
                  v-model="pageNum"
                  :defaultPageSize="10"
                  :total="total"
                  @change="chokeHandleChange"/>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
import houseType from "@/utils/houseType";
import choke from "@/utils/choke.js";

export default {
  name: "DeleteWareHouse",
  mounted() {
    this.getData(1)
  },
  data() {
    return {
      pageNum: 1,
      houses: [],
      isPage: true,
      total: 0,
      // 节流函数
      chokeHandleChange: choke(this.handleChange, 800),
      chokeGetData: choke(this.getData, 2000),
      chokeHandleSearch: choke(this.handleSearch, 1000)
    }
  },
  methods: {
    // 处理删除仓库操作
    handleDelete(house) {
      let that = this
      fetchAPI('/warehouse/warehouseDelete','post', house.warehouse_id).then(res => {
        if(res == '仓库已删除')
          that.$notification.success({
              message: '成功',
              description: '修改成功',
              duration: 4
          })
        else
          this.$notification.error({
            message: '删除失败',
            description: res,
            duration: 4
         })
      })
    },

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
            that.houses[i].warehouse_type = houseType(that.houses[i].warehouse_type)
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
        fetchAPI('/warehouse/warehouseQueryAll', 'post', obj).then(res => {
          that.houses = JSON.parse(res)
          for (var i = 0; i < that.houses.length; i++)
            that.houses[i].warehouse_type = houseType(that.houses[i].warehouse_type)
        })
      })
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