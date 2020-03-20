<template>
  <div class="HomePage">
    <nav-header></nav-header>
    <ContentList></ContentList>
  </div>
</template>

<script>
import NavHeader from "../components/NavHeader";
import ContentList from "../components/ContentList";

export default {
  name: "HomePage",
  components: {
    NavHeader,
    ContentList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
