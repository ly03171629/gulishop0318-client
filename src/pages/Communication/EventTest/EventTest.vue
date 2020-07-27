<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生dom事件在html标签和组件标签上的区别   （Event1组件测试） -->
    <!-- 
      原生的事件在html标签上就是原生的
      原生的事件在组件标签上就默认不是原生的（而是自定义事件），想要成为原生事件,必须使用.native 
        并且这个原生的事件是添加给了组件内部的根元素
     -->
    <button @click="test1">我爱你赵丽颖</button>
    <!-- <button @click="test1($event)">我爱你赵丽颖</button> -->
    <Event1 @click.native="test2"></Event1>


    <br>

    <!-- 自定义事件在原生的html标签上无意义 -->
    <button @haha="test3">我爱你杨幂</button>
    <Event2 @click="test4" @xxx="test5"></Event2>


  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
      test1(event){
        console.log(event.target.innerText)
      },
      test2(event){
        console.log(event.target.innerText)
      },
      test3(){
        console.log(1111)
      },
      test4(event){
        console.log(event)
      },
      test5(event){
        console.log(event)
      }
    }
  }
</script>
