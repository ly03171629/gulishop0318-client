<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- <List :todos="todos">
      <template slot-scope="slotProps">
        <span v-if="slotProps.todo.isComplete" style="color:hotpink">{{slotProps.todo.text}}</span>
        <span v-else>{{slotProps.todo.text}}</span>
      </template>
    </List> -->
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope="slotProps">
        <span :style="{color:slotProps.index % 2===1?'blue':'green'}">{{slotProps.index+1}}{{slotProps.todo.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
