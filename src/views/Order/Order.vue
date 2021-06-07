<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card style="font-weight: bold; font-size: 1.2rem;"><div style="float: left;">订单审核</div></a-card>
    <a-card v-for="item in items"
            style="margin-top: 16px; cursor: pointer;"
            @click="$router.push({name: 'Check'})">
      <a-row type="flex" justify="start" >
        <a-col flex="80px" style="overflow: hidden;">
          <a-icon type="gift" style="font-size: 60px; float: left;"/>
        </a-col>
        <a-col flex="1" style="overflow: hidden;">
          <div style="float: left; font-size: 1.2rem; font-weight: bold;">
            <div style="display: flex;">货物名称: {{item.name}}</div>
            <div style="display: flex;">下单时间: {{item.time}}</div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      items: [
        {
          id: '1',
          name: '北极熊抱枕',
          time: '2021-06-06'
        },
        {
          id: '2',
          name: '澳洲A9和牛',
          time: '2021-06-06'
        },
        {
          id: '3',
          name: '三国杀典藏版',
          time: '2021-06-06'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>