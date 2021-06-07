<template>
  <div style="height: 100%; overflow-y: scroll;">
     <a-card>
       <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">订单详情</div>
       <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}" style="margin-bottom: 24px;">
        <a-descriptions-item label="订单寄件人姓名" :span="2">樊华</a-descriptions-item>
        <a-descriptions-item label="订单寄件人联系方式" :span="2">13838392153</a-descriptions-item>
        <a-descriptions-item label="订单寄件人地址" :span="2">河南省/郑州市/金水区</a-descriptions-item>
        <a-descriptions-item label="订单寄件人详细地址" :span="2">红专路52号院</a-descriptions-item>
        <a-descriptions-item label="订单收件人姓名" :span="2">吴彦祖</a-descriptions-item>
        <a-descriptions-item label="订单收件人联系方式" :span="2">17863025619</a-descriptions-item>
        <a-descriptions-item label="订单收件人地址" :span="2">山东省/威海市/环翠区</a-descriptions-item>
        <a-descriptions-item label="订单收件人详细地址" :span="2">文化西路180号</a-descriptions-item>
      </a-descriptions>
       <a-button type="primary" @click="" class="pass">审核通过</a-button>
       <a-button type="primary" @click="" class="pass">审核不通过</a-button>
       <a-button type="danger" @click="$router.back()" class="pass">返回</a-button>
     </a-card>
  </div>
</template>

<script>
export default {
  name: "Check"
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .pass {
      float: left;
    }
  }

  @media screen and (min-width: 1000px) {
    .pass{
      float: left;
      margin-left: 24px;
    }
  }
</style>