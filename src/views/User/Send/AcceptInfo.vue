<template>
  <div style="overflow-y: scroll; height: 100%;">
    <!-- 自动填写的模态窗口 -->
    <auto-Modal v-if="isAuto"
                @close="isAuto = false"
                @autoAccept="autoAccept">
    </auto-Modal>
    <a-form :form="form" @submit="submitAll" :label-col="{xs: { span: 24 }, sm: { span: 4 }}" :wrapper-col="{ xs: { span: 24 }, sm: { span: 16 },}">
      <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">收件人信息填写</div>
      <a-form-item label="收件人姓名">
        <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入2-10位汉字组成的真实姓名">
          <a-input type="text"
                   size="large"
                   placeholder="请填写收件人姓名"
                   v-decorator="['name',{rules: [{required: true,pattern: new RegExp('^[\u4e00-\u9fa5]{2,10}$','i'), message: '姓名输入格式有误'}], validateTrigger: 'change'}]">
          </a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="收件人联系方式">
        <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入中国大陆11位手机号">
          <a-input type="text"
                  size="large"
                  placeholder="请填写收件人联系方式"
                  v-decorator="['phone',{rules: [{required: true, pattern: new RegExp('^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$','i'), message: '手机号输入格式有误'}], validateTrigger: 'change'}]">
          </a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="收件人地址">
        <a-cascader :options="options"
                    v-decorator="['address',{rules: [{required: true, message: '请输入地址'}]}]">
        </a-cascader>
      </a-form-item>
      <a-form-item label="收件人详细地址">
        <a-tooltip :trigger="['focus']" placement="topLeft" title="提示：请输入大于5位少于30位详细地址描述">
          <a-input type="text"
                  size="large"
                  :disabled="true"
                  :placeholder="'请通过百度地图选择位置'"
                  v-decorator="['addressDetail',{rules: [{required: true, pattern: new RegExp('^.{5,30}$','i'), message: '详细地址输入格式有误'}], validateTrigger: 'change'}]">
          </a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="选择地址">
        <a-card>
          <div id="r-result" style="margin-bottom: 44px;"><input type="text" id="suggestId" size="20" style="width: 70%; float: left; border:1px solid #d9d9d9;" /></div>
          <div id="searchResultPanel" style="border:1px solid #d9d9d9;width:150px;height:auto; display:none;"></div>
          <div id="acceptInfoMap" style="height: 300px; border: 1px solid #d9d9d9; border-radius: 15px; width: 100%;"></div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit" style="margin-right: 24px;">确认</a-button>
        <a-button type="primary" @click="isAuto = true" style="margin-right: 24px;">自动填写</a-button>
        <a-button type="danger" @click="$router.push({name: 'Send', params: { acceptInfo: acceptInfo, mailInfo: mailInfo }})">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// 引入全国三级联动省市区县数据
import city from '@/utils/pca-code'
// 引入规范函数
import normalize from "@/utils/normalize";
// 引入自动填写模态窗口
import AutoAcceptInfo from "@/views/User/Send/AutoAcceptInfo";

export default {
  name: "AcceptInfo",
  components: {
    'auto-Modal': AutoAcceptInfo
  },
  mounted() {
    // 数据规范化
    for(var i = 0; i < city.length; i++)
      this.options.push(normalize.normalize(city[i]))
    // 初始化地图
    this.initMap()
    // 给表单三级级联选择城市项目赋初值
    this.form.setFieldsValue({'address': ['山东省', '威海市', '环翠区']})
    // 赋初始值
    if(JSON.stringify(this.$route.params) != JSON.stringify({})) {
      this.form.setFieldsValue({
        'name': this.$route.params.acceptInfo.name,
        'phone': this.$route.params.acceptInfo.phone,
        'address': this.$route.params.acceptInfo.address,
        'addressDetail': this.$route.params.acceptInfo.addressDetail,
      })
      this.acceptInfo = this.$route.params.acceptInfo
      this.mailInfo = this.$route.params.mailInfo
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      options: [],
      map: {},
      // 填写的信息
      acceptInfo: {},
      mailInfo: {},
      // 控制自动填写模态窗口是否显示
      isAuto: false
    }
  },
  methods: {
    // 处理自动填写的结果
    autoAccept(record) {
      this.isAuto = false
      this.form.setFieldsValue({
        'name': record.acceptName,
        'phone': record.acceptPhone,
        'address': record.acceptAddress,
        'addressDetail': record.acceptAddressDetail,
      })
    },

    // 提交收件人信息
    submitAll(e) {
      e.preventDefault()
      let that = this
      let validateFieldsKey = ['name', 'phone', 'address', 'addressDetail']
      this.form.validateFields(validateFieldsKey, (err, values) => {
        if(!err) {
          if(values.address == '') {
             that.$notification['error']({
                message: '错误',
                description: '输入信息不合法',
                duration: 4
             })
          } else {
            that.$notification.success({
              message: '成功',
              description: '保存成功',
              duration: 4
            })
            that.$router.push({
              name: 'Send',
              params: {
                acceptInfo: {
                  name: values.name,
                  phone: values.phone,
                  address: values.address,
                  addressDetail: values.addressDetail
                },
                mailInfo: that.mailInfo
              }
            })
          }
        } else {
          that.$notification['error']({
              message: '错误',
              description: '输入信息不合法',
              duration: 4
          })
        }
      })
    },

    // 初始化地图
    initMap() {
      // 实例化地图
      this.map = new BMap.Map("acceptInfoMap");
      // 地图中心点
      this.map.centerAndZoom("威海", 15);
      // 开启滚轮缩放
      this.map.enableScrollWheelZoom(true)
      // 添加定位按钮
      this.map.addControl(new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMap.Size(20, 20)
      }))

      let that = this

      // 实现智能搜索
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
        ,"location" : this.map
      });

      ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();
        that.form.setFieldsValue({'addressDetail': myValue})
      });

      function setPlace(){
        that.map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          that.map.centerAndZoom(pp, 18);
          that.map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(that.map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }

      function G(id) {
        return document.getElementById(id);
      }

    },
  }
}
</script>

<style scoped>

</style>