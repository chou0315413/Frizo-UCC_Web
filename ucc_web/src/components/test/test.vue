<template>
  <div class="father">
    i am father = {{name}}
    <child1 v-on:childByValue="childByValue"></child1>
    <child2 v-on:childByValue="childByValue"></child2>
  </div>
</template>

<script>
// import child1 from "@/components/test/child1";
// import child2 from "@/components/test/child2";

export default {
  name: "father",
  // components: { child1, child2 },
  data() {
    return {
      name: "father"
    };
  },
  methods: {
    childByValue: function(childValue) {
      // childValue就是子元件傳過來的值
      this.name = childValue;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

