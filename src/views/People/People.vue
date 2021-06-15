<template>
  <div style="height: 100%; overflow-y: scroll;">
    <change-Modal v-if="isShowChange"
                  @close="isShowChange = false; getData();"
                  :userInfo="personInfo"/>

    <a-card style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px;">
      <div style="overflow: hidden;">
        <div style="font-size: 1.3rem; font-width: bold; margin-bottom: 16px; float: left;">人事管理</div>
        <a-input-search addon-before="搜索用户"
                    enter-button="Search"
                    placeholder="请输入用户名"
                    @search="nameSearch"/>
         <a-select default-value="user" style="margin: 16px 0px; width: 100%;" @change="typeSearch" v-model="userType">
          <a-select-option value="user">普通用户</a-select-option>
          <a-select-option value="order">订单管理员</a-select-option>
          <a-select-option value="assign">调度管理员</a-select-option>
          <a-select-option value="trans">运输员</a-select-option>
          <a-select-option value="people">人事管理员</a-select-option>
          <a-select-option value="warehouse">仓库管理员</a-select-option>
          <a-select-option value="financial">财务管理员</a-select-option>
          <a-select-option value="all">全局管理员</a-select-option>
        </a-select>
        <a-input-search addon-before="在用户类型下搜索用户"
                    enter-button="Search"
                    placeholder="请输入用户名"
                    @search="typeNameSearch"/>
        <a-button  style="float: left; margin-top: 16px;" @click="getData(1)"><a-icon type="sync"/>显示所有用户</a-button>
      </div>
    </a-card>
    <a-card v-for="person in people"
          :key="person.account_name"
          style="margin-top: 16px; cursor: pointer;">
      <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 1.3rem;">
        <div>用户名：{{person.account_name}}</div>
        <div>用户类型：{{person.account_type}}</div>
        <div>邮箱：{{person.account_email}}</div>
        <div>真实性名：{{person.true_name}}</div>
        <div>联系方式：{{person.telephone}}</div>
        <a-popconfirm title="确认要删除吗" okText="确认" cancelText="取消" @confirm="handleDelete(person)">
          <a-button type="danger" style="margin-top: 8px;">删除</a-button>
        </a-popconfirm>
        <a-button type="primary" style="margin-top: 8px;" @click="personInfo = person; isShowChange = true;">修改信息</a-button>
      </div>
    </a-card>
    <a-pagination style="float: right; margin-top: 24px;"
                  v-model="pageNum"
                  :defaultPageSize="10"
                  :total="total"
                  @change="handleChange"/>
  </div>
</template>

<script>
import fetchAPI from "@/utils/fetchAPI";
import ChangeInfo from "@/views/People/ChangeInfo";
import { EngToChn } from "@/utils/typeChange";

export default {
  name: "People",
  components: {
    'change-Modal': ChangeInfo
  },
  mounted() {
    this.getData(1)
  },
  data() {
    return {
      people: [],
      pageNum: 1,
      total: 0,
      // 是否显示修改用户信息模态窗口
      isShowChange: false,
      // 点击的用户的个人信息
      personInfo: {},
      // 用户类型信息
      userType: 'user'
    }
  },
  methods: {
    // 加载数据
    getData(page) {
      let obj = {
        account_name: this.$store.state.user.username,
        true_name: '',
        email: '',
        telephone: '',
        type: '',
        number: 10,
        current_page: page
      }
      let that = this
      new Promise((resolve, reject) => {
        // 请求仓库总数量
        fetchAPI('/humanresource/size', 'post', { type: ''}).then(res => {
          that.total = parseInt(res)
          resolve()
        })
      }).then(() => {
         fetchAPI('/humanresource/queryAll', 'post', obj).then(res => {
           that.people = JSON.parse(res)
           // 英文用户类型转换为中文
           for (var i = 0; i < that.people.length; i++)
             that.people[i].account_type = EngToChn(that.people[i].account_type)
         })
      })
    },

    // 翻页处理
    handleChange(page) {
      this.getData(page)
    },

    // 按用户名搜索
    nameSearch(value) {
      let obj = {
        account_name: value,
        true_name: '',
        email: '',
        telephone: '',
        type: '',
        number: 100,
        current_page: 1
      }
      let that = this
      fetchAPI('/humanresource/query','post', obj).then(res => {
        let temp = JSON.parse(res)
        let ans = []
        for(var i = 0; i < temp.length; i++) {
          // 接口规范(这个接口返回参数和上面的不一样)
          let obj = {
            account_name: temp[i].account_name,
            true_name: temp[i].true_name,
            account_email: temp[i].email,
            account_type: EngToChn(temp[i].type),
            telephone: temp[i].telephone
          }
          ans.push(obj)
        }
        that.people = ans
      })
    },

    // 按用户类型搜索
    typeSearch(value) {
      let obj = {
        account_name: '',
        true_name: '',
        email: '',
        telephone: '',
        type: value,
        number: 100,
        current_page: 1
      }
      let that = this
      new Promise((resolve, reject) => {
        // 请求用户总数量
        fetchAPI('/humanresource/size', 'post', { type: value }).then(res => {
          that.total = parseInt(res)
          resolve()
        })
      }).then(() => {
         fetchAPI('/humanresource/query', 'post', obj).then(res => {
           let temp = JSON.parse(res)
           let ans = []
           for (var i = 0; i < temp.length; i++) {
             // 接口规范(这个接口返回参数和上面的不一样)
             let obj = {
               account_name: temp[i].account_name,
               true_name: temp[i].true_name,
               account_email: temp[i].email,
               account_type: EngToChn(temp[i].type),
               telephone: temp[i].telephone
             }
             ans.push(obj)
           }
           that.people = ans
         })
      })
    },

    // 按用户类型和用户名搜索
    typeNameSearch(value) {
      let obj = {
        account_name: value,
        true_name: '',
        email: '',
        telephone: '',
        type: this.userType,
        number: 100,
        current_page: 1
      }
      let that = this
      fetchAPI('/humanresource/query', 'post', obj).then(res => {
         let temp = JSON.parse(res)
         let ans = []
         for (var i = 0; i < temp.length; i++) {
           // 接口规范(这个接口返回参数和上面的不一样)
           let obj = {
             account_name: temp[i].account_name,
             true_name: temp[i].true_name,
             account_email: temp[i].email,
             account_type: EngToChn(temp[i].type),
             telephone: temp[i].telephone
           }
           ans.push(obj)
         }
         that.people = ans
       })
    },

    // 删除用户
    handleDelete(person) {
      let obj = {
        account_name: person.account_name,
        true_name: person.true_name
      }
      let that = this
      if(person.account_name === this.$store.state.user.username)
        that.$notification['error']({
            message: '错误',
            description: '不能删除自己',
            duration: 4
        })
      else
        fetchAPI('/humanresource/delete','post', obj).then(res => {
          if(res == '人员删除失败')
            that.$notification['error']({
                message: '错误',
                description: '人员删除失败',
                duration: 4
            })
          else {
            that.$notification.success({
              message: '成功',
              description: '人员删除成功',
              duration: 4
            })
            that.getData()
          }
        })
    },

  }
}
</script>

<style scoped>

</style>