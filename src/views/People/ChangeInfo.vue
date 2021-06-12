<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="userInfoChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
       <a-form :form="form" @submit="subitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 20 },}">
         <a-tabs default-active-key="1" @change="handleChange" style="font-weight: bold;">
           <a-tab-pane key="1" tab="修改邮箱信息">
             <a-form-item label="当前邮箱">
              <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入126或163或qq邮箱">
                <a-input type="text"
                         size="large"
                         :disabled="true"
                         :placeholder="userInfo.account_email"
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
                  <a-button slot="addonAfter" type="primary" style="float: right;" @click="">发送验证码</a-button>
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
           </a-tab-pane>
           <a-tab-pane key="2" tab="修改其它信息">
             <a-form-item label="用户名">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2-16位汉字或数字或字母组成的用户名">
                  <a-input type="text"
                          size="large"
                          :placeholder="userInfo.account_name"
                          :disabled="true"
                          v-decorator="['userName',{rules: [{ min: 2, max: 16, pattern: new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$','i'), message: '用户名输入不合法'}], validateTrigger: 'change'}]">
                  </a-input>
                </a-tooltip>
              </a-form-item>
              <a-form-item label="真实姓名">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2-10位汉字组成的真实姓名">
                  <a-input type="text"
                          size="large"
                          :placeholder="userInfo.true_name"
                          v-decorator="['realName',{rules: [{ min: 2, max: 10, pattern: new RegExp('^[\u4e00-\u9fa5]{2,10}$','i'), message: '真实姓名输入不合法'}], validateTrigger: 'change'}]">
                  </a-input>
                </a-tooltip>
              </a-form-item>
              <a-form-item label="联系方式">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入中国大陆11位手机号">
                  <a-input type="text"
                          size="large"
                          :placeholder="userInfo.telephone"
                          v-decorator="['phone',{rules: [{ pattern: new RegExp('^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$','i'), message: '手机号输入不合法'}], validateTrigger: 'change'}]">
                  </a-input>
                </a-tooltip>
              </a-form-item>
              <a-form-item label="用户类型">
                  <a-input type="text"
                          size="large"
                          :disabled="true"
                          :placeholder="userInfo.account_type"
                          v-decorator="['type',{rules: [{ pattern: new RegExp('^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$','i'), message: '手机号输入不合法'}], validateTrigger: 'change'}]">
                  </a-input>
              </a-form-item>
           </a-tab-pane>
           <a-tab-pane key="3" tab="修改用户密码">
              <a-form-item label="当前密码">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入8-16位的密码必须是数字,字母,字符的组合">
                  <a-input-password
                        size="large"
                        placeholder="请输入8-16位的密码必须是数字,字母,字符的组合"
                        v-decorator="['nowPassword']">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                  </a-input-password>
                </a-tooltip>
              </a-form-item>
              <a-form-item label="新密码">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入8-16位的密码必须是数字,字母,字符的组合">
                  <a-input-password
                        size="large"
                        placeholder="请输入8-16位的密码必须是数字,字母,字符的组合"
                        v-decorator="['newPassword',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: compareUserPassword}], validateTrigger: 'change'}]">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                  </a-input-password>
                </a-tooltip>
              </a-form-item>
              <a-form-item label="确认密码">
                <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入8-16位的密码必须是数字,字母,字符的组合">
                  <a-input-password
                        size="large"
                        placeholder="请输入8-16位的密码必须是数字,字母,字符的组合"
                        v-decorator="['rePassword',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: checkUserPassword}], validateTrigger: 'change'}]">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                  </a-input-password>
                </a-tooltip>
              </a-form-item>
           </a-tab-pane>
         </a-tabs>
         <a-button type="primary" class="ensureUserInfo" htmlType="submit">保存编辑</a-button>
         <a-button @click="$emit('close')" type="danger" class="cancel">返回</a-button>
       </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "ChangeInfo",
  data() {
    return {
      form: this.$form.createForm(this),
      // 当前处于哪一个界面1,2,3
      pos: ''
    }
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 变更选择
    handleChange(e) {
      this.pos = e
    },

    // 保存更改
    subitAll() {
      let validateFieldsKey = []
      let that = this
      if(this.pos == 1)
        validateFieldsKey = ['newEmail', 'checkNum']
      else if(this.pos == 2)
        validateFieldsKey = ['realName', 'phone']
      else if(this.pos == 3)
        validateFieldsKey = ['newPassword', 'rePassword']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          if(that.pos == 1) {

          } else if(that.pos == 2) {

          } else if(that.pos == 3) {

          }
        } else
          that.$notification['error']({
            message: '错误',
            description: '输入格式不对',
            duration: 4
          })
      })
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
    .ensureUserInfo {
      float: left;
    }
    .cancel {
      float: right;
    }
  }

  @media screen and (min-width: 1000px) {
    .userInfoChange {
      width: 40%;
      left: 30%;
      height: 420px;
    }
    .ensureUserInfo {
      float: left;
      margin-left: 24px;
    }
    .cancel {
      float: left;
      margin-left: 24px;
    }
  }
</style>