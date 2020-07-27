export const myMixin = {
  methods:{
    // 重复的代码写在这
    giveMoney(money){
      this.money -= money
      this.$parent.money += money
    }
  }

}