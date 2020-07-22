<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-if="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: '',
  components:{
    Header,
    Footer
  },
  //本来我们请求三级分类列表的功能是在TypeNav里面去做的
  //但是放在TypeNav里面 从home切换到search，这个请求会触发两次，而数据又是一样的，所以造成浪费（效率低下）
  // 因此我们可以优化在app当中去发请求
  mounted() {
    this.getCategoryList();
  },
  methods:{
    getCategoryList(){
      this.$store.dispatch('getCategoryList')
    }
  }

}
</script>

<style lang="less" scoped>

</style>
