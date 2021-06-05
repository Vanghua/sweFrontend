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
        <a-table style="margin-top: 16px;" :columns="mail" :dataSource="mailData" bordered :pagination="false" :scroll="{x: 800}">
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
export default {
  name: "AutoMailInfo",
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
      mailData: [
        {
          key: 1,
          mailName: '樊华',
          mailPhone: '120',
          mailAddress: '威海市文化西路180号',
          mailAddressDetail: '山东大学威海'
        },
        {
          key: 2,
          mailName: '吴彦祖',
          mailPhone: '13838392153',
          mailAddress: ['河南省','郑州市','金水区'],
          mailAddressDetail: '郑州市金水区河南省化学研究所家属院'
        },
        {
          key: 3,
          mailName: '陈贯西',
          mailPhone: '122',
          mailAddress: '香港特区',
          mailAddressDetail: '中寰'
        }
      ]
    }
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