<template>
  <div id="forget">
    <h1 style="width: 100%; margin-top: 44px; color: #F5F5DC; font-weight: bold; letter-spacing: 5px; text-shadow: 5px 5px 5px black;">物流仓储管理系统</h1>
    <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
      <a-card id="forgetCard" style="background-color: rgba(255,255,255,0.85); border-radius: 15px;">
        <a-form :form="form" @submit="submitAll">
          <a-form-item>
            <div style="font-size: 1.3rem; color: white; font-weight: bold;">忘记密码</div>
          </a-form-item>
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="请输入用户名"
                     v-decorator="['userName']">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25);"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="text"
                         size="large"
                         placeholder="请输入邮箱"
                         v-decorator="['email',{rules: [{required: true, pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入有误'}], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mail"/>
              <a-button slot="addonAfter" type="primary" style="float: right;" @click="getCheckNum">发送验证码</a-button>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback="">
            <a-input type="text"
                     size="large"
                     placeholder="请输入验证码"
                     v-decorator="['checkNum',{rules: [{required: true, pattern: new RegExp('^[0-9]{6,7}$','i'), message: '验证码格式输入有误'}], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="check" style="background: rgba(255,255,255,.25);"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback>
            <a-input-password
                size="large"
                placeholder="请输入8-16位密码必须是数字，英文，字符的组合"
                v-decorator="['password',{rules: [{min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$'), validator: comparePassword}], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
            </a-input-password>
          </a-form-item>
          <a-form-item has-feedback>
            <a-input-password
                size="large"
                placeholder="请确认密码"
                v-decorator="['rePassword',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: checkPassword}], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" size="large" htmlType="submit" style="width: 40%; float: left;" :disabled="resetBtn">重置密码</a-button>
            <a-button type="danger" size="large" htmlType="submit" style="width: 40%; float: right;" @click="$router.push({path: '/'})">取消</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
    <div id="copyright" style="position: absolute; bottom: 20px; display: flex; justify-content: center; height: 20px; width: 100%; color: grey;">
      {{copyRight}}
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "Forget",
  data() {
    return {
      form: this.$form.createForm(this),
      copyRight: 'Copyrigt  2021  山东大学(威海) 19计算机(中澳) 黄皓 朱胤璘 赵玉淋 樊华',
      resetBtn: false
    }
  },
  methods: {
    // 失败提示
    failureTip(title, content) {
      this.$notification['error']({
          message: title,
          description: content,
          duration: 4
      })
    },

    // 登录成功提示
    successTip(message, descript) {
      setTimeout(() => {
        this.$notification.success({
          message: message,
          description: descript
        })
      }, 1000)
    },

    // 重置密码
    submitAll(e) {
      e.preventDefault()
      let that = this
      that.resetBtn = true
      // 避免多次点击，禁用3秒重置密码按钮
      setTimeout(() => {
        that.resetBtn = false
      },3000)
      // 设置校验字段
      let validateFieldsKey = ['userName','email', 'checkNum', 'password', 'rePassword']
      // 校验
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          let obj = {
            accountName: values.userName,
            forgetValidation: values.checkNum,
            newPassword: md5(values.password)
          }
          fetchAPI('/account/modifyPasswordWithoutOldPassword','post', obj).then(res => {
            if(res == '修改成功')
              that.successTip('成功', '修改成功')
            else
              that.failureTip('失败', '用户名或验证码错误')
          })
        } else {
          that.failureTip('错误','输入不合法')
        }
      })
    },

    // 验证两次密码输入是否一致(确认时检验)
    checkPassword(rules, values, callback) {
      if(values.length < 8 || values.length > 16)
        callback('密码格式不对')
      if(values === this.form.getFieldValue('password')) {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
      else
        callback('两次输入密码不一致')
    },

    // 验证两次密码输入是否一致(再次修改密码时)
    comparePassword(rules, values, callback) {
      if(values.length < 8 || values.length > 16)
        callback('密码格式不对')
      else if(this.form.getFieldValue('rePassword') != undefined && this.form.getFieldValue('rePassword') != values)
        callback('两次密码输入不一致')
      else {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
    },

    // 获取验证码
    getCheckNum() {
      if(this.form.getFieldValue('email') == undefined) {
        this.failureTip('错误', '请输入合法邮箱')
      } else {
        let payload = {
          accountEmail: this.form.getFieldValue('email'),
          accountName: this.form.getFieldValue('userName')
        }
        console.log(payload)
        fetchAPI('/account/forgetPassword', 'post', payload).then(res => {
          if(res == '验证码发送成功')
            this.successTip('成功', '验证码已发送')
          else
            this.failureTip('错误', '邮箱已存在')
        })
      }
    },

  }
}
</script>

<style scoped>
  #forget{
    height: 100%;
    width: 100%;
    background-size: cover;
    background-image: url('../../../public/bck.jpg');
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /*用高斯模糊对图片处理--磨砂玻璃效果*/
  #forgetCard::before {
    background-image: url('../../../public/bck.jpg');
    background-size: cover;
    background-attachment: fixed;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(20px);
  }

  @media screen and ( max-width: 1000px ) {
    #forgetCard{
      width: 80%;
      margin-left: 10%;
    }
    #copyright{
      font-size: 0.8rem;
    }
  }
  @media screen and ( min-width: 1000px ) {
    #forgetCard{
      width: 40%;
      margin-left: 30%;
    }
    #copyright{
      font-size: 1.2rem;
    }
  }
</style>