import Login from "@/views/Login/Login";
import Page from "@/views/Page/Page";
import Forget from "@/views/Login/Forget";
import PageView from "@/views/Page/PageView";

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: '登录', keepalive: true }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget,
    meta: { title: '忘记密码', keepalive: true }
  }
]

export const asyncRoutes = [
  {
    path: '/Page',
    name: 'Page',
    component: Page,
    meta: { title: '页面', keepalive: true, permission: ['all','value','user','people','order','trans','assign','warehouse'] },
    redirect: '/Page/User/Home',
    children: [
      {
        path: '/Page/PageViewUser',
        name: 'PageViewUser',
        component: PageView,
        meta: { title: '我的', keepalive: true, permission: ['all','user','people','value','order','trans','assign','warehouse'], hidden: false, icon: 'home'},
        children: [
          {
            path: '/Page/User/Home',
            name: 'User',
            component: () => import('../views/User/User'),
            meta: { title: '个人主页', keepalive: true, permission: ['all','user','people','value','order','trans','assign','warehouse'], hidden: false, icon: 'user' },
          },
          {
            path: '/Page/User/Send',
            name: 'Send',
            component: () => import('../views/User/Send/Send'),
            meta: { title: '寄件', keepalive: true, permission: ['all','user'], hidden: false, icon: 'gift' },
          },
          {
            path: '/Page/User/Send/MailInfo',
            name: 'MailInfo',
            component: () => import('../views/User/Send/MailInfo'),
            meta: { title: '寄件人信息', keepalive: true, permission: ['all','user'], hidden: true, icon: 'gift' },
          },
          {
            path: '/Page/User/Send/AcceptInfo',
            name: 'AcceptInfo',
            component: () => import('../views/User/Send/AcceptInfo'),
            meta: { title: '收件人信息', keepalive: true, permission: ['all','user'], hidden: true, icon: 'gift' },
          },
          {
            path: '/Page/User/Ask/Ask',
            name: 'Ask',
            component: () => import('../views/User/Ask/Ask'),
            meta: { title: '订单进度查询', keepalive: true, permission: ['all','user'], hidden: false, icon: 'contacts' },
          },
          {
            path: '/Page/User/NowOrder/NowOrder',
            name: 'NowOrder',
            component: () => import('../views/User/NowOrder/NowOrder'),
            meta: { title: '订单查询', keepalive: true, permission: ['all','user'], hidden: false, icon: 'book' },
          }
        ]
      },
      {
        path: '/Page/PageViewPeople',
        name: 'PageViewPeople',
        component: PageView,
        meta: { title: '人事管理', keepalive: true, permission: ['all','people'], hidden: false, icon: 'team' },
        children: [
          {
            path: '/Page/People/Control',
            name: 'People2',
            component: () => import('../views/People/People'),
            meta: { title: '人事管理', keepalive: true, permission: ['all','people'], hidden: false, icon: 'team' },
          }
        ]
      },
      {
        path: '/Page/PageViewOrder',
        name: 'PageViewOrder',
        component: PageView,
        meta: { title: '订单管理', keepalive: true, permission: ['all','order'], hidden: false, icon: 'file' },
        children: [
          {
            path: '/Page/Order/Control',
            name: 'Order',
            component: () => import('../views/Order/Order'),
            meta: { title: '订单管理', keepalive: true, permission: ['all','order'], hidden: false, icon: 'file' },
          }
        ]
      },
      {
        path: '/Page/PageViewValue',
        name: 'PageViewValue',
        component: PageView,
        meta: { title: '财务管理', keepalive: true, permission: ['all','value'], hidden: false, icon: 'credit-card' },
        children: [
          {
            path: '/Page/Value/Control',
            name: 'Value',
            component: () => import('../views/Value/Value'),
            meta: { title: '财务管理', keepalive: true, permission: ['all','value'], hidden: false, icon: 'credit-card' },
          }
        ]
      },
      {
        path: '/Page/PageViewWareHouse',
        name: 'PageViewWareHouse',
        component: PageView,
        meta: { title: '仓库管理', keepalive: true, permission: ['all','warehouse'], hidden: false, icon: 'shop' },
        children: [
          {
            path: '/Page/WareHouse/Control',
            name: 'WareHouse',
            component: () => import('../views/WareHouse/WareHouse'),
            meta: { title: '仓库管理', keepalive: true, permission: ['all','warehouse'], hidden: false, icon: 'shop' },
          }
        ]
      },
      {
        path: '/Page/PageViewAssign',
        name: 'PageViewAssign',
        component: PageView,
        meta: { title: '调度管理', keepalive: true, permission: ['all','assign'], hidden: false, icon: 'control' },
        children: [
          {
            path: '/Page/Assign/Control',
            name: 'Assign',
            component: () => import('../views/Assign/Assign'),
            meta: { title: '调度管理', keepalive: true, permission: ['all','assign'], hidden: false, icon: 'control' },
          }
        ]
      }
    ]
  }
]
