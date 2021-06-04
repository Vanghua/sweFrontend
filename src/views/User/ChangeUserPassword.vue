<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="userPasswordChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
      <a-form :form="form" :label-col="{xs: { span: 24 }, sm: { span: 5 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 12 },}">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">修改用户密码</div>
        <a-form-item label="当前密码">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入8-16位的密码必须是数字,字母,字符的组合">
            <a-input-password
                  size="large"
                  placeholder="请输入8-16位的密码必须是数字,字母,字符的组合"
                  v-decorator="['nowPassword',{rules: [{ min: 8, max: 16, required: true, pattern: new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{8,16}$','i')}], validateTrigger: 'change'}]">
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
        <div>
           <a-button type="primary" id="ensureUserPassword" htmlType="submit">保存编辑</a-button>
           <a-button type="danger" @click="$emit('close')" id="cancelUserPassword">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "ChangeUserPassword",
  data() {
    return {
       form: this.$form.createForm(this)
    }
  },
  methods: {
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
    .userPasswordChange {
      width: 80%;
      left: 10%;
      height: 400px;
    }
    #ensureUserPassword {
      float: left;
    }
    #cancelUserPassword {
      float: right;
    }
  }

  @media screen and (min-width: 1000px) {
    .userPasswordChange {
      width: 40%;
      left: 30%;
      height: 350px;
    }
    #ensureUserPassword {
      float: left;
      margin-left: 24px;
    }
    #cancelUserPassword {
      float: left;
      margin-left: 24px;
    }
  }
</style>