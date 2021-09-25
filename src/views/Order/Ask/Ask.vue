<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">进行中订单查询</div>
        <a-input-search addon-before="按名称搜索"
                    enter-button="Search"
                    placeholder="请输入货物名称"
                    @search="chokeNameSearch"/>
         <a-input-search addon-before="按编号搜索"
                    enter-button="Search"
                    placeholder="请输入订单编号"
                    @search="chokeIdSearch"
                    style="margin-top: 16px;"/>
        <a-button  style="float: left; margin-top: 16px;" @click="reData"><a-icon type="sync"/>显示所有进行中的订单</a-button>
      </div>
    </a-card>
    <a-card v-for="item in subItems"
            style="margin-top: 16px; cursor: pointer;">
      <a-row type="flex" justify="start" >
        <a-col flex="80px" style="overflow: hidden;" @click="$router.push({name: 'Process', params: {orderInfo: item}})">
          <a-icon type="gift" style="font-size: 60px; float: left;"/>
        </a-col>
        <a-col flex="1" :style="{overflow: cardOverflow}" >
          <div :style="{float: 'left', fontSize: size, fontWeight: 'bold', width: '100%'}">
            <div style="display: flex;  width: 100%;" @click="$router.push({name: 'Process', params: {orderInfo: item}})">
              订单编号:
              <span style="color: grey; margin-left: 16px;">{{item.ordersId}}</span>
              (<span :style="{color: item.route == '' ? 'red' : 'blue', justifySelf: 'flex-end'}">{{item.route == "" ? '请寄件': '运输中'}}</span>)
            </div>
            <div style="display: flex;" @click="$router.push({name: 'Process', params: {orderInfo: item}})">
              货物名称:
              <span style="color: grey; margin-left: 16px;">{{item.ordersName}}</span>
            </div>
            <div style="display: flex;" @click="$router.push({name: 'Process', params: {orderInfo: item}})">
              发货时间:
              <span style="color: grey; margin-left: 16px;">{{item.createTime}}</span>
            </div>
            <div style="display: flex;" v-if="!isCancel">
              <a-button type="danger" :disabled="item.route.length <= 1 ? false : true" @click="handleDelete(item)">取消订单</a-button>
            </div>
          </div>
        </a-col>
        <a-col :flex="cancelFlex" v-if="isCancel">
          <a-button type="danger" :disabled="item.route.length <= 1 ? false : true" style="float: right;" @click="handleDelete(item)">取消订单</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-button type="primary" style="margin-top: 24px;" @click="handleGetMore">点击加载更多</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
import choke from "@/utils/choke.js";

export default {
  name: "Ask",
  mounted() {
    if(document.body.offsetWidth < 1000) {
      this.cancelFlex = 0
      this.isCancel = false
      this.cardOverflow = 'scroll'
      this.size = '0.8rem'
    }
    this.getData()
  },
  data() {
    return {
      items: [],
      // 进行中订单的一部分
      subItems: [],
      num: 5,
      // 响应式布局
      cancelFlex: 1,
      isCancel: true,
      cardOverflow: 'hidden',
      size: '1.2rem',
      // 节流函数--重新加载数据的节流
      reData: choke(this.getData, 2000),
      // 节流函数--搜索名称的节流
      chokeNameSearch: choke(this.nameSearch, 1000),
      // 节流函数--搜索编号的节流
      chokeIdSearch: choke(this.idSearch, 1000),
    }
  },
  methods: {

    // 取消订单
    handleDelete(order) {
      let that = this
      let pattern = /[0-9]+/
      fetchAPI('/orders/cancleOrders','post',{
        ordersId: order.ordersId,
        cancleReason: '用户手动取消'
      }).then(res => {
        if(res == '成功') {
          that.$notification.success({
            duration: 4,
            message: '成功',
            description: '取消成功'
          })
          that.getData()
        } else if(pattern.test(JSON.parse(res))){
          that.$notification.success({
            duration: 4,
            message: '成功',
            description: '取消成功'
          })
          that.getData()
        } else
          that.$notification.error({
            duration: 4,
            message: '失败',
            description: '不能取消'
          })
      })
    },

    // 加载数据
    getData() {
      let that = this
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: '1',
        queryFilterContent: '%'
      }
      fetchAPI('/orders/getCurrentOrders','post',obj).then(res => {
        that.items = JSON.parse(res)
        that.subItems = that.items.slice(0,5)
        console.log(that.items)
      })
    },

    // 加载更多数据
    handleGetMore() {
      // 每次多显示5个历史订单
      this.num += 5
      if(this.num > this.items.length)
        this.num = this.items.length
      this.subItems = this.items.slice(0, this.num)
    },

    // 按名称查询
    nameSearch(value) {
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: 'name',
        queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/getCurrentOrders','post',obj).then(res => {
        that.items = JSON.parse(res)
        // 先显示5个历史订单
        that.subItems = that.items
      })
    },
    // 按id查询
    idSearch(value) {
      let obj = {
        queryAccountName: this.$store.state.user.username,
        queryFilter: 'id',
        queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/getCurrentOrders','post',obj).then(res => {
        that.items = JSON.parse(res)
        // 先显示5个历史订单
        that.subItems = that.items
      })
    },
  }
}
</script>

<style scoped>

</style>