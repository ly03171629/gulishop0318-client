// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
//1、import函数是动态加载
//2、import函数内部传递的东西会打包成一个独立的小文件

import Login from '@/pages/Login'
import Register from '@/pages/Register'

import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

import store from '@/store'

export default [
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect: 'myorder'
      }
    ]

  },
  {
    path:'/pay',
    component:Pay,
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/')
      }
    }
  },

  {
    path:'/trade',
    component:Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    // beforeEnter: (to, from, next) => {
    //   let skuNum = to.query.skuNum
    //   let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
    //   if(skuNum && skuInfo){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // }
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home   //Home是上面我们懒加载的函数  这个函数是在第一次访问这个组件的时候去执行
  },
  {
    path:'/login',
    component:Login,
    // 用来判定底部是否隐藏
    meta:{
      isHide:true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if(!store.state.user.userInfo.name){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHide:true
    }
  },
  {
    path:'/search/:keyword?',
    component:Search,
    name:'search',
    // props: route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]