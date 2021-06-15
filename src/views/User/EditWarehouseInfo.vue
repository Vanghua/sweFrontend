<template>
  <div style="height: 100%;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              padding: 24px 0px;
              background-color: #ffffff;
              overflow-y: scroll;">
    <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 16 },}">
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">编辑运输员信息</div>
      <a-form-item label="运输员所属仓库">
        <a-input size="large"
                 type="text"
                 placeholder="请输入所属仓库的编号"
                 v-decorator="['id',{rules: [{required: true, message: '请按规范输入仓库编号', pattern: new RegExp('^[0-9]+$','i')}]}]"/>
      </a-form-item>
      <a-form-item label="运输员载具容量">
        <a-input size="large"
                 type="text"
                 placeholder="请输入运输员载具运载量"
                 v-decorator="['content',{rules: [{required: true, message: '请按规范输入运载量', pattern: new RegExp('^[0-9]+$','i')}]}]"/>
      </a-form-item>
      <a-button type="primary" style="margin-right: 24px;" htmlType="submit">保存编辑</a-button>
      <a-button type="danger" @click="$emit('close')">返回</a-button>
    </a-form>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "EditWarehouseInfo",
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['id', 'content']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if (!err) {
          let obj = {
            accountName: this.$store.state.user.username,
            warehouseId: values.id,
            transWeight: values.content
          }
          fetchAPI('/assign/transEdit','post',obj).then(res => {
            if(res == '成功') {
              that.$notification.success({
                message: '成功',
                description: '编辑成功',
                duration: 4
              })
              that.$emit('close')
            } else if(res == '仓库不存在')
              that.$notification['error']({
                  message: '错误',
                  description: '仓库不存在',
                  duration: 4
              })
          })
        } else
          that.$notification['error']({
              message: '错误',
              description: '信息填写不规范',
              duration: 4
          })
      })
    }
  }
}
</script>

<style scoped>

</style>