<template>
  <div class="child1">
    i am child1
    <button @click="childClick">click me</button>
  </div>
</template>

<script>
export default {
  name: "child1",
  data() {
    return {
      childValue: "child1"
    };
  },
  methods: {
    childClick() {
      // childByValue是在父元件on監聽的方法
      // 第二個引數this.childValue是需要傳的值
      this.$emit("childByValue", this.childValue);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

