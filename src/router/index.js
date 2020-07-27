import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from '@/store'

//终极解决多次触发push或者repalce，报错的问题
//NavigationDuplicated

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected === undefined){
    // originPush.call目的是让VueRouter实例化对象去调用‘
    //如果不加，那就是window在调用
    return originPush.call(this,location).catch(() => {})
  }else{
    return originPush.call(this,location,onResolved,onRejected)
  }
}

VueRouter.prototype.replace = function(location,onResolved,onRejected){
  if(onResolved === undefined && onRejected === undefined){
    // originPush.call目的是让VueRouter实例化对象去调用‘
    //如果不加，那就是window在调用
    return originReplace.call(this,location).catch(() => {})
  }else{
    return originReplace.call(this,location,onResolved,onRejected)
  }
}


import routes from '@/router/routes'
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//添加全局前置路由导航守卫
// 必须登录后才能访问的多个界面使用全局守卫（交易相关、支付相关、用户中心相关） 
// 自动跳转前面想而没到的页面

router.beforeEach((to, from, next) => {
  //to:代表路由对象，目标（想去哪）
  //from: 代表路由对象，起始（从哪来）
  //netx：是一个函数，选择放行或者不放行的意思还可以去重定向到一个新的地方  
  //next()就是放行
  //next(false)不放行
  //next(路径)重定向

  let targerPath = to.path
  if(targerPath.startsWith('/pay') || targerPath.startsWith('/trade') || targerPath.startsWith('/center')){
    //看看用户是否登录了
    if(store.state.user.userInfo.name){
      next()
    }else{
      //在登录的路径后面添加上之前想要去的路径
      //配合登录逻辑可以让我们去到之前想去而没有去的地方
      next('/login?redirect='+targerPath)
    }
  }else{
    next()
  }

})

export default router