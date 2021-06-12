<template>
  <div id="test" :style="{height: '100%', overflowY: 'scroll', zIndex: idx}">
    <!-- 用于信息修改的模态窗口 -->
    <userInfo-Modal v-if="isUserInfo"
                    @close="isUserInfo = false; getData()"
                    :userName="userName"
                    :userEmail="userEmail"
                    :userPhone="userPhone"
                    :userRealName="realName"/>
    <userPassword-Modal v-if="isUserPassword"
                        @close="isUserPassword = false; getData()"
                        :userName="userName" />
    <userEmail-Modal v-if="isUserEmail"
                     @close="isUserEmail = false; getData()"
                     :email="userEmail"
                     :userName="userName" />
    <sendInfo-Modal v-if="isSendInfo"
                    @close="isSendInfo = false; isMain = true; getData();" :title="title" />
    <sendChange-Modal v-if="isSendChange"
                      @close="isSendChange = false; isMain = true; getData();"
                      :title="title"
                      :sendInfo="targetInfo"/>

    <a-card v-if="isMain">
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

    <a-card style="margin-top: 44px; overflow: hidden;" v-show="address" v-if="isMain">
      <div style="float: left; margin-bottom: 16px; font-size: 1.2rem;">收寄件信息</div>
      <a-table :columns="accept" :dataSource="acceptData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="edit" slot-scope="text, record, index">
          <a-button type="primary" @click="title = '收件人信息修改'; targetInfo = record; isSendChange = true; isMain = false;">
            <a-icon type="edit"/>
            编辑
          </a-button>
          <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="handleDelete(record)">
            <a-button type="danger">
              <a-icon type="minus"/>
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </a-table>
      <div style="overflow: hidden;">
        <a-button type="primary" style="float: left; margin-top: 16px;" @click="title = '收件人信息'; isSendInfo = true; isMain = false;"><a-icon type="plus"></a-icon>添加</a-button>
      </div>
      <a-table style="margin-top: 16px;" :columns="mail" :dataSource="mailData" bordered :pagination="false" :scroll="{x: 800}">
        <div slot="edit" slot-scope="text, record, index">
          <a-button type="primary" @click="title = '寄件人信息修改'; targetInfo = record; isSendChange = true; isMain = false;">
            <a-icon type="edit" />
            编辑
          </a-button>
          <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="handleDelete(record)">
            <a-button type="danger">
              <a-icon type="minus"/>
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </a-table>
      <div style="overflow: hidden;">
        <a-button type="primary" style="float: left; margin-top: 16px;"  @click="title = '寄件人信息'; isSendInfo = true; isMain = false;"><a-icon type="plus"></a-icon>添加</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import ChangeUserInfo from "@/views/User/ChangeUserInfo";
import ChangeUserPassword from "@/views/User/ChangeUserPassword";
import ChangeUserEmail from "@/views/User/ChangeUserEmail";
import AddSendInfo from "@/views/User/AddSendInfo";
import ChangeSendInfo from "@/views/User/ChangeSendInfo";
import fetchAPI from "@/utils/fetchAPI";
import AddressFormat from '@/utils/AddressFormat';

export default {
  name: "User",
  components: {
    'userInfo-Modal': ChangeUserInfo,
    'userPassword-Modal': ChangeUserPassword,
    'userEmail-Modal': ChangeUserEmail,
    'sendInfo-Modal': AddSendInfo,
    'sendChange-Modal': ChangeSendInfo
  },
  created() {
    this.getData()
  },
  data() {
    return {
      // 是否显示修改地址簿的模态窗口
      isSendChange: false,
      // 是否显示修改用户信息模态窗口
      isUserInfo: false,
      // 是否显示修改用户密码的模态窗口
      isUserPassword: false,
      // 是否显示修改邮箱的模态窗口
      isUserEmail: false,
      // 是否显示增加收件人，寄件人信息的窗口
      isSendInfo: false,
      // 进入填写寄件人收件人信息模态窗口时的标题
      sendTitle: '',
      // 当前窗口的层级
      idx: 1,
      // 是否显示主窗体
      isMain: true,
      // 当前点击的地址簿信息
      targetInfo: {},
      userName: this.$store.state.user.username,
      userPhone: '暂无数据',
      realName: '暂无数据',
      userType: '',
      userEmail: '',
      // 根据用户权限判断是否显示
      address: this.$store.state.user.role == 'user' ? true : this.$store.state.user.role == 'all' ? true : false,
      // 表头信息
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
      // 接收数据库信息
      acceptData: [],
      mailData: [],
      // 地址簿信息
      addressInfo: []
    }
  },
  methods: {
    // 加载信息
    getData() {
      // 向服务器请求信息更新用户相关信息
      let obj = {
        accountName: this.$store.state.user.username
      }
      let that = this
      new Promise((resolve, reject) => {
        fetchAPI('/account/ui/updateTotalAccountInfo', 'post', obj).then(res => {
          if(res == JSON.stringify({})) {
            that.$notification['error']({
              message: '错误',
              description: '请求用户信息失败',
              duration: 4
            })
          }
          else {
            res = JSON.parse(res)
            that.realName = res.trueName
            that.userPhone = res.telephone
            that.userType = res.accountType
            that.userEmail = res.accountEmail
            resolve()
          }
        })
      }).then(res => {
        // 请求常用地址簿信息
        fetchAPI('/orders/getFreqAddress','post', {accountName: that.$store.state.user.username}).then(res => {
          that.addressInfo =  JSON.parse(res)
          let tempAccept = []
          let tempMail = []
          for(var i = 0; i < that.addressInfo.length; i++) {
            if(that.addressInfo[i].freqType == '收件人信息') {
              let temp = {
                key: that.addressInfo[i].freqId,
                acceptName: that.addressInfo[i].freqName,
                acceptPhone: that.addressInfo[i].freqPhone,
                acceptAddressDetail: that.addressInfo[i].freqDetailAddress,
                acceptAddress: that.addressInfo[i].freqAddress
              }
              tempAccept.push(temp)
            }
            else {
              let temp = {
                key: that.addressInfo[i].freqId,
                mailName: that.addressInfo[i].freqName,
                mailPhone: that.addressInfo[i].freqPhone,
                mailAddressDetail: that.addressInfo[i].freqDetailAddress,
                mailAddress: that.addressInfo[i].freqAddress
              }
              tempMail.push(temp)
            }
          }
          that.acceptData = tempAccept
          that.mailData = tempMail
        })
      })

    },

    // 删除地址簿信息
    handleDelete(record) {
      let obj = { freqId: record.key }
      let that = this
      fetchAPI('/orders/deleteFreqAddress','post',obj).then(res => {
        if(res == '成功') {
          that.$notification.success({
              message: '成功',
              description: '删除成功',
              duration: 4
          })
          that.getData()
        } else
          that.$notification['error']({
              message: '错误',
              description: '删除失败',
              duration: 4
          })
      })
    },
  }
}
</script>

<style scoped>

</style>