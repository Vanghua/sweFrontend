<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="shelfEdit" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
      <a-form :form="form" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 20 },}">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">修改货架信息</div>
        <a-form-item label="当前编号">
          <a-input type="text"
                   size="large"
                   :disabled="true"
                   :placeholder="shelfObj.shelfId"
                   v-decorator="['nowShelfNum']">
          </a-input>
        </a-form-item>
        <a-form-item label="货架编号">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入字母或者数字或者两者组合的货架编号">
            <a-input type="text"
                     size="large"
                     placeholder="请输入新的货架编号"
                     v-decorator="['shelfNum',{rules: [{required: true, pattern: new RegExp('^[0-9a-z]{1,11}$','i'), message: '货架编号格式输入有误'}], validateTrigger: 'change'}]">
              <a-button slot="addonAfter" type="primary" style="float: right;" @click="">保存编辑</a-button>
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="当前容量">
          <a-input type="text"
                   size="large"
                   :disabled="true"
                   :placeholder="shelfObj.shelfContent"
                   v-decorator="['nowShelfContent']">
          </a-input>
        </a-form-item>
        <a-form-item label="货架容量">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入数字">
            <a-input type="text"
                     size="large"
                     placeholder="请输入新的货架容量"
                     v-decorator="['shelfContent',{rules: [{required: true, pattern: new RegExp('^[0-9]{1,11}$','i'), message: '货架容量格式输入有误'}], validateTrigger: 'change'}]">
              <a-button slot="addonAfter" type="primary" style="float: right;" @click="">保存编辑</a-button>
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-button type="danger" @click="$emit('close')" id="cancelEdit">取消</a-button>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "EditShelf",
  props: {
    shelfObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .shelfEdit {
      width: 80%;
      left: 10%;
      height: 500px;
    }
    #cancelEdit {
      float: left;
    }
  }

  @media screen and (min-width: 1000px) {
    .shelfEdit {
      width: 40%;
      left: 30%;
      height: 400px;
    }
    #cancelEdit {
      float: left;
      margin-left: 24px;
    }
  }
</style>