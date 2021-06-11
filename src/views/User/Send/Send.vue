<template>
  <div style="height: 100%;">
    <a-card @click="$router.push({name: 'MailInfo', params: { mailInfo: mailInfo, acceptInfo: acceptInfo}})" style="cursor: pointer; font-weight: bold;">
      <span style="float: left;">请填写寄件人信息(点击填写)</span>
      <span style="float: right;">
        当前状态:
        <span :style="{color: mailColor}">{{mailState}}</span>
      </span>
    </a-card>
    <a-card @click="$router.push({name: 'AcceptInfo', params: { acceptInfo: acceptInfo, mailInfo: mailInfo }})" style="cursor:pointer; font-weight: bold;">
      <span style="float: left;">请填写收件人信息(点击填写)</span>
      <span style="float: right;">
        当前状态:
        <span :style="{color: acceptColor}">{{acceptState}}</span>
      </span>
    </a-card>
    <a-card style="margin-top: 44px; font-weight: bold;">
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; display: flex;">填写物品信息</div>
      <div style="display: flex; margin-bottom: 16px; align-items: center;">
        <a-select default-value="普通" style="width: 300px;">
          <a-select-option value="急件">急件</a-select-option>
          <a-select-option value="普通">普通</a-select-option>
          <a-select-option value="慢件">慢件</a-select-option>
        </a-select>
      </div>
      <div style="overflow: hidden; display: flex;" :value="goodType">
        <a-input addon-before="货物名称" v-model="goodName" style="margin-bottom: 16px; width: 300px;"/>
      </div>
      <a-button type="primary" style="float: left;" @click="handleSubmit">提交</a-button>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "Send",
  mounted() {
    // 判断填写情况
    this.acceptInfo = JSON.stringify(this.acceptInfo) == JSON.stringify({}) ? this.$route.params.acceptInfo : this.acceptInfo
    this.mailInfo = JSON.stringify(this.mailInfo) == JSON.stringify({}) ? this.$route.params.mailInfo : this.mailInfo
    if(JSON.stringify(this.acceptInfo) === JSON.stringify({}) || JSON.stringify(this.acceptInfo) == undefined) {
      this.acceptColor = 'red'
      this.acceptState = '未填写'
      this.State.accept = false
    }
    else if(JSON.stringify(this.acceptInfo) != JSON.stringify({})) {
      this.acceptColor = 'green'
      this.acceptState = '已填写'
      this.State.accept = true
    }
    if(JSON.stringify(this.mailInfo) === JSON.stringify({}) || JSON.stringify(this.mailInfo) == undefined) {
      this.mailColor = 'red'
      this.mailState = '未填写'
      this.State.mail = false
    }
    else {
      this.mailColor = 'green'
      this.mailState = '已填写'
      this.State.mail = true
    }
  },
  data() {
    return {
      // 收寄件信息填写状态
      State: {
        mail: false,
        accept: false
      },
      // 判断是否填写信息的文字和文字颜色
      acceptState: '',
      acceptColor: '',
      mailState: '',
      mailColor: '',
      // 取件人信息
      acceptInfo: {},
      // 寄件人信息
      mailInfo: {},
      form: this.$form.createForm(this),
      // 货物名称
      goodName: '',
      // 货物种类
      goodType: '普通'
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.acceptInfo)
      if(this.acceptInfo === undefined)
        this.$notification['error']({
            message: '失败',
            description: '收件人信息未填写',
            duration: 4
        })
      else if(this.mailInfo === undefined)
        this.$notification['error']({
            message: '失败',
            description: '寄件人信息未填写',
            duration: 4
        })
      else if(this.goodName === '')
        this.$notification['error']({
            message: '失败',
            description: '货物名称未填写',
            duration: 4
        })
      else {
        let that = this
        let obj = {
          // 发起人
          accountName: this.mailInfo.name,
          // 货物信息
          ordersName: this.goodName,
          userPriority: this.goodType === '急件' ? 3 : this.goodType === '普通' ? 2 : 1,
          // 收件人信息
          receiverName: this.acceptInfo.name,
          receiverPhone: this.acceptInfo.phone,
          receiverAddress: this.acceptInfo.address,
          receiverDetailAddress: this.acceptInfo.addressDetail,
          receiverLng: this.acceptInfo.point.lng,
          receiverLat: this.acceptInfo.point.lat,
          // 寄件人信息
          senderName: this.mailInfo.name,
          senderPhone: this.mailInfo.phone,
          senderAddress: this.mailInfo.address,
          senderDetailAddress: this.mailInfo.addressDetail,
          senderLng: this.mailInfo.point.lng,
          senderLat: this.mailInfo.point.lat
        }
        console.log(obj)
        fetchAPI('/orders/createOrders', 'post', obj).then(res => {
          if(res === '成功')
            this.$notification.success({
              message: '成功',
              description: '订单已经成功生成'
            })
          else
            this.$notification['error']({
                message: '失败',
                description: '订单创建失败',
                duration: 4
            })
        })
      }
    },
  }
}
</script>

<style scoped>

</style>