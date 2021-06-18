<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-tabs default-active-key="1" @change="pageChange" style="font-weight: bold;">
      <a-tab-pane key="1" tab="已取消订单">
        <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
          <div style="overflow: hidden;">
            <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">取消订单查询</div>
            <a-input-search addon-before="按名称搜索"
                        enter-button="Search"
                        placeholder="请输入货物名称"
                        @search="nameSearchHistory"/>
             <a-input-search addon-before="按编号搜索"
                        enter-button="Search"
                        placeholder="请输入订单编号"
                        @search="idSearchHistory" style="margin-top: 16px;"/>
            <a-button  style="float: left; margin-top: 16px;" @click="getData()"><a-icon type="sync"/>显示所有历史订单</a-button>
          </div>
        </a-card>
        <a-card v-for="order in historyOrdersSub"
                style="margin-bottom: 16px; cursor: pointer;"
                @click="$router.push({name: 'OrderDetail', params: {OrderInfo: order}})">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  订单编号:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.ordersId}}</span>
                </div>
                <div style="display: flex;">
                  货物名称:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.ordersName}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.createTime}}</span>
                </div>
                <div style="display: flex;">
                  订单状态:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.ordersStatus}}</span>
                </div>
                <div style="display: flex;" v-if="order.ordersStatus == '取消' ? false : true">
                  运费(元):
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.cost}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
        <a-button type="primary" style="margin-top: 24px;" @click="handleGetMore">点击加载更多</a-button>
      </a-tab-pane>
      <a-tab-pane key="2" tab="审核中订单">
        <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
          <div style="overflow: hidden;">
            <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">审核中订单查询</div>
            <a-input-search addon-before="按名称搜索"
                        enter-button="Search"
                        placeholder="请输入货物名称"
                        @search="nameSearchChecking"/>
             <a-input-search addon-before="按编号搜索"
                        enter-button="Search"
                        placeholder="请输入订单编号"
                        @search="idSearchChecking" style="margin-top: 16px;"/>
            <a-button  style="float: left; margin-top: 16px;" @click="getData()"><a-icon type="sync"/>显示所有审核中订单</a-button>
          </div>
        </a-card>
        <a-card v-for="order in checkingOrders"
                style="margin-bottom: 16px; cursor: pointer;"
                @click="$router.push({name: 'OrderDetail', params: {OrderInfo: order}})">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  订单编号:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersId}}</span>
                </div>
                <div style="display: flex;">
                  货物名称:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersName}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: indianred; margin-left: 16px;">{{order.createTime}}</span>
                </div>
                <div style="display: flex;">
                  订单状态:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersStatus}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="已审核待付款订单">
        <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
          <div style="overflow: hidden;">
            <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">未付款订单查询</div>
            <a-input-search addon-before="按名称搜索"
                        enter-button="Search"
                        placeholder="请输入货物名称"
                        @search="nameSearchWaiting"/>
             <a-input-search addon-before="按编号搜索"
                        enter-button="Search"
                        placeholder="请输入订单编号"
                        @search="idSearchWaiting" style="margin-top: 16px;"/>
            <a-button  style="float: left; margin-top: 16px;" @click="getData()"><a-icon type="sync"/>显示所有未付款订单</a-button>
          </div>
        </a-card>
        <a-card v-for="order in waitingOrders"
                style="cursor: pointer; margin-bottom: 16px;">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;" @click="$router.push({name: 'PayOrder', params: {orderInfo: order}})">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;" @click="$router.push({name: 'PayOrder', params: {orderInfo: order}})">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  订单编号:
                  <span style="color: orangered; margin-left: 16px;">{{order.ordersId}}</span>
                </div>
                <div style="display: flex;">
                  货物名称:
                  <span style="color: orangered; margin-left: 16px;">{{order.ordersName}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: orangered; margin-left: 16px;">{{order.createTime}}</span>
                </div>
                <div style="display: flex;">
                  运费(元):
                  <span style="color: orangered; margin-left: 16px;">{{order.ordersPrice}}</span>
                </div>
                <div style="display: flex;" v-if="!isCancel">
                  <a-button type="danger" @click="handleDelete(order)">取消订单</a-button>
                </div>
              </div>
            </a-col>
            <a-col :flex="cancelFlex" v-if="isCancel">
              <a-button type="danger" style="float: right;" @click="handleDelete(order)">取消订单</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="4" tab="已完成订单">
         <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
          <div style="overflow: hidden;">
            <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">已完成订单查询</div>
            <a-input-search addon-before="按名称搜索"
                        enter-button="Search"
                        placeholder="请输入货物名称"
                        @search="nameSearchFinish"/>
             <a-input-search addon-before="按编号搜索"
                        enter-button="Search"
                        placeholder="请输入订单编号"
                        @search="idSearchFinish" style="margin-top: 16px;"/>
            <a-button  style="float: left; margin-top: 16px;" @click="getData()"><a-icon type="sync"/>显示所有已完成订单</a-button>
          </div>
        </a-card>
        <a-card v-for="order in finishOrders"
                style="margin-bottom: 16px; cursor: pointer;"
                @click="$router.push({name: 'OrderDetail', params: {OrderInfo: order}})">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  订单编号:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersId}}</span>
                </div>
                <div style="display: flex;">
                  货物名称:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersName}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: indianred; margin-left: 16px;">{{order.createTime}}</span>
                </div>
                <div style="display: flex;">
                  订单状态:
                  <span style="color: indianred; margin-left: 16px;">{{order.ordersStatus}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "NowOrder",
  created() {
    this.getData()
  },
  mounted() {
    if(document.body.offsetWidth < 1000) {
      this.cancelFlex = 0
      this.isCancel = false
      this.cardOverflow = 'scroll'
      this.size = '0.8rem'
    }
  },
  data() {
    return {
      // 历史订单的一部分(实现加载更多)
      historyOrdersSub: [],
      // 当前加载的结尾(表示截取historyOrders的0-num个到historyOrdersSub,左闭右开区间)
      num: 5,
      // 历史订单
      historyOrders: [],
      // 待审核订单
      checkingOrders: [],
      // 已审核待支付订单
      waitingOrders: [],
      // 已完成订单
      finishOrders: [],
      // 当前页码
      page: 1,
      // 响应式布局
      cancelFlex: 1,
      isCancel: true,
      cardOverflow: 'hidden',
      size: '1.2rem'
    }
  },
  methods: {

    // 取消订单
    handleDelete(order) {
      let that = this
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
        } else
          that.$notification.error({
            duration: 4,
            message: '失败',
            description: '不能取消'
          })
      })
    },

    // 切换页面记录页码
    pageChange(e) {
      this.page = e
    },

    // 加载更多
    handleGetMore() {
      // 每次多显示5个历史订单
      this.num += 5
      if(this.num > this.historyOrders.length)
        this.num = this.historyOrders.length
      this.historyOrdersSub = this.historyOrders.slice(0, this.num)
    },

    // 历史订单按名称查询
    nameSearchHistory(value) {
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'name',
          queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/queryCancleOrders','post',obj).then(res => {
        that.historyOrders = JSON.parse(res)
        // 先显示5个历史订单
        that.historyOrdersSub = that.historyOrders.slice(0,5)
      })
    },

    // 历史订单按订单号查询
    idSearchHistory(value) {
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'id',
          queryFilterContent: value
      }
      let that = this
      fetchAPI('/orders/queryCancleOrders','post',obj).then(res => {
        that.historyOrders = JSON.parse(res)
        // 先显示5个历史订单
        that.historyOrdersSub = that.historyOrders.slice(0,5)
      })
    },

    // 待审核订单按名称查询
    nameSearchChecking(value) {
       let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'name',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/queryWaitCheckOrders','post',obj).then(res => {
        that.checkingOrders = JSON.parse(res)
      })
    },

    // 待审核订单按id查询
    idSearchChecking(value) {
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'id',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/queryWaitCheckOrders','post',obj).then(res => {
        that.checkingOrders = JSON.parse(res)
      })
    },

    // 待支付订单按名称查询
    nameSearchWaiting(value) {
       let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'name',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/queryWaitPurchaseOrders','post',obj).then(res => {
        that.waitingOrders = JSON.parse(res)
      })
    },

    // 待支付订单按订单号搜索
    idSearchWaiting(value) {
       let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'id',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/queryWaitPurchaseOrders','post',obj).then(res => {
        that.waitingOrders = JSON.parse(res)
      })
    },

    // 已完成订单按订单号搜索
    nameSearchFinish(value) {
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'name',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/getSuccessOrders','post',obj).then(res => {
        that.finishOrders = JSON.parse(res)
      })
    },

    // 已完成订单按名称搜索
    idSearchFinish(value) {
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: 'id',
          queryFilterContent: value
       }
      let that = this
      fetchAPI('/orders/getSuccessOrders','post',obj).then(res => {
        that.finishOrders = JSON.parse(res)
      })
    },

    // 加载信息
    getData() {
      let that = this
      let obj = {
          queryAccountName: this.$store.state.user.username,
          queryFilter: '',
          queryFilterContent: ''
        }
      // 为了避免后端同时接收多个次相同请求造成错误，这里用链式promise处理(可以抛出reject终止promise，试过没用，终止promise但是没有终止请求)
      // 目前没学过节流函数和防抖函数，下次优化：写节流函数，以下代码面对大量数据性能会下降很多
      new Promise((resolve, reject) => {
         fetchAPI('/orders/queryCancleOrders','post', obj).then(res => {
            that.historyOrders = JSON.parse(res)
            // 先显示5个历史订单
            that.historyOrdersSub = that.historyOrders.slice(0, 5)
            resolve()
         })
      }).then(res => {
        return new Promise((resolve, reject) => {
          fetchAPI('/orders/queryWaitCheckOrders', 'post', obj).then(res => {
            that.checkingOrders = JSON.parse(res)
            resolve()
          })
        })
      }).then(res => {
        return new Promise((resolve, reject) => {
          fetchAPI('/orders/queryWaitPurchaseOrders', 'post', obj).then(res => {
            that.waitingOrders = JSON.parse(res)
            resolve()
          })
        })
      }).then(res => {
        fetchAPI('/orders/getSuccessOrders', 'post', obj).then(res => {
          that.finishOrders = JSON.parse(res)
        })
      })
    },
  }
}
</script>

<style scoped>

</style>