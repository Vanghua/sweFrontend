<template>
  <div style="height: 100%;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              background-color: rgba(0,0,0,.8);
              z-index: 998;">
    <a-card class="autoMailChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;
        overflow-y: scroll;">
      <div>
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">点击选择已保存的寄件人信息</div>
        <a-table style="margin-top: 16px;" :columns="mail" :dataSource="addressInfo" bordered :pagination="false" :scroll="{x: 800}">
          <div slot="choose" slot-scope="text, record, index">
            <a-button type="primary" @click="$emit('autoMail',record)"><a-icon type="check" />选择</a-button>
          </div>
        </a-table>
        <a-button type="danger" @click="$emit('close')" id="cancelAutoMail">取消</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "AutoMailInfo",
  mounted() {
    this.getData()
  },
  data() {
    return {
      mail: [
        {
          dataIndex: 'mailName',
          title: '寄件人姓名',
          key: 'mailName',
          align: 'center'
        },
        {
          dataIndex: 'mailPhone',
          title: '寄件人联系方式',
          key: 'mailPhone',
          align: 'center'
        },
        {
          dataIndex: 'mailAddress',
          title: '寄件地址',
          key: 'mailAddress',
          align: 'center'
        },
        {
          dataIndex: 'mailAddressDetail',
          title: '寄件详细地址',
          key: 'mailAddressDetail',
          align: 'center'
        },
        {
          title: '选择',
          align: 'center',
          scopedSlots: { customRender: 'choose' }
        }
      ],
      addressInfo: [],
    }
  },
  methods: {
    // 加载数据
    getData() {
      let that = this
      // 请求地址簿信息
      fetchAPI('/orders/getFreqAddress','post', {accountName: that.$store.state.user.username}).then(res => {
         that.addressInfo =  JSON.parse(res)
         let tempMail = []
         for(var i = 0; i < that.addressInfo.length; i++)
              if(that.addressInfo[i].freqType == '寄件人信息') {
                let temp = {
                  key: that.addressInfo[i].freqId,
                  mailName: that.addressInfo[i].freqName,
                  mailPhone: that.addressInfo[i].freqPhone,
                  mailAddressDetail: that.addressInfo[i].freqDetailAddress,
                  mailAddress: that.addressInfo[i].freqAddress
                }
                tempMail.push(temp)
              }
         // 收件人自动填写只用保留收件人信息即可
         that.addressInfo = tempMail
      })
    },
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .autoMailChange {
      width: 80%;
      left: 10%;
      height: 350px;
    }
    #cancelAutoMail {
      float: left;
      margin-top: 16px;
    }
  }

  @media screen and (min-width: 1000px) {
    .autoMailChange {
      width: 80%;
      left: 10%;
      height: 400px;
    }
    #cancelAutoMail {
      float: left;
      margin-left: 24px;
      margin-top: 16px;
    }
  }
</style>