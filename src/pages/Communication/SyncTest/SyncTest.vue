<template>
  <div>
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- 这是自己随意绑定的一个自定义事件 -->
    <!-- <Child :money="money" @spendMoney="spendMoney"></Child> -->

    <!-- sync本质上也是绑定了一个事件，但是事件名是固定的，不能随意更改 -->
    <!-- <Child :money="money" @update:money="spendMoney"></Child> -->

    <br />
    <br />
    <br />

    <h2>使用sync修改符</h2>
    <Child2 :money.sync="money"></Child2>

    <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog> -->

    <h2>使用v-model修改符</h2>
    <!-- 行是行，但是不推荐，v-model使用的表单类的元素 -->
    <!-- <Child2 v-model="money"></Child2> -->
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 1000,
    };
  },
  methods: {
    // spendMoney(money){
    //   this.money = money
    // }
  },
  components: {
    Child,
    Child2,
  },
};
</script>
