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
    meta: { title: '页面', keepalive: true, permission: ['all','financial','user','people','order','trans','assign','warehouse'] },
    redirect: '/Page/User/Home',
    children: [
      {
        path: '/Page/PageViewUser',
        name: 'PageViewUser',
        component: PageView,
        meta: { title: '我的', keepalive: true, permission: ['all','user','people','financial','order','trans','assign','warehouse'], hidden: false, icon: 'home'},
        children: [
          {
            path: '/Page/User/Home',
            name: 'User',
            component: () => import('../views/User/User'),
            meta: { title: '个人主页', keepalive: true, permission: ['all','user','people','financial','order','trans','assign','warehouse'], hidden: false, icon: 'user' },
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
        meta: { title: '订单管理', keepalive: true, permission: ['all','order','user'], hidden: false, icon: 'file' },
        children: [
          {
            path: '/Page/Order/Control',
            name: 'Order',
            component: () => import('../views/Order/Order'),
            meta: { title: '订单审核', keepalive: true, permission: ['all','order'], hidden: false, icon: 'file' },
          },
          {
            path: '/Page/Order/Check',
            name: 'Check',
            component: () => import('../views/Order/Check'),
            meta: { title: '订单审核详情', keepalive: true, permission: ['all','order'], hidden: true, icon: 'file' },
          },
          {
            path: '/Page/User/Ask/Ask',
            name: 'Ask',
            component: () => import('../views/Order/Ask/Ask'),
            meta: { title: '进行中订单查询', keepalive: true, permission: ['all','user','order'], hidden: false, icon: 'contacts' },
          },
          {
            path: '/Page/User/Ask/Process',
            name: 'Process',
            component: () => import('../views/Order/Ask/Process'),
            meta: { title: '进行中订单详情', keepalive: true, permission: ['all','user','order'], hidden: true, icon: 'contacts' },
          },
          {
            path: '/Page/User/NowOrder/NowOrder',
            name: 'NowOrder',
            component: () => import('../views/Order/NowOrder/NowOrder'),
            meta: { title: '未进行订单查询', keepalive: true, permission: ['all','user','order'], hidden: false, icon: 'book' },
          },
          {
            path: '/Page/User/NowOrder/OrderDetail',
            name: 'OrderDetail',
            component: () => import('../views/Order/NowOrder/OrderDetail'),
            meta: { title: '订单详情', keepalive: true, permission: ['all','user','order'], hidden: true, icon: 'book' },
          },
          {
            path: '/Page/User/NowOrder/PayOrder',
            name: 'PayOrder',
            component: () => import('../views/Order/NowOrder/PayOrder'),
            meta: { title: '订单支付', keepalive: true, permission: ['all','user','order'], hidden: true, icon: 'book' },
          }
        ]
      },
      {
        path: '/Page/PageViewValue',
        name: 'PageViewValue',
        component: PageView,
        meta: { title: '财务管理', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'credit-card' },
        children: [
          {
            path: '/Page/Value/Control',
            name: 'Value',
            component: () => import('../views/Value/BillAsk'),
            meta: { title: '账单查询', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'profile' },
          },
          {
            path: '/Page/Value/ReleaseSalary',
            name: 'ReleaseSalary',
            component: () => import('../views/Value/ReleaseSalary'),
            meta: { title: '发放工资', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'red-envelope' },
          },
          {
            path: '/Page/Value/Reinburse',
            name: 'Reinburse',
            component: () => import('../views/Value/Reinburse'),
            meta: { title: '报销', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'dollar' },
          },
          {
            path: '/Page/Value/Buy',
            name: 'Buy',
            component: () => import('../views/Value/Buy'),
            meta: { title: '采购', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'shopping-cart' },
          },
          {
            path: '/Page/Value/RequiredItems',
            name: 'RequiredItems',
            component: () => import('../views/Value/RequiredItems'),
            meta: { title: '添加采购物品', keepalive: true, permission: ['all','financial'], hidden: false, icon: 'search' },
          },
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
            meta: { title: '仓库管理', keepalive: true, permission: ['all','warehouse','trans'], hidden: false, icon: 'shop' },
          },
          {
            path: '/Page/WareHouse/WareHouseDetail',
            name: 'WareHouseDetail',
            component: () => import('../views/WareHouse/WareHouseDetail/WareHouseDetail'),
            meta: { title: '仓库详情', keepalive: true, permission: ['all','warehouse','trans'], hidden: true, icon: 'shop' },
          },
          {
            path: '/Page/WareHouse/Shelf',
            name: 'Shelf',
            component: () => import('../views/WareHouse/WareHouseDetail/Shelf'),
            meta: { title: '货架详情', keepalive: true, permission: ['all','warehouse','trans'], hidden: true, icon: 'shop' },
          },
          {
            path: '/Page/WareHouse/CreateWareHouse',
            name: 'CreateWareHouse',
            component: () => import('../views/WareHouse/CreateWareHouse'),
            meta: { title: '创建仓库', keepalive: true, permission: ['all'], hidden: false, icon: 'plus-circle' },
          },
          {
            path: '/Page/WareHouse/DeleteWareHouse',
            name: 'DeleteWareHouse',
            component: () => import('../views/WareHouse/DeleteWareHouse'),
            meta: { title: '删除仓库', keepalive: true, permission: ['all'], hidden: false, icon: 'minus-circle' },
          }
        ]
      },
      {
        path: '/Page/PageViewAssign',
        name: 'PageViewAssign',
        component: PageView,
        meta: { title: '调度管理', keepalive: true, permission: ['all','assign','trans'], hidden: true, icon: 'control' },
        children: [
          {
            path: '/Page/Assign/Control',
            name: 'Assign',
            component: () => import('../views/Assign/Assign'),
            meta: { title: '调度管理', keepalive: true, permission: ['all','assign','trans'], hidden: true, icon: 'control' },
          }
        ]
      }
    ]
  }
]
