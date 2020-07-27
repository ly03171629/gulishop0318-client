<template>
  <div>
    <h2>深入v-model</h2>
    <!-- v-model的本质，自定义 -->
    <input type="text" v-model="msg">
    <span>我爱你{{msg}}</span>
    <br>
    <br>
    <input type="text" :value="msg" @input="msg = $event.target.value">
    <span>我爱你{{msg}}</span>


    

    <!-- v-model在组件标签的用法 -->
    <!-- v-model在组件标签上可以实现父子数据同步，用在子组件内部是表单类元素的情况下 -->
    <!-- <CustomInput :value="msg" @input="msg = $event"></CustomInput> -->
    <CustomInput v-model="msg"></CustomInput>

    <!-- element-ui的 input组件就用到这个方式了-->
    <el-input type="primary" v-model="msg"></el-input>

  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data(){
      return{
        msg:'赵丽颖'
      }
    },
    components: {
      CustomInput
    }
  }
</script>
