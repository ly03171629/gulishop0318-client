<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>

            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>

            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector ref="search" @search="searchForTrademark" @searchForAttr="searchForAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 
                  1、图标字体的引入
                  2、背景色的动态显示（谁有谁没有）
                  3、图标的动态显示（谁显示谁不显示） 
                  4、图标往上还是往下的动态显示
                  5、用户点击综合或者价格，那么修改排序参数，发送请求
                  6、优化代码，主要优化模板当中
                -->
                <!-- 优化前 -->
                <!-- <li :class="{active:searchParams.order.split(':')[0] === '1'}">
                  <a href="javascript:;" @click="sortGoods('1')">
                    综合
                    <i
                      class="iconfont"
                      :class="{iconup:searchParams.order.split(':')[1]==='asc',icondown:searchParams.order.split(':')[1]==='desc'}"
                      v-if="searchParams.order.split(':')[0] === '1'"
                    ></i>
                  </a>
                </li> -->
                <!-- 优化后 -->
                <li :class="{active:sortFlag === '1'}">
                  <a href="javascript:;" @click="sortGoods('1')">
                    综合
                    <i
                      class="iconfont"
                      :class="{iconup:sortType==='asc',icondown:sortType==='desc'}"
                      v-if="sortFlag === '1'"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <!-- 优化前 -->
                <!-- <li :class="{active:searchParams.order.split(':')[0] === '2'}">
                  <a href="javascript:;" @click="sortGoods('2')">
                    价格
                    <i
                      class="iconfont"
                      v-if="searchParams.order.split(':')[0] === '2'"
                      :class="{iconup:searchParams.order.split(':')[1]==='asc',icondown:searchParams.order.split(':')[1]==='desc'}"
                    ></i>
                  </a>
                </li> -->
                <!-- 优化后 -->
                <li :class="{active:sortFlag === '2'}">
                  <a href="javascript:;" @click="sortGoods('2')">
                    价格
                    <i
                      class="iconfont"
                      v-if="sortFlag === '2'"
                      :class="{iconup:sortType=='asc',icondown:sortType==='desc'}"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div> 
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination 
            :currentPageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="goodsListInfo.total"
            :continueNum="5"
            @changePage="changePageNum">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",

  data() {
    return {
      //初始化搜索参数（收集搜索参数）
      //为搜索请求提供搜索参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "2:desc", //排序标志：排序类型    1代表综合排序 2代表价格排序 asc升序  desc降序
        pageNo: 1,
        pageSize: 4,
        props: [],
        trademark: ""
      },
    };
  },
  beforeMount() {
    //beforeMount 去同步更新data的searchParams数据
    this.handlerSearchParams();
  },
  mounted() {
    // this.$refs.search.$on('search',this.searchForTrademark)
    //mounted     去异步发送请求
    this.getGoodsListInfo();
  },
  methods: {
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },

    //处理searchParams参数
    handlerSearchParams() {
      //1、从路由中获取对应的params和query参数
      let { keyword } = this.$route.params;
      let {
        categoryName,
        category1Id,
        category2Id,
        category3Id
      } = this.$route.query;

      //2、拿到的这些参数都是可能有可能没有，需要判定，但是我们这次不判定直接全部放在一个新的对象当中
      //...拆包对象，其实是浅拷贝

      let searchParams = {
        ...this.searchParams,
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id
      };

      //3、过滤这个对象当中没有数据的属性项
      Object.keys(searchParams).forEach(item => {
        if (!searchParams[item]) {
          delete searchParams[item];
        }
      });

      this.searchParams = searchParams;
    },
    //删除面包屑的类别名称
    removeCategoryName() {
      this.searchParams.categoryName = "";
      this.searchParams.pageNo = 1;
      // 删除面包屑路径当中对应的类别名称还在
      // 不能在这直接发请求，因为这样路由是不变化的
      // 我们应该让路由去变化，发请求
      // this.getGoodsListInfo();
      // this.$router.push({name:'search',params:this.$route.params})
      this.$router.replace({ name: "search", params: this.$route.params });
    },
    //删除面包屑的关键字keyword
    removeKeyword() {
      this.searchParams.keyword = "";
      this.searchParams.pageNo = 1;
      this.$bus.$emit("clearKeyword"); //使用全局时间总线通知header组件去清空关键字搜索框
      // this.getGoodsListInfo();
      // this.$router.push({name:'search',query:this.$route.query})
      this.$router.replace({ name: "search", query: this.$route.query });
    },

    searchForTrademark(trademark) {
      //注意：参数格式
      this.searchParams.pageNo = 1;
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getGoodsListInfo();
    },
    //删除面包屑的品牌
    removeTrademark() {
      this.searchParams.trademark = "";
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },

    //根据属性去搜索
    searchForAttr(attr, attrValue) {
      //  "属性ID:属性值:属性名"
      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },

    //删除面包屑当中的属性
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },

    //排序的所有
    sortGoods(sortFlag){
      //优化前
      // let originFlag = this.searchParams.order.split(':')[0]
      // let originType= this.searchParams.order.split(':')[1]
      //优化后
      let originFlag = this.sortFlag
      let originType= this.sortType

      let newOrder //准备改变的排序规则

      if(sortFlag === originFlag){
        //证明标志一样，点的还是原来排序的项
        newOrder = `${sortFlag}:${originType === 'desc'?'asc':'desc'}`
      }else{
        //如果原始的排序flag和传过来的flag不一样，证明点击的不是原来的排序项
        newOrder = `${sortFlag}:desc`
      }

      //排序规则改变后，需要重新发请求拿新的排序规则的数据
      this.searchParams.order = newOrder
      this.getGoodsListInfo();
    },
    changePageNum(num){
      this.searchParams.pageNo = num
      this.getGoodsListInfo();
    }
  },
  computed: {
    ...mapState({
      goodsListInfo:state => state.search.goodsListInfo
    }),
    ...mapGetters(["goodsList"]),
    sortFlag(){
      return this.searchParams.order.split(':')[0]
    },
    sortType(){
      return this.searchParams.order.split(':')[1]
    }
  },

  watch: {
    $route() {
      //还是要去准备参数再次发送请求，而这里的准备参数和beforMount内部是一模一样的
      //因此我们可以把处理参数的过程封装一个公共的函数
      this.handlerSearchParams();
      //需要再次发送请求获取新的参数搜索的数据
      this.getGoodsListInfo();
    }
  },

  components: {
    SearchSelector
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>