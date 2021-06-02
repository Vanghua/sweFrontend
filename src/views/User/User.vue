<template>
  <div style="height: 100%;">
    <a-card>
      <div style="float: left; margin-bottom: 16px; font-size: 1.2rem;">用户基本信息</div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}">
        <a-descriptions-item label="用户名" :span="2">{{userName}}</a-descriptions-item>
        <a-descriptions-item label="联系方式">{{userPhone}}</a-descriptions-item>
        <a-descriptions-item label="真实姓名">{{realName}}</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" style="float: left; margin-top: 16px;"><a-icon type="edit"></a-icon>修改信息</a-button>
    </a-card>
    <a-card style="margin-top: 44px; overflow: hidden;" v-show="address">
      <div style="float: left; margin-bottom: 16px; font-size: 1.2rem;">收寄件信息</div>
      <a-table :columns="accept" :dataSource="acceptData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="edit">
          <a-button type="primary"><a-icon type="edit"></a-icon>编辑</a-button>
          <a-button type="danger"><a-icon type="minus"></a-icon>删除</a-button>
        </div>
      </a-table>
      <div style="overflow: hidden;">
        <a-button type="primary" style="float: left; margin-top: 16px;"><a-icon type="plus"></a-icon>添加</a-button>
      </div>
      <a-table style="margin-top: 16px;" :columns="mail" :dataSource="mailData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="edit">
          <a-button type="primary"><a-icon type="edit"></a-icon>编辑</a-button>
          <a-button type="danger"><a-icon type="minus"></a-icon>删除</a-button>
        </div>
      </a-table>
      <div style="overflow: hidden;">
        <a-button type="primary" style="float: left; margin-top: 16px;"><a-icon type="plus"></a-icon>添加</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "User",
  created() {
    this.getData()
  },
  data() {
    return {
      userName: this.$store.state.user.username,
      userPhone: '17863025619',
      realName: '樊华',
      address: true,
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
          title: '编辑',
          align: 'center',
          scopedSlots: { customRender: 'edit' }
        }
      ],
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
          title: '编辑',
          align: 'center',
          scopedSlots: { customRender: 'edit' }
        }
      ],
      acceptData: [],
      mailData: []
    }
  },
  methods: {
    getData() {
      // 向服务器请求信息更新用户相关信息

      // 测试
      this.acceptData = [
        {
          key: 1,
          acceptName: '吴亦凡',
          acceptPhone: '110',
          acceptAddress: '东方明珠塔'
        },
        {
          key: 2,
          acceptName: '郭富城',
          acceptPhone: '111',
          acceptAddress: '威高广场'
        }
      ]
      this.mailData = [
        {
          key: 1,
          mailName: '樊华',
          mailPhone: '120',
          mailAddress: '威海市文化西路180号'
        },
        {
          key: 2,
          mailName: '吴彦祖',
          mailPhone: '121',
          mailAddress: '山东大学'
        },
        {
          key: 3,
          mailName: '陈贯西',
          mailPhone: '122',
          mailAddress: '香港特区'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>