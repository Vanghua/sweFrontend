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
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Shelf",
  mounted() {
    this.houseInfo = this.$route.params.houseInfo
  },
  data() {
    return {
      // 仓库信息(back回退无法传递参数，这里只是简单push回去，上一级的仓库详情界面需要带参数，这里保存参数)
      houseInfo: {}
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>