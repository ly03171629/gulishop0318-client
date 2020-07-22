import {reqGoodsList} from '@/api'

const state = {
  goodsListInfo:{}
}
const mutations = {
  //直接修改数据
  RECEIVEGOODSLISTINFO(state,goodsListInfo){
    state.goodsListInfo = goodsListInfo
  }
}

const actions = {
  //异步请求数据
  //searchParams是用来接收组件dispatch传递过来的参数对象
  //这个参数如果组件传递的就是一个数据，可以直接接收（什么数据类型都行）
  //如果这个参数需要接收多个数据，必须封装成对象传递过来

  async getGoodsListInfo({commit},searchParams){
    const result = await reqGoodsList(searchParams)
    if(result.code === 200){
      commit('RECEIVEGOODSLISTINFO',result.data)
    }
  }
}

const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}