<template>
  <div style="height: 100%; overflow-y: scroll;">
    <a-card v-for="item in items"
            style="margin-top: 16px; cursor: pointer;"
            @click="$router.push({name: 'Process', params: {id: item.id, name: item.name, time: item.time}})">
      <a-row type="flex" justify="start" >
        <a-col flex="80px" style="overflow: hidden;">
          <a-icon type="gift" style="font-size: 60px; float: left;"/>
        </a-col>
        <a-col flex="1" style="overflow: hidden;">
          <div style="float: left; font-size: 1.2rem; font-weight: bold;">
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
  </div>
</template>

<script>
export default {
  name: "Ask",
  data() {
    return {
      items: [
        {
          id: '1',
          name: '辣条',
          time: '2021-06-05'
        },
        {
          id: '2',
          name: 'GTX 3080Ti',
          time: '2021-06-04'
        },
        {
          id: '3',
          name: '哈根达斯',
          time: '2021-06-06'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>