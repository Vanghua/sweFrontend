<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="userInfoChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
      <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 5 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 },}" >
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">修改用户信息</div>
        <a-form-item label="用户名">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2-16位汉字或数字或字母组成的用户名">
            <a-input type="text"
                    size="large"
                    :placeholder="userName"
                    :disabled="true"
                    v-decorator="['userName',{rules: [{ min: 2, max: 16, pattern: new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$','i'), message: '用户名输入不合法'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="真实姓名">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2-10位汉字组成的真实姓名">
          <a-input type="text"
                  size="large"
                  :placeholder="userRealName"
                  v-decorator="['realName',{rules: [{ min: 2, max: 10, pattern: new RegExp('^[\u4e00-\u9fa5]{2,10}$','i'), message: '真实姓名输入不合法'}], validateTrigger: 'change'}]">
          </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="绑定邮箱">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入126或168或qq邮箱">
          <a-input type="text"
                  size="large"
                  :placeholder="userEmail"
                  :disabled="true"
                  v-decorator="['email',{rules: [{ pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入不合法'}], validateTrigger: 'change'}]">
          </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="联系方式">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入中国大陆11位手机号">
          <a-input type="text"
                  size="large"
                  :placeholder="userPhone"
                  v-decorator="['phone',{rules: [{ pattern: new RegExp('^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$','i'), message: '手机号输入不合法'}], validateTrigger: 'change'}]">
          </a-input>
          </a-tooltip>
        </a-form-item>
        <div>
           <a-button type="primary" id="ensureUserInfo" htmlType="submit">保存编辑</a-button>
           <a-button type="danger" @click="$emit('close')" id="cancelUserInfo">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "ChangeUserInfo",
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  mounted() {
    // 设置初始值
    this.form.setFieldsValue({
      userName: this.userName,
      realName: this.userRealName,
      email: this.userEmail,
      phone: this.userPhone
    })
  },
  methods: {
    submitAll(e) {
      e.preventDefault()
      let validateFieldsKey = ['userName', 'realName', 'email', 'phone']
      let that = this
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          let obj = {
            accountName: values.userName,
            trueName: values.realName,
            telephone: values.phone
          }
          fetchAPI('/account/updatePersonalInfo','post',obj).then(res => {
            if(res == '成功') {
              that.$notification.success({
                  message: '成功',
                  description: '修改成功',
                  duration: 4
              })
              that.$emit('close')
              }
          })
        } else {
          that.$notification['error']({
              message: '错误',
              description: '修改不符合规范',
              duration: 4
          })
        }
      })
    }
  },
  props: {
    userName: {
      type: String,
      required: true
    },
    userRealName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userPhone: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .userInfoChange {
      width: 80%;
      left: 10%;
      height: 500px;
    }
    #ensureUserInfo {
      float: left;
    }
    #cancelUserInfo {
      float: right;
    }
  }

  @media screen and (min-width: 1000px) {
    .userInfoChange {
      width: 40%;
      left: 30%;
      height: 400px;
    }
    #ensureUserInfo {
      float: left;
      margin-left: 24px;
    }
    #cancelUserInfo {
      float: left;
      margin-left: 24px;
    }
  }
</style>