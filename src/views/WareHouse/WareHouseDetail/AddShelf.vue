<template>
  <div style="height: 100%; position: absolute; top: 0px; left: 0px; width: 100%; background-color: rgba(0,0,0,.8); z-index: 998;">
    <a-card class="shelfAdd" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;">
      <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 20 },}">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">添加货架</div>
        <a-form-item label="仓库编号">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入仓库编号(数字)">
            <a-input type="text"
                     size="large"
                     :disabled="true"
                     :placeholder="houseId"
                     v-decorator="['houseId',{rules: [{required: true, pattern: new RegExp('^[0-9]{1,11}$','i'), message: '仓库编号格式输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="货架编号">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入货架编号(英文或数字或两者组合)">
            <a-input type="text"
                     size="large"
                     placeholder="请输入货架编号(英文或数字或两者组合)"
                     v-decorator="['shelfId',{rules: [{required: true, pattern: new RegExp('^[0-9a-z]{1,11}$','i'), message: '货架编号格式输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="货架容量">
          <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入货架容量(数字)">
            <a-input type="text"
                     size="large"
                     placeholder="请输入货架容量(数字)"
                     v-decorator="['shelfContent',{rules: [{required: true, pattern: new RegExp('^[0-9]{1,11}$','i'), message: '货架容量格式输入有误'}], validateTrigger: 'change'}]">
            </a-input>
          </a-tooltip>
        </a-form-item>
        <div>
           <a-button type="primary" id="ensureAdd" htmlType="submit">保存编辑</a-button>
           <a-button type="danger" @click="$emit('close')" id="cancelAdd">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "AddShelf",
  mounted() {
    this.form.setFieldsValue({'houseId': this.houseId})
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  props: {
    houseId: {
      type: String,
      required: true
    }
  },
  methods: {
    // 添加货架
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['houseId', 'shelfId', 'shelfContent']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if (!err) {
          let obj = {
            shelfId: values.shelfId,
            shelfWarehouseId: values.houseId,
            shelfStorageNum: values.shelfContent
          }
          fetchAPI('/warehouse/addShelf','post',obj).then(res => {
            if(res === '货架已成功添加') {
              that.$notification.success({
                  message: '成功',
                  description: '添加成功',
                  duration: 4
              })
              that.$emit('close')
            } else {
              that.$notification['error']({
                  message: '错误',
                  description: '货架已存在',
                  duration: 4
              })
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .shelfAdd {
      width: 80%;
      left: 10%;
      height: 400px;
    }
    #ensureAdd {
      float: left;
    }
  }

  @media screen and (min-width: 1000px) {
    .shelfAdd {
      width: 40%;
      left: 30%;
      height: 320px;
    }
    #ensureAdd {
      float: left;
      margin-left: 24px;
    }
  }
</style>