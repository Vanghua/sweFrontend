<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-weight: bold; font-size: 1.2rem;"><div style="float: left;">订单审核</div></a-card>
    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">待审核订单查询</div>
        <a-input-search addon-before="按名称搜索"
                    enter-button="Search"
                    placeholder="请输入货物名称"
                    @search="nameSearch"/>
         <a-input-search addon-before="按编号搜索"
                    enter-button="Search"
                    placeholder="请输入订单编号"
                    @search="idSearch" style="margin-top: 16px;"/>
        <a-button  style="float: left; margin-top: 16px;" @click="getData()"><a-icon type="sync"/>显示所有待审核订单</a-button>
      </div>
    </a-card>
    <a-card v-for="item in items"
            style="margin-top: 16px; cursor: pointer;"
            @click="$router.push({name: 'Check', params: {itemInfo: item}})">
      <a-row type="flex" justify="start" >
        <a-col flex="80px" style="overflow: hidden;">
          <a-icon type="gift" style="font-size: 60px; float: left;"/>
        </a-col>
        <a-col flex="1" style="overflow: hidden;">
          <div style="float: left; font-size: 1.2rem; font-weight: bold;">
            <div style="display: flex;">订单编号: {{item.ordersId}}</div>
            <div style="display: flex;">货物名称: {{item.ordersName}}</div>
            <div style="display: flex;">下单时间: {{item.createTime}}</div>
            <div style="display: flex;">下单人: {{item.accountName}}</div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
export default {
  name: "Order",
  mounted() {
    this.getData()
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    // 加载数据
    getData() {
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: '1',
        queryFilterContent: '%'
      }
      let that = this
      fetchAPI('/orders/queryWaitCheckOrders','post',obj).then(res => {
        that.items = JSON.parse(res)
      })
    },

    // 按照货物名称搜索
    nameSearch(value) {
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: 'name',
        queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/queryWaitCheckOrders','post', obj).then(res => {
        that.items = JSON.parse(res)
      })
    },

    // 按照订单编号搜索
    idSearch(value) {
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: 'id',
        queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/queryWaitCheckOrders','post', obj).then(res => {
        that.items = JSON.parse(res)
      })
    },
  }
}
</script>

<style scoped>

</style>