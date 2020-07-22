import {reqAddOrUpdateShopCart,reqShopCartList,reqUpdateIsChecked,reqDeleteCart} from '@/api'

const state = {
  shopCartList:[]
}
const mutations = {
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
}

const actions = {
  async addorUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code === 200){
      return '添加或修改购物车数量成功'
    }else{
      // return '添加购物车失败' 返回的还是成功的promise
      //返回的是失败的promise
      return Promise.reject(new Error('添加或修改购物车数量失败'))
    }
  },
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code === 200){
      commit('RECEIVESHOPCARTLIST',result.data)
    }
  },
  async updateIsChecked({commit},{skuId,isChecked}){
    const result = await reqUpdateIsChecked(skuId,isChecked)
    if(result.code === 200){
      return '修改选中状态成功'
    }else{
      // return '修改选中状态失败'
      return Promise.reject(new Error('修改选中状态失败'))
    }
  },

  updateAllIsChecked({commit,state,dispatch},isChecked){
    //定义数组存储每一项去发请求返回的promise对象
    let promises = []
    state.shopCartList.forEach(item => {
      if(item.isChecked === isChecked) return
      let promise = dispatch('updateIsChecked',{skuId:item.skuId,isChecked:isChecked})
      promises.push(promise)
    })
    
    //Promise.all 传递的参数必须是一个promise对象的数组，返回值也是一个promise 
    //返回的promise对象的成功和失败  看数组内部所有的promise对象是否成功，如果都成功，那么它就成功，如果有一个失败，那它就失败
    //成功的返回值promise的数据是一个数组 【每个成功的promise的数据】
    return Promise.all(promises)
  },

  //删除一个
  async deleteShopCart({commit},skuId){
    const result = await reqDeleteCart(skuId)
    if(result.code === 200){
      return '删除成功'
    }else{
      return Promise.reject(new Error('删除失败'))
    }
  },

 // 删除多个
  deleteCheckedShopCart({commit,dispatch,state}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return 
      let promise = dispatch('deleteShopCart',item.skuId)
      promises.push(promise)
    })

    return Promise.all(promises)
  }


}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}