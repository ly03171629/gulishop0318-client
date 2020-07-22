<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <SliderLoop :bannerList="bannerList"></SliderLoop>
        <!-- <div class="swiper-container" ref="banner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner, index) in bannerList" :key="banner.id">
              <img :src="banner.imgUrl" />
            </div>
          </div>
          <div class="swiper-pagination"></div>

          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//swiper引入js和css
// import Swiper from "swiper";
// import "swiper/css/swiper.min.css";

export default {
  name: "ListContainer",
  mounted() {
    this.getBannerList();
    //为什么Swiper在实例的时候放在mounted当中 静态数据是可以的
    //动态数据就不行
    // 静态数据一上来就加载完成了，我们页面的结构也就形成了，然后创建swiper 理所当然就可以
    //动态数据 是我们异步请求的，mounted里面发请求完之后 立即实例化swiper,此时请求的数据不一定回来
    //而我们的页面结构是依赖动态的数据进行创建的
    // new Swiper(this.$refs.banner, {
    //   // direction: "vertical", // 垂直切换选项
    //   // loop: true, // 循环模式选项

    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   },

    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   }

    //   // 如果需要滚动条
    //   // scrollbar: {
    //   //   el: ".swiper-scrollbar"
    //   // }
    // });
  },
  methods: {
    getBannerList() {
      this.$store.dispatch("getBannerList");
    }
  },
  computed: {
    // 总的store 内部的state比较特殊  state总的内部会有home，数据是放在home对象内部
    // 其它的getters  mutations  actions 都没有
    // ...mapState({
    //   bannerList : state => state.home.bannerList
    // })
    ...mapGetters(["bannerList"])
  },
  // watch: {
  //   bannerList: {
  //     handler() {
  //       //Vue.nextTick或者vm.$nextTick是一样的功能
  //       //在最近的一次dom更新之后执行nextTick里面传的回调函数
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.banner, {
  //           // direction: "vertical", // 垂直切换选项
  //           // autoplay:true,//等同于以下设置
  //           loop: true, // 循环模式选项

  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination"
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev"
  //           }

  //           // 如果需要滚动条
  //           // scrollbar: {
  //           //   el: ".swiper-scrollbar"
  //           // }
  //         });
  //       });
  //     },
  //     immediate:true //立即执行，在最近dom更新之前就会执行
  //   },



    
  // }
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(../../../assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
