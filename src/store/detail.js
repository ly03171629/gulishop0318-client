import {reqGoodsDetailInfo} from '@/api'

const state = {
  goodsDetailInfo : {}
}
const mutations = {
  //直接修改数据
  RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  },

}

const actions = {
  //异步请求数据
  //async 和 await的用法
  async getGoodsDetailInfo({commit},skuId){
    const result = await reqGoodsDetailInfo(skuId)
    if(result.code === 200){
      commit('RECEIVEGOODSDETAILINFO',result.data)
    }
  },

  
}

const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  },
  //处理 state.goodsDetailInfo.skuInfo || {} 确保skuInfo不是undefined
  // skuInfo然后去计算skuImageList，但是skuImageList有可能是undefined
  imgList(state){
    return (state.goodsDetailInfo.skuInfo || {}).skuImageList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}