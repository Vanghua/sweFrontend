<template>
  <div id="test" style="height: 100%; overflow-y: scroll;">
    <!-- 用于信息修改的模态窗口 -->
    <userInfo-Modal v-if="isUserInfo"
                    @close="isUserInfo = false; getData()"
                    :userName="userName"
                    :userEmail="userEmail"
                    :userPhone="userPhone"
                    :userRealName="realName">
    </userInfo-Modal>
    <userPassword-Modal v-if="isUserPassword"
                        @close="isUserPassword = false; getData()"
                        :userName="userName">
    </userPassword-Modal>
    <userEmail-Modal v-if="isUserEmail"
                     @close="isUserEmail = false; getData()"
                     :email="userEmail"
                     :userName="userName">
    </userEmail-Modal>

    <a-card>
      <div style="float: left; margin-bottom: 16px; font-size: 1.2rem;">用户基本信息</div>
      <a-descriptions bordered :column="{xs: 1, xxl: 2, xl: 2, lg: 2, md: 2, sm: 1}">
        <a-descriptions-item label="用户类型" :span="2">{{userType}}</a-descriptions-item>
        <a-descriptions-item label="用户名" :span="2">{{userName}}</a-descriptions-item>
        <a-descriptions-item label="绑定邮箱" :span="2">{{userEmail}}</a-descriptions-item>
        <a-descriptions-item label="真实姓名" :span="2">{{realName}}</a-descriptions-item>
        <a-descriptions-item label="联系方式" :span="2">{{userPhone}}</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" style="float: left; margin-top: 16px;" @click="isUserInfo = !isUserInfo"><a-icon type="edit"></a-icon>修改信息</a-button>
      <a-button type="primary" style="float: left; margin-top: 16px; margin-left: 16px;" @click="isUserPassword = !isUserPassword"><a-icon type="edit"></a-icon>修改密码</a-button>
      <a-button type="primary" style="float: left; margin-top: 16px; margin-left: 16px;" @click="isUserEmail = !isUserEmail"><a-icon type="edit"></a-icon>修改邮箱</a-button>
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
import ChangeUserInfo from "@/views/User/ChangeUserInfo";
import ChangeUserPassword from "@/views/User/ChangeUserPassword";
import ChangeUserEmail from "@/views/User/ChangeUserEmail";
import fetchAPI from "@/utils/fetchAPI";

export default {
  name: "User",
  components: {
    'userInfo-Modal': ChangeUserInfo,
    'userPassword-Modal': ChangeUserPassword,
    'userEmail-Modal': ChangeUserEmail
  },
  created() {
    this.getData()
  },
  data() {
    return {
      // 是否显示修改用户信息模态窗口
      isUserInfo: false,
      // 是否显示修改用户密码的模态窗口
      isUserPassword: false,
      // 是否显示修改邮箱的模态窗口
      isUserEmail: false,
      userName: this.$store.state.user.username,
      userPhone: '暂无数据',
      realName: '暂无数据',
      userType: '',
      userEmail: '',
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
          dataIndex: 'acceptAddressDetail',
          title: '收件详细地址',
          key: 'acceptAddressDetail',
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
          dataIndex: 'mailAddressDetail',
          title: '寄件详细地址',
          key: 'mailAddressDetail',
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
      let obj = {
        accountName: this.$store.state.user.username
      }
      let that = this
      fetchAPI('/account/ui/updateTotalAccountInfo', 'post', obj).then(res => {
        if(res == JSON.stringify({}))
          that.$notification['error']({
            message: '错误',
            description: '请求用户信息失败',
            duration: 4
          })
        else {
          res = JSON.parse(res)
          that.realName = res.trueName
          that.userPhone = res.telephone
          that.userType = res.accountType
          that.userEmail = res.accountEmail
        }
      })
      // 测试
      this.acceptData = [
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
          acceptPhone: '111',
          acceptAddress: '威高广场',
          acceptAddressDetail: '环海路1号'
        }
      ]
      this.mailData = [
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
          mailPhone: '121',
          mailAddress: '山东大学',
          mailAddressDetail: '学6宿舍'
        },
        {
          key: 3,
          mailName: '陈贯西',
          mailPhone: '122',
          mailAddress: '香港特区',
          mailAddressDetail: '中寰'
        }
      ]
    },

  }
}
</script>

<style scoped>

</style>