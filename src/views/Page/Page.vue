<template>
  <div style="height: 100%; position:relative;">
    <!-- 左边的菜单栏 -->
    <div v-show="isShow" :style="{float: 'left', width: menuWidth, height: '100%', minWidth: '100px', position: menuPosition, zIndex: 3, overflowY: isOverY, overflow: isHidden}">
      <a-menu v-show="isShow"
              theme="dark"
              mode="inline"
              :inlineCollapsed="collapsed"
              :default-open-keys="['PageViewUser', 'PageViewOrder', 'PageViewWareHouse', 'PageViewPeople']"
              style="height: 100%; min-width: 100px; " @click="jump">
        <S-Menu :node="node" v-for="node in nodes"></S-Menu>
      </a-menu>
    </div>
    <!-- 右上的信息栏 -->
    <div :style="{float: 'left', width: rightWidth, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
      <a-button type="primary" @click="toggleCollapsed" style="margin-left: 16px;">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-dropdown-button style="margin-right: 16px;">
        {{userName}}
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="Logout"><a-icon type="undo"></a-icon><span>退出登录</span></a-menu-item>
          <a-menu-item key="2" @click="Clear"><a-icon type="setting"></a-icon><span>清空缓存</span></a-menu-item>
        </a-menu>
        <a-icon type="setting" slot="icon"></a-icon>
      </a-dropdown-button>
    </div>
    <!-- 右边的内容栏 -->
    <a-card id="content" :style="{float: 'left', width: rightWidth, height: 'calc(100% - 74px)'}" @click="contentClick">
      <router-view />
    </a-card>
    <!-- 底部内容 -->
    <div :style="{height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', float: 'left', width: rightWidth, color: 'grey'}">
      {{copyRight}}
    </div>
  </div>
</template>

<script>
import SMenu from './Smenu'
export default {
  name: "Page",
  components: {
    'S-Menu': SMenu
  },
  created() {
    // 适配手机
    this.adpatPhone()
    // 加载基础数据
    this.getData()
  },
  mounted() {
    // router-view中的内容无法继承高度，在这里强制继承高度
    let routerHeight = document.getElementById('content').firstChild
    routerHeight.style.height = '100%'
  },
  data() {
    return {
      userName: '',
      isShow: true,
      menuPosition: 'relative',
      collapsed: false,
      menuWidth: '256px',
      rightWidth: 'calc(100% - 256px)',
      copyRight: 'Copyright  2021  山东大学(威海) 19计算机(中澳) 黄皓 朱胤璘 赵玉淋 樊华',
      nodes: this.dfsRouter(this.$store.state.permission.addRoutes[0]).children,
      isOverY: 'None',
      isHidden: 'hidden'
    }
  },
  methods: {
    // 登出
    Logout() {
      if(localStorage.getItem('userInfo') != null)
        localStorage.removeItem('userInfo')
        // 清空Vuex中的数据
        this.$store.commit('userClear')
        this.$store.commit('permissionClear')
        // 跳转回登录界面
        this.$router.push({name: 'Login'})
    },
    // 菜单折叠
    toggleCollapsed() {
      // 适配手机
      if(document.body.clientWidth < 1000) {
        this.isShow = !this.isShow
      }
      // 适配电脑
      else {
        this.collapsed = !this.collapsed
        if(this.collapsed == false) {
          this.rightWidth = 'calc(100% - 256px)'
          this.menuWidth = '256px'
        }
        else {
          this.rightWidth = 'calc(100% - 100px)'
          this.menuWidth = '100px'
        }
      }
    },
    contentClick() {
      // 此时侧边栏的效果是首先不显示，如果点击按钮会以absolute形式覆盖上去，点击空白区域将会收回侧边栏
      if(document.body.clientWidth < 1000) {
        if(this.isShow == true)
          this.isShow = false
      }
    },
    // 适配手机
    adpatPhone() {
      if(document.body.clientWidth < 1000) {
        // 如果是屏幕宽度小于1000，那么不显示侧边栏，此时右边内容栏和信息栏的宽度应该是100%
        this.rightWidth = '100%'
        this.isShow = false
        this.menuPosition = 'absolute'
        this.copyRight = 'Copyrigt  2021  山东大学(威海)'
        this.isOverY = 'scroll'
        this.isHidden = 'None'
      }
    },
    // 加载基础数据
    getData() {
      // 加载姓名
      this.userName = this.$store.state.user.username
      // 获取权限路由，获取这个子路由是因为最外层一定是Page(所有权限)，考虑子路由的权限就可以了
      const routers = this.$store.state.permission.addRoutes.children

    },
    // 递归可访问的路由
    dfsRouter(router) {
      if(router.children == undefined) {
        return {
          key: router.name,
          title: router.meta.title,
          children: [],
          hasChild: false,
          icon: router.meta.icon,
          hidden: router.meta.hidden
        }
      }
      else {
        let children = []
        for(var i = 0; i < router.children.length; i++) {
          children.push(this.dfsRouter(router.children[i]))
        }
        return {
          key: router.name,
          title: router.meta.title,
          children: children,
          hasChild: true,
          icon: router.meta.icon,
          hidden: router.meta.hidden
        }
      }
    },

    // 点击菜单进行路由跳转
    jump(target) {
      this.$router.push({name: target.key})
    },
    // 清除缓存
    Clear() {
      if(localStorage.getItem('userInfo'))
        localStorage.removeItem('userInfo')
      alert('清除成功')
    }
  }
}
</script>

<style scoped>
</style>