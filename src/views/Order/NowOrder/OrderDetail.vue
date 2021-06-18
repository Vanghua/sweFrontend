<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card>
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 24px;">订单详情</div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;">
        <a-descriptions-item label="订单寄件人姓名" :span="2">{{item.senderName}}</a-descriptions-item>
        <a-descriptions-item label="订单寄件人联系方式" :span="2">{{item.senderPhone}}</a-descriptions-item>
        <a-descriptions-item label="订单寄件人地址" :span="2">{{item.senderAddress[0]+'/'+item.senderAddress[1]+'/'+item.senderAddress[2]}}</a-descriptions-item>
        <a-descriptions-item label="订单寄件人详细地址" :span="2">{{item.senderDetailAddress}}</a-descriptions-item>

        <a-descriptions-item label="订单收件人姓名" :span="2">{{item.receiverName}}</a-descriptions-item>
        <a-descriptions-item label="订单收件人联系方式" :span="2">{{item.receiverPhone}}</a-descriptions-item>
        <a-descriptions-item label="订单收件人地址" :span="2">{{item.receiverAddress[0]+'/'+item.receiverAddress[1]+'/'+item.receiverAddress[2]}}</a-descriptions-item>
        <a-descriptions-item label="订单收件人详细地址" :span="2">{{item.receiverDetailAddress}}</a-descriptions-item>

        <a-descriptions-item label="订单创建时间" :span="2">{{item.createTime}}</a-descriptions-item>
        <a-descriptions-item label="订单发起人姓名" :span="2">{{item.accountName}}</a-descriptions-item>
        <a-descriptions-item label="订单状态" :span="2">{{item.ordersStatus}}</a-descriptions-item>
        <a-descriptions-item label="货物名称" :span="2">{{item.ordersName}}</a-descriptions-item>
        <a-descriptions-item label="寄件类型" :span="2">{{item.userPriority}}</a-descriptions-item>
        <a-descriptions-item label="完成时间" :span="2" v-if="item.ordersStatus == '已完成' ? true: false">{{item.successTime}}</a-descriptions-item>
        <a-descriptions-item label="取消原因" :span="2" v-if="item.ordersStatus == '取消' ? true: false">{{item.cancleReason}}</a-descriptions-item>
      </a-descriptions>
      <a-button type="danger" @click="$router.push({name: 'NowOrder'})" class="pass" style="margin-top: 24px;">返回</a-button>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  mounted() {
    this.item = this.$route.params.OrderInfo
    this.item.userPriority = this.item.userPriority == '3' ? '急件' : this.item.userPriority == '2' ? '普通' : '慢件'
  },
  data() {
    return {
      item: {}
    }
  }
}
</script>

<style scoped>

</style>