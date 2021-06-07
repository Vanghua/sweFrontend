<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card>
      <a-button type="danger" @click="$router.push({name: 'WareHouseDetail', params: {houseInfo}})">返回</a-button>
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