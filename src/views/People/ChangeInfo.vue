<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="userInfoChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
       <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 20 },}">
         <a-tabs default-active-key="1" @change="handleChange" style="font-weight: bold;">
           <a-tab-pane key="1" tab="修改邮箱信息" :forceRender="true">
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
           </a-tab-pane>
           <a-tab-pane key="2" tab="修改其它信息" :forceRender="true">
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
           <a-tab-pane key="3" tab="修改用户密码" :forceRender="true">
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
import fetchAPI from "@/utils/fetchAPI";
import md5 from "md5";

export default {
  name: "ChangeInfo",
  mounted() {
    // 设置初始值

  },
  data() {
    return {
      form: this.$form.createForm(this),
      // 当前处于哪一个界面1,2,3
      pos: 1
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
      if(e == 2)
        this.form.setFieldsValue({
          'realName': this.userInfo.account_name,
          'phone': this.userInfo.telephone
        })
    },

    // 保存更改
    submitAll(e) {
      e.preventDefault()
      let validateFieldsKey = []
      let that = this
      if(this.pos == 1)
        validateFieldsKey = ['newEmail', 'checkNum']
      else if(this.pos == 2)
        validateFieldsKey = ['realName', 'phone']
      else if(this.pos == 3)
        validateFieldsKey = ['newPassword', 'nowPassword']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          if(that.pos == 1) {
            let obj = {
              accountName: that.userInfo.account_name,
              accountEmail: values.newEmail,
              validationCode: values.checkNum
            }
            fetchAPI('/account/resetEmail','post',obj).then(res => {
              if(res == '成功') {
                this.$notification.success({
                  message: '成功',
                  description: '修改邮箱成功'
                })
                that.$emit('close')
              }
              else
                that.$notification['error']({
                  message: '错误',
                  description: '修改邮箱出错',
                  duration: 4
                })
            })
          } else if(that.pos == 2) {
            let obj = {
              accountName: that.userInfo.account_name,
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
              } else
                 that.$notification['error']({
                    message: '错误',
                    description: '修改个人信息出错',
                    duration: 4
                  })
            })
          } else if(that.pos == 3) {
            let obj = {
              accountName: that.userInfo.account_name,
              oldPassword: md5(values.nowPassword),
              newPassword: md5(values.newPassword)
            }
            fetchAPI('/account/modifyPasswordWithOldPassword', 'post', obj).then(res => {
              if(res == '修改成功') {
                that.$notification.success({
                  message: '成功',
                  description: '修改密码成功',
                  duration: 4
                })
                that.$emit('close')
              } else {
                that.$notification['error']({
                  message: '错误',
                  description: '修改密码失败',
                  duration: 4
                })
              }
            })
          }
        } else
          that.$notification['error']({
            message: '错误',
            description: '输入格式不对',
            duration: 4
          })
      })
    },

    // 获取修改邮箱需要的验证码
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

    // 验证用户两次输入的密码是否一致(确认时检验)
    checkUserPassword(rules, values, callback) {
      if(values === this.form.getFieldValue('newPassword')) {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
      else {
        callback('两次输入密码不一致')
      }
    },

    // 验证用户两次输入的密码是否一致(再次修改密码时却)
    compareUserPassword(rules, values, callback) {
      if(values.length < 8)
        callback('密码格式不对')
      if(this.form.getFieldValue('rePassword') != undefined && this.form.getFieldValue('newPassword') != values)
        callback('两次密码输入不一致')
      else {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
    },
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