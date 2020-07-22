<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOut" @mouseenter="isShow=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{item_on:currentIndex === index}"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                  >{{c1.categoryName}}</a>
                  <!-- 为什么不适用声明式导航，因为一次性创建了多个组件对象影响效率，因此我们采用编程式导航去跳转 -->
                  <!-- <router-link :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                  <!-- 使用了编程式导航，但是效率还不是很高，因为每个类别都添加了相同的点击事件，每个点击事件都有自己的回调函数
                  采用事件委派（事件委托，事件代理）来处理-->
                  <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})">{{c1.categoryName}}</a> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                        <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->

                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                          <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'    //引入整体打包体积比较大
import throttle from "lodash/throttle"; //只是引入节流功能
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true
    };
  },

  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  methods: {
    //鼠标移入一级分类控制23级显示

    // moveIn(index) {
    //   console.log(index)
    //   this.currentIndex = index;
    // },

    moveIn: throttle(
      function(index) {
        console.log(index);
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),

    //{ 'trailing': true }  拖延触发，节流操作函数触发如果是true，那么是在规定时间结束之后触发
    //{ 'trailing': false } 不拖延触发，节流操作函数触发如果是false，那么是在规定时间开始就触发

    //鼠标移出隐藏23级
    moveOut() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },

    //点击分类跳转到search
    toSearch(event) {
      let data = event.target.dataset; //拿到所有儿子元素身上所有的自定义属性组成的一个对象
      // console.log(data)
      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        //点的一定是a标签，我们要点的
        let location = {
          name: "search"
        };
        let query = {};
        query.categoryName = categoryname

        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        
        location.query = query

        //点击三级分类的时候，我们也不能光关注query参数，也要去看看之前有没有params参数
        //如果有，需要把之前的params参数也带上
        let {params} = this.$route
        if(params){
          location.params = params
        }

        //看是否是从首页去到search页
        if(this.$route.path != '/home'){
          this.$router.replace(location);
        }else{
          this.$router.push(location);
        }
        
      }
    }
  },
  computed: {
    // categoryList(){
    //   return this.$store.state.categoryList
    // }

    // ...mapState(['categoryList'])

    //上面两种写法是一回事，mapState映射的时候默认映射的就是总的store的state内部的数据
    //如果使用了vuex模块化开发，那么数组的形式就无法使用了

    // categoryList(){
    //   return this.$store.state.home.categoryList
    // }

    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .show-enter{
      height: 0;
      opacity: 0;
    }
    .show-enter-to{
      height: 461px;
      opacity: 1;
    }
    .show-enter-active{
      transition: all 3s;
    }

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      // background: #fafafa;
      background: hotpink;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #aaa;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
