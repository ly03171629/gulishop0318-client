<template>
  <div class="swiper-container" ref="imglist">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img :src="img.imgUrl" @click="changeIndex(index)" :class="{active:currentIndex === index}" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("changeDefaultIndex", index);
    }
  },
  watch: {
    imgList: {
      handler() {
        //Vue.nextTick或者vm.$nextTick是一样的功能
        //在最近的一次dom更新之后执行nextTick里面传的回调函数
        this.$nextTick(() => {
          new Swiper(this.$refs.imglist, {
            // direction: "vertical", // 垂直切换选项
            // autoplay:true,//等同于以下设置
            // loop: true, // 循环模式选项

            // // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination"
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            slidesPerGroup:5, //点击一下滑动一组有多少张
            slidesPerView:5 //一屏显示多少张
            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar"
            // }
          });
        });
      },
      immediate: true //立即执行，在最近dom更新之前就会执行
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>