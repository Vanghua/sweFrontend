<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">仓库信息</div>
        <a-input-search addon-before="搜索仓库"
                    enter-button="Search"
                    placeholder="请输入仓库编号"
                    @search="handleSearch"/>
        <a-button  style="float: left; margin-top: 16px;" @click="getData(1)"><a-icon type="sync"/>显示所有仓库</a-button>
      </div>
    </a-card>
    <a-card v-for="house in houses"
          :key="house.name"
          style="margin-top: 16px; cursor: pointer;">
      <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 1.3rem;">
        <div>仓库负责人：{{house.warehouse_manager}}</div>
        <div>仓库地址：{{house.warehouse_address}}</div>
        <div>仓库级别：{{house.warehouse_type}}</div>
        <div>仓库容量：{{house.warehouse_storagenum}}</div>
      </div>
      <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="handleDelete(house)">
        <a-button type="danger" style="float: left;">删除</a-button>
      </a-popconfirm>
    </a-card>
    <a-pagination style="float: right; margin-top: 24px;"
                  v-model="pageNum"
                  :defaultPageSize="10"
                  :total="total"
                  @change="handleChange"/>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

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
      total: 0
    }
  },
  methods: {
    // 处理删除仓库操作
    handleDelete(e) {
      alert('点击了删除')
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
          for (var i = 0; i < that.houses.length; i++) {
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