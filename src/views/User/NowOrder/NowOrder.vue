<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-tabs default-active-key="1" @change="" style="font-weight: bold;">
      <a-tab-pane key="1" tab="历史订单">
        <a-card v-for="order in historyOrders">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  货物名称:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.name}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.time}}</span>
                </div>
                <div style="display: flex;">
                  运费(元):
                  <span style="color: lightseagreen; margin-left: 16px;">{{order.cost}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
        <a-button type="primary" style="margin-top: 24px;">点击加载更多</a-button>
      </a-tab-pane>
      <a-tab-pane key="2" tab="审核中订单">
        <a-card v-for="order in checkingOrders">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  货物名称:
                  <span style="color: indianred; margin-left: 16px;">{{order.name}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: indianred; margin-left: 16px;">{{order.time}}</span>
                </div>
                <div style="display: flex;">
                  运费(元):
                  <span style="color: indianred; margin-left: 16px;">{{order.cost}}</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="已审核中代付款订单">
        <a-card v-for="order in waitingOrders"
                @click="$router.push({name: 'PayOrder', params: {name: order.name, time: order.time, cost: order.cost}})"
                style="cursor: pointer;">
          <a-row type="flex" justify="start" >
            <a-col flex="80px" style="overflow: hidden;">
              <a-icon type="gift" style="font-size: 60px; float: left;"/>
            </a-col>
            <a-col flex="1" style="overflow: hidden;">
              <div style="float: left; font-size: 1.2rem; font-weight: bold;">
                <div style="display: flex;">
                  货物名称:
                  <span style="color: orangered; margin-left: 16px;">{{order.name}}</span>
                </div>
                <div style="display: flex;">
                  下单时间:
                  <span style="color: orangered; margin-left: 16px;">{{order.time}}</span>
                </div>
                <div style="display: flex;">
                  运费(元):
                  <span style="color: orangered; margin-left: 16px;">{{order.cost}}</span>
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
export default {
  name: "NowOrder",
  data() {
    return {
      historyOrders: [
        {
          name: 'AirJordan 35',
          time: '2021-6-7',
          cost: 10
        },
        {
          name: '爱马仕尼罗河花园香水 50ml',
          time: '2021-6-4',
          cost: 100
        },
      ],
      checkingOrders: [
        {
          name: '格力空调',
          time: '2021-6-6',
          cost: 120
        },
        {
          name: '巴西百香果2kg',
          time: '2021-6-6',
          cost: 150
        },
      ],
      waitingOrders: [
        {
          name: '玫瑰花',
          time: '2021-6-5',
          cost: 10
        },
        {
          name: '斯伯丁篮球',
          time: '2021-6-5',
          cost: 10
        },
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>