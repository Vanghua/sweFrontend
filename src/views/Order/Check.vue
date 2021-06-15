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
      </a-descriptions>
      <a-card>
        <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 16 },}">
          <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">填写审核内容</div>
          <a-form-item label="货物重量">
            <a-input type="text"
                     size="large"
                     placeholder="请输入数字单位是kg"
                     v-decorator="['weight',{rules: [{required: true, pattern: new RegExp('^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$','i'), message: '物品重量格式输入有误'}], validateTrigger: 'change'}]"/>
          </a-form-item>
          <a-form-item label="货物种类">
            <a-select style="width: 100%;" @change="" v-decorator="['type',{rules: [{required: true, message: '请填写货物种类'}]}]">
              <a-select-option value="1">日用品</a-select-option>
              <a-select-option value="2.1 ">食品</a-select-option>
              <a-select-option value="2">文件</a-select-option>
              <a-select-option value="1.1">衣物</a-select-option>
              <a-select-option value="3.1">数码产品</a-select-option>
              <a-select-option value="5">贵重物品</a-select-option>
              <a-select-option value="3">其他</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="货物运费">
            <a-input type="text"
                     size="large"
                     :disabled="true"
                     v-decorator="['cost', {rules: [{required: true, message: '请点击生成运费'}]}]"/>
          </a-form-item>
          <a-button type="primary" class="pass" htmlType="submit">审核通过</a-button>
          <a-button type="primary" @click="calc" class="pass" >生成运费</a-button>
        </a-form>
      </a-card>
      <a-card style="margin-top: 24px;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">填写不通过原因</div>
        <a-textarea style="margin-left: 5%; width: 90%;" v-model="reason" placeholder="请输入50字以内的不通过原因"/>
        <a-popconfirm title="确认要不通过吗" okText="确认" cancelText="取消" @confirm="submitReason">
          <a-button type="primary" class="pass" style="margin-top: 16px;">审核不通过</a-button>
        </a-popconfirm>
      </a-card>
      <a-button type="danger" @click="$router.push({name: 'Order'})" class="pass" style="margin-top: 24px;">返回</a-button>
     </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
export default {
  name: "Check",
  mounted() {
    this.item = this.$route.params.itemInfo
    this.item.userPriority = this.item.userPriority == '2' ? '普通' : this.item.userPriority == '3' ? '急件' : '慢件'
  },
  data() {
    return {
      // 订单信息
      item: {},
      form: this.$form.createForm(this),
      // 需要使用百度地图实例
      map: {},
      // 成本
      base: 0,
      // 审核不通过原因
      reason: ''
    }
  },
  watch: {

  },
  methods: {

    // 审核通过
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['cost', 'type', 'weight']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          let obj = {
            ordersId: that.item.ordersId,
            goodPriority: that.judge(values.type),
            orderManagerName: that.$store.state.user.username,
            goodWeight: values.weight,
            ordersPrice: parseFloat(values.cost).toFixed(2),
            ordersCost: parseFloat(that.base)
          }
          fetchAPI('/orders/checkPass','post',obj).then(res => {
            if(res == '审核完成') {
              that.$notification.success({
                message: '成功',
                description: '审核完成',
                duration: 4
              })
              that.$router.push({name: 'Order'})
            }
            else
              that.$notification['error']({
                  message: '错误',
                  description: '审核失败',
                  duration: 4
              })
          })
        } else
           that.$notification['error']({
              message: '错误',
              description: '输入信息不合法',
              duration: 4
           })
      })
    },

    // 运费计算函数
    calc() {
      let dis = Math.sqrt(Math.pow((this.item.senderLng - this.item.receiverLng),2) + Math.pow((this.item.senderLat - this.item.receiverLat),2))
      let weight = this.form.getFieldValue('weight') === undefined ? 0 : this.form.getFieldValue('weight')
      let type = this.form.getFieldValue('type') === undefined ? 0 : this.form.getFieldValue('type')
      let priority = this.item.userPriority == '急件' ? 3 : this.item.userPriority == '慢件' ? 1 : 2
      this.base = (0.1 * dis) * 10 * 0.3
      let ans = ((0.1 * dis + 0.2 * weight + 0.2 * type + 3 * priority) * 10 * 0.5).toFixed(2) / 5
      this.form.setFieldsValue({'cost': ans})
    },

    // 判断货物种类
    judge(e) {
      if(e == 1)
        return '日用品'
      else if(e == 2)
        return '文件'
      else if(e == 2.1)
        return '食品'
      else if(e == 1.1)
        return '衣物'
      else if(e == 3.1)
        return '数码产品'
      else if(e == 5)
        return '贵重物品'
      else if(e == 3)
        return '其它'

      // switch(e) {
      //   case 1:
      //     return '日用品'
      //   case 2:
      //     return '文件'
      //   case 2.1:
      //     return '食品'
      //   case 1.1:
      //     return '衣物'
      //   case 3.1:
      //     return '数码产品'
      //   case 5:
      //     return '贵重物品'
      //   case 3:
      //     return '其它'
      // }
    },

    // 审核不通过的提交
    submitReason() {
      if(this.reason.length == 0)
        this.$notification['error']({
            message: '错误',
            description: '请输入不通过原因',
            duration: 4
        })
      else if(this.reason.length > 50)
        this.$notification['error']({
            message: '错误',
            description: '不通过原因请控制在50字内',
            duration: 4
        })
      else {
        let obj = {
          ordersId: this.item.ordersId,
          orderManagerName: this.$store.state.user.username,
          cancleReason: this.reason
        }
        let that = this
        fetchAPI('/orders/checkFail','post',obj).then(res => {
          if(res == '审核完成') {
            that.$notification.success({
                message: '成功',
                description: '审核完成',
                duration: 4
              })
            that.$router.push({name: 'Order'})
          } else
            that.$notification['error']({
                message: '错误',
                description: '审核失败',
                duration: 4
            })
        })
      }
    },
  }
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