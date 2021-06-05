<template>
  <div style="height: 100%;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              background-color: rgba(0,0,0,.8);
              z-index: 998;">
    <a-card class="autoAcceptChange" style="
        top: 44px;
        background-color: white;
        z-index: 999;
        position: absolute;
        border-radius: 15px;
        overflow-y: scroll;">
      <div>
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">点击选择已保存的收件人信息</div>
        <a-table style="margin-top: 16px;" :columns="accept" :dataSource="acceptData" bordered :pagination="false" :scroll="{x: 800}">
          <div slot="choose" slot-scope="text, record, index">
            <a-button type="primary" @click="$emit('autoAccept',record)"><a-icon type="check" />选择</a-button>
          </div>
        </a-table>
        <a-button type="danger" @click="$emit('close')" id="cancelAutoAccept">取消</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "AutoAcceptInfo",
  data() {
    return {
      accept: [
        {
          dataIndex: 'acceptName',
          title: '收件人姓名',
          key: 'acceptName',
          align: 'center'
        },
        {
          dataIndex: 'acceptPhone',
          title: '收件人联系方式',
          key: 'acceptPhone',
          align: 'center'
        },
        {
          dataIndex: 'acceptAddress',
          title: '收件地址',
          key: 'acceptAddress',
          align: 'center'
        },
        {
          dataIndex: 'acceptAddressDetail',
          title: '收件详细地址',
          key: 'acceptAddressDetail',
          align: 'center'
        },
        {
          title: '选择',
          align: 'center',
          scopedSlots: { customRender: 'choose' }
        }
      ],
      acceptData: [
        {
          key: 1,
          acceptName: '吴亦凡',
          acceptPhone: '110',
          acceptAddress: '东方明珠塔',
          acceptAddressDetail: '汤臣一品'
        },
        {
          key: 2,
          acceptName: '郭富城',
          acceptPhone: '17863025619',
          acceptAddress: ['山东省', '威海市', '环翠区'],
          acceptAddressDetail: '威海市环翠区山东大学(威海校区)'
        }
      ]
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1000px) {
    .autoAcceptChange {
      width: 80%;
      left: 10%;
      height: 350px;
    }
    #cancelAutoAccept {
      float: left;
      margin-top: 16px;
    }
  }

  @media screen and (min-width: 1000px) {
    .autoAcceptChange {
      width: 80%;
      left: 10%;
      height: 400px;
    }
    #cancelAutoAccept {
      float: left;
      margin-left: 24px;
      margin-top: 16px;
    }
  }
</style>