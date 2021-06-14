<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">进行中订单查询</div>
        <a-input-search addon-before="按名称搜索"
                    enter-button="Search"
                    placeholder="请输入货物名称"
                    @search=""/>
         <a-input-search addon-before="按编号搜索"
                    enter-button="Search"
                    placeholder="请输入订单编号"
                    @search=""
                    style="margin-top: 16px;"/>
        <a-button  style="float: left; margin-top: 16px;" @click="getData();"><a-icon type="sync"/>显示所有进行中的订单</a-button>
      </div>
    </a-card>
    <a-card v-for="item in items"
            style="margin-top: 16px; cursor: pointer;"
            @click="$router.push({name: 'Process', params: {orderInfo: item}})">
      <a-row type="flex" justify="start" >
        <a-col flex="80px" style="overflow: hidden;">
          <a-icon type="gift" style="font-size: 60px; float: left;"/>
        </a-col>
        <a-col flex="1" style="overflow: hidden;">
          <div style="float: left; font-size: 1.2rem; font-weight: bold;">
            <div style="display: flex;">
              订单编号:
              <span style="color: grey; margin-left: 16px;">123</span>
            </div>
            <div style="display: flex;">
              货物名称:
              <span style="color: grey; margin-left: 16px;">{{item.name}}</span>
            </div>
            <div style="display: flex;">
              发货时间:
              <span style="color: grey; margin-left: 16px;">{{item.time}}</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-button type="primary" style="margin-top: 24px;" @click="handleGetMore">点击加载更多</a-button>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "Ask",
  mounted() {
    // this.getData()
  },
  data() {
    return {
      items: [],
      // 进行中订单的一部分
      subItems: [],
      num: 5,
    }
  },
  methods: {

    // 加载数据
    getData() {
      let that = this
      let obj = {}
      fetchAPI('','post',obj).then(res => {
        that.items = JSON.parse(res)
        that.subItems = that.items.slice(0,5)
      })
    },

    // 加载更多数据
    handleGetMore() {
      // 每次多显示5个历史订单
      this.num += 5
      if(this.num > this.items.length)
        this.num = this.items.length
      this.subItems = this.subItems.slice(0, this.num)
    },

    // 按名称查询
    nameSearch(value) {
      let obj = {

      }
      let that = this
      fetchAPI('','post',obj).then(res => {
        that.items = JSON.parse(res)
        // 先显示5个历史订单
        that.subItems = that.subItems.slice(0,5)
      })
    },

    // 按id查询
    idSearch(value) {
      let obj = {

      }
      let that = this
      fetchAPI('','post',obj).then(res => {
        that.items = JSON.parse(res)
        // 先显示5个历史订单
        that.subItems = that.subItems.slice(0,5)
      })
    },
  }
}
</script>

<style scoped>

</style>