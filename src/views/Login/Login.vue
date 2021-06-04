<template>
  <div id="login">
    <h1 id="title" :style="{width: '100%', marginTop: titleTop, color: '#F5F5DC', fontWeight: 'bold', letterSpacing: '5px', textShadow: '5px 5px 5px black'}">物流仓储管理系统</h1>
    <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
      <a-card id="loginCard" style="background-color: rgba(255,255,255,0.85); border-radius: 15px;">
        <a-form :form="form" @submit="submitAll">
          <a-tabs default-active-key="1" @change="tabChange" style="color: white; font-weight: bold;">
            <a-tab-pane key="1" tab="登录">
              <a-form-item>
                <a-input size="large"
                         type="text"
                         placeholder="请输入用户名"
                         v-decorator="['username']">
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25);"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input-password size="large"
                                  placeholder="请输入密码"
                                  v-decorator="['password']">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-checkbox style="float: left; color: white;" :default-checked="true" @change="checkBoxChange">记住密码</a-checkbox>
                <div style="float: right; color: white; cursor: pointer;" @click="$router.push({name: 'Forget'})">忘记密码</div>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" size="large" style="width: 80%;" htmlType="submit" :disabled="State.loginBtn">登录</a-button>
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="2" tab="注册">
              <a-form-item has-feedback>
                <a-input type="text"
                         size="large"
                         placeholder="请输入2-16位汉字或字母或数字组成的用户名"
                         v-decorator="['registername',{rules: [{ min: 2, max: 16, required: true, pattern: new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$','i'), message: '用户名输入不合法'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="user" style="background: rgba(255,255,255,.25);"></a-icon>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input-password
                    size="large"
                    placeholder="请输入8-16位的密码必须是数字,字母,字符的组合"
                    v-decorator="['userpassword',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: compareUserPassword}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input-password>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input-password
                    size="large"
                    placeholder="请确认密码"
                    v-decorator="['userpasswordcheck',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: checkUserPassword}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-input type="text"
                         size="large"
                         placeholder="请输入邮箱"
                         v-decorator="['usermail',{rules: [{required: true, pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入有误'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="mail" style="background: rgba(255,255,255,.25);"></a-icon>
                  <a-button slot="addonAfter" type="primary" style="float: right;" @click="getCheckNum">发送验证码</a-button>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback="">
                <a-input type="text"
                         size="large"
                         placeholder="请输入验证码"
                         v-decorator="['usercheck',{rules: [{required: true, pattern: new RegExp('^[0-9]{6,7}$','i'), message: '验证码格式输入有误'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="check" style="background: rgba(255,255,255,.25);"></a-icon>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" size="large" htmlType="submit" style="width: 80%;" :disabled="State.userRegisterBtn">注册</a-button>
              </a-form-item>
            </a-tab-pane>

            <a-tab-pane key="3" tab="管理人员注册">
              <a-form-item>
                <a-select default-value="运输员" style="width: 100%;" @change="selectChange">
                  <a-select-option value="trans">
                    运输员
                  </a-select-option>
                  <a-select-option value="order">
                    订单管理员
                  </a-select-option>
                  <a-select-option value="people">
                    人事管理员
                  </a-select-option>
                  <a-select-option value="value">
                    财务管理员
                  </a-select-option>
                  <a-select-option value="all">
                    全局管理员
                  </a-select-option>
                  <a-select-option value="warehouse">
                    仓库管理员
                  </a-select-option>
                  <a-select-option value="assign">
                    调度管理员
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input type="text"
                         size="large"
                         placeholder="请输入公司提供的身份认证码"
                         v-decorator="['checknum',{rules: [{ min: 2, max: 10, required: true, pattern: new RegExp('^[a-z]{2,10}$','i'), message: '认证码输入错误'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="team" style="color: rgba(0,0,0,.25);"/>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input type="text"
                         size="large"
                         placeholder="请输入2-16位汉字或字母或数字组成的用户名"
                         v-decorator="['workername',{rules: [{ min: 2, max: 16, required: true, pattern: new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$','i'), message: '用户名输入不合法'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input-password
                    size="large"
                    placeholder="请输入8-16位密码必须是数字，英文，字符的组合"
                    v-decorator="['workerpassword',{rules: [{min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$'), validator: compareWorkerPassword}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input-password>
              </a-form-item>
              <a-form-item has-feedback>
                <a-input-password
                    size="large"
                    placeholder="请确认密码"
                    v-decorator="['workerpasswordcheck',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i'), validator: checkWorkerPassword}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);"></a-icon>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-input type="text"
                         size="large"
                         placeholder="请输入邮箱"
                         v-decorator="['workermail',{rules: [{required: true, pattern: new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$','i'), message: '邮箱输入有误'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="mail" style="background: rgba(255,255,255,.25);"></a-icon>
                  <a-button slot="addonAfter" type="primary" style="float: right;" @click="getCheckNum">发送验证码</a-button>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback="">
                <a-input type="text"
                         size="large"
                         placeholder="请输入验证码"
                         v-decorator="['workercheck',{rules: [{required: true, pattern: new RegExp('^[0-9]{6,7}$','i'), message: '验证码格式输入有误'}], validateTrigger: 'change'}]">
                  <a-icon slot="prefix" type="check" style="background: rgba(255,255,255,.25);"></a-icon>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" size="large" htmlType="submit" style="width: 80%;" :disabled="State.workerRegisterBtn">注册</a-button>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
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
  name: "Login",
  data() {
    return {
      titleTop: '44px',
      // 挂载表单
      form: this.$form.createForm(this),
      // 登录按钮状态(如果状态变量不再对象里在使用es6解构后进行更改会失效，没仔细考虑这个问题)
      State: {
        loginBtn: false,
        userRegisterBtn: false,
        workerRegisterBtn: false
      },
      // 当前在tab的哪个位置
      tabPos: 1,
      // 用户是否选择记住密码
      isStored: true,
      // 员工注册时选择的员工类型
      workerType: 'trans',
      // 版权信息
      copyRight: 'Copyrigt  2021  山东大学(威海) 19计算机(中澳) 黄皓 朱胤璘 赵玉淋 樊华'
    }
  },
  methods: {
    // 切换登录和注册触发事件
    tabChange(key) {
      this.tabPos = key
      this.copyRight = this.tabPos == 3 ? '' : 'Copyrigt  2021  山东大学(威海) 19计算机(中澳) 黄皓 朱胤璘 赵玉淋 樊华'
      if(key == 3)
        this.titleTop = '16px'
    },

    // 网络请求问题
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

    // 记住密码的改变
    checkBoxChange() {
      this.isStored = this.isStored == true ? false: true
    },

    // 登录注册校验以及提交
    submitAll(e) {
      // 阻止原生提交事件发生，在此重写提交事件
      e.preventDefault()
      // 表单校验时使用闭包，无法应用this，在此将this解构
      let {
        form: { validateFields },
        State,
        failureTip,
        successTip,
        tabPos,
        isStored
      } = this

      // 校验字段
      var validateFieldsKey
      // 禁用按钮避免提交多次网络请求
      if(tabPos == 1) {
        validateFieldsKey = ['username', 'password']
        // 禁用登录按钮
        State.loginBtn = true
        // 3秒后恢复，避免多次发送请求
        setTimeout(() => {
          State.loginBtn = false
        },3000)
      }
      else if(tabPos == 2) {
        validateFieldsKey = ['registername', 'userpassword', 'userpasswordcheck', 'usermail', 'usercheck']
        State.userRegisterBtn = true
        setTimeout(() => {
          State.userRegisterBtn = false
        },3000)
      }
      else if(tabPos == 3) {
        validateFieldsKey = ['checknum', 'workername', 'workerpassword', 'workerpasswordcheck', 'workermail', 'workercheck']
        State.workerRegisterBtn = true
        setTimeout(() => {
          State.workerRegisterBtn = false
        },3000)
      }
      // 处理闭包中的this问题
      var that = this
      validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          if(tabPos == 1) {
            // 加密密码
            // values.password = md5(values.password) 可以用values访问也可以用form.getFieldValue访问
            var userInfo = {userName: this.form.getFieldValue('username'), password: md5(this.form.getFieldValue('password')), isStored}
            // 登录信息存储至Vuex
            that.$store.dispatch('Login', userInfo).then(role => {
              // 根据登录信息获取用户权限并且更新Vuex中用户可以访问的界面
              that.$store.dispatch('CheckRole',role)
              // router.options.routes里面都是静态路由
              that.$router.addRoutes(that.$store.state.permission.addRoutes)
              that.$router.push({path: '/Page'})
              successTip('欢迎', '欢迎回来')
            }, err => {
              // 此时登录失败
              that.failureTip('错误','用户名密码错误')
            })
          }
          else if(tabPos == 2) {
            // 加密密码
            values.userpassword = md5(values.userpassword)
            let obj = {
              // 用户名
              accountName: values.registername,
              // 密码
              accountPassword: values.userpassword,
              // 邮箱
              accountEmail: values.usermail,
              // 验证码
              validationCode: values.usercheck,
              // 身份校验码(只有员工注册采用，用户注册校验码为空)
              authorityCode: '',
              // 注册的用户类型(user表示普通用户)
              accountType: 'user'
            }
            fetchAPI('/account/register','post', obj).then(res => {
              if(res == '用户名已被使用')
                failureTip('错误','用户名已被使用')
              else if(res == '邮箱已被使用')
                failureTip('错误','邮箱已被使用')
              else if(res == '验证码无效')
                failureTip('错误','验证码无效')
              else
                successTip('成功', '注册成功')
            })
          }
          else if(tabPos == 3) {
            // 加密密码
            values.workerpassword = md5(values.workerpassword)
            let obj = {
              // 用户名
              accountName: values.workername,
              // 密码
              accountPassword: values.workerpassword,
              // 邮箱
              accountEmail: values.workermail,
              // 验证码
              validationCode: values.workercheck,
              // 身份校验码(只有员工注册采用，用户注册校验码为空)
              authorityCode: values.checknum,
              // 注册的用户类型(user表示普通用户)
              accountType: that.workerType
            }
            fetchAPI('/account/register','post', obj).then(res => {
              if(res == '用户名已被使用')
                failureTip('错误','用户名已被使用')
              else if(res == '邮箱已被使用')
                failureTip('错误','邮箱已被使用')
              else if(res == '验证码无效')
                failureTip('错误','验证码无效')
              else if(res == '授权码无效')
                failureTip('错误','授权码无效')
              else
                successTip('成功', '注册成功')
            })
          }
        }
        else {
          State.loginBtn = false
          State.userRegisterBtn = false
          State.workerRegisterBtn = false
          failureTip('错误','用户名密码错误')
        }
      })
    },

    // 验证工作人员两次密码输入是否一致(确认时检验)
    checkWorkerPassword(rules, values, callback) {
      if(values.length < 8 || values.length > 16)
        callback('密码格式不对')
      if(values === this.form.getFieldValue('workerpassword')) {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
      else
        callback('两次输入密码不一致')
    },

    // 验证工作人员两次密码输入是否一致(再次修改密码时)
    compareWorkerPassword(rules, values, callback) {
      if(values.length < 8 || values.length > 16)
        callback('密码格式不对')
      else if(this.form.getFieldValue('workerpasswordcheck') != undefined && this.form.getFieldValue('workerpasswordcheck') != values)
        callback('两次密码输入不一致')
      else {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
    },

    // 验证用户两次输入的密码是否一致(确认时检验)
    checkUserPassword(rules, values, callback) {
      if(values === this.form.getFieldValue('userpassword')) {
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
      if(this.form.getFieldValue('userpasswordcheck') != undefined && this.form.getFieldValue('userpasswordcheck') != values)
        callback('两次密码输入不一致')
      else {
        let p = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')
        if(p.test(values))
          callback()
        else
          callback('格式不对')
      }
    },

    // 发送验证码
    getCheckNum() {
      if ((this.form.getFieldValue('usermail') == undefined && this.tabPos == 2) || (this.form.getFieldValue('workermail') == undefined && this.tabPos == 3)) {
        this.failureTip('错误', '请输入合法邮箱')
      } else {
        let payload = {email: this.tabPos == 2 ? this.form.getFieldValue('usermail') : this.form.getFieldValue('workermail') }
        fetchAPI('/account/getValidation', 'post', payload).then(res => {
          if(res == '发送成功')
            this.successTip('成功', '验证码已发送')
          else
            this.failureTip('错误', '邮箱已存在')
        })
      }
    },

    // 注册时选择员工类型
    selectChange(value) {
      this.workerType = value
    }
  }
}
</script>

<style scoped>
  #login{
    height: 100%;
    width: 100%;
    background-size: cover;
    background-image: url('../../../public/bck.jpg');
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /*用高斯模糊对图片处理--磨砂玻璃效果*/
  #loginCard::before {
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
    #loginCard{
      width: 80%;
      margin-left: 10%;
    }
    #copyright{
      font-size: 0.8rem;
    }
  }
  @media screen and ( min-width: 1000px ) {
    #loginCard{
      width: 40%;
      margin-left: 30%;
    }
    #copyright{
      font-size: 1.2rem;
    }
  }
</style>