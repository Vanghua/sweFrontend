<template>
  <div style="height: 100%; overflow-y: scroll;">
    <div style="display: flex; font-size: 1.5rem; font-width: bold; margin-bottom: 16px;">订单支付</div>
    <div style="display: flex;font-size: 1.2rem; font-weight: bold; color: orangered;">您需要支付: {{$route.params.orderInfo.ordersPrice}} 元 !!!</div>
    <div style="display: flex; justify-content: center;">
      <img src="../../../../public/pay.jpg" width="400px" height="400px">
    </div>
    <a-popconfirm title="确定支付了吗？这可事关诚信噢!" okText="确认" cancelText="取消" @confirm="handlePay">
      <a-button type="primary" @click="" style="margin-right: 16px;">确认付款</a-button>
    </a-popconfirm>
    <a-button type="danger" @click="$router.push({name: 'NowOrder'})">返回</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "PayOrder",
  methods: {
    handlePay() {
      let obj = {
        ordersId: this.$route.params.orderInfo.ordersId
      }
      let that = this
      fetchAPI('/orders/purchaseOrders','post',obj).then(res => {
        if(res == '成功') {
          that.$notification.success({
            message: '成功',
            description: '付款成功',
            duration: 4
          })
          that.$router.push({name: 'NowOrder'})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>