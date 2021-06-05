<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="userEmailChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
      <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 20 },}">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">修改用户绑定邮箱</div>
        <a-form-item label="当前邮箱">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入126或163或qq邮箱">
            <a-input type="text"
                     size="large"
                     :disabled="true"
                     :placeholder="email"
                     v-decorator="['nowEmail',{rules: [{pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="新邮箱">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入126或163或qq邮箱">
            <a-input type="text"
                     size="large"
                     placeholder="提示：请输入126或163或qq邮箱"
                     v-decorator="['newEmail',{rules: [{required: true, pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入有误'}], validateTrigger: 'change'}]">
              <a-button slot="addonAfter" type="primary" style="float: right;" @click="getCheckNum">发送验证码</a-button>
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="验证码">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入发送到邮箱的6位验证码">
            <a-input type="text"
                     size="large"
                     placeholder="请输入验证码"
                     v-decorator="['checkNum',{rules: [{required: true, pattern: new RegExp('^[0-9]{6,7}$','i'), message: '验证码格式输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <div>
           <a-button type="primary" id="ensureUserPassword" htmlType="submit">保存编辑</a-button>
           <a-button type="danger" @click="$emit('close')" id="cancelUserEmail">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "ChangeUserEmail",
  props:{
    email: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {

    // 提交修改
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['newEmail', 'checkNum']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          let obj = {
            accountName: that.userName,
            accountEmail: values.newEmail,
            validationCode: values.checkNum
          }
          fetchAPI('/account/resetEmail','post',obj).then(res => {
            if(res == '成功') {
              that.$notification.success({
                  message: '成功',
                  description: '修改成功',
                  duration: 4
              })
              that.$emit('close')
            } else {
              that.$notification['error']({
                  message: '错误',
                  description: '验证码错误',
                  duration: 4
              })
            }
          })
        } else {
          that.$notification['error']({
              message: '错误',
              description: '新邮箱不符合规范',
              duration: 4
          })
        }
      })
    },

    // 发送验证码
    getCheckNum() {
      if (this.form.getFieldValue('newEmail') == undefined) {
        this.failureTip('错误', '请输入合法邮箱')
      } else {
        let payload = { email:this.form.getFieldValue('newEmail') }
        fetchAPI('/account/getResetEmailValidation', 'post', payload).then(res => {
          if(res == '已发送') {
            this.$notification.success({
              message: '成功',
              description: '验证码已发送'
            })
          }
          else
             this.$notification['error']({
                message: '失败',
                description: '邮箱已存在',
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
    .userEmailChange {
      width: 80%;
      left: 10%;
      height: 400px;
    }
    #ensureUserPassword {
      float: left;
    }
  }

  @media screen and (min-width: 1000px) {
    .userEmailChange {
      width: 40%;
      left: 30%;
      height: 350px;
    }
    #ensureUserPassword {
      float: left;
      margin-left: 24px;
    }
  }
</style>