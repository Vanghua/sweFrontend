import Login from "@/views/Login/Login";
import Page from "@/views/Page/Page";
import Forget from "@/views/Login/Forget";

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
    meta: { title: '登录', keepalive: true }
  }
]

export const asyncRoutes = [
  {
    path: '/Page',
    name: 'Page',
    component: Page,
    meta: { title: '页面', keepalive: true, permission: ['all','value','user','people','order','trans','assign','warehouse'] },
    redirect: '/Page/User',
    children: [
      {
        path: '/Page/User',
        name: 'User',
        component: () => import('../views/User/User'),
        meta: { title: '个人主页', keepalive: true, permission: ['all','user','people','value','order','trans','assign','warehouse'], hidden: true },
      },
      {
        path: '/Page/People',
        name: 'People',
        component: () => import('../views/People/People'),
        meta: { title: '人事管理', keepalive: true, permission: ['all','people'], hidden: true },
        children: [
          {
            path: '/Page/People2',
            name: 'People2',
            component: () => import('../views/People/People'),
            meta: { title: '人事管理2', keepalive: true, permission: ['all','people'], hidden: true },
          }
        ]
      },
      {
        path: '/Page/Order',
        name: 'Order',
        component: () => import('../views/Order/Order'),
        meta: { title: '订单管理', keepalive: true, permission: ['all','order'], hidden: true }
      },
      {
        path: '/Page/Value',
        name: 'Value',
        component: () => import('../views/Value/Value'),
        meta: { title: '财务管理', keepalive: true, permission: ['all','value'], hidden: true }
      },
      {
        path: '/Page/WareHouse',
        name: 'WareHouse',
        component: () => import('../views/WareHouse/WareHouse'),
        meta: { title: '仓库管理', keepalive: true, permission: ['all','warehouse'], hidden: true }
      },
      {
        path: '/Page/Assign',
        name: 'Assign',
        component: () => import('../views/Assign/Assign'),
        meta: { title: '调度管理', keepalive: true, permission: ['all','assign'], hidden: true }
      }
    ]
  }
]
