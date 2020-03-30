<template>
  <div class="HomePage">
    <Navbar></Navbar>
    <nav-header></nav-header>
    <Banner></Banner>
    <ContentList></ContentList>
    <Login></Login>
    <register></register>
    <router-link to="/store">到 Store 測試頁</router-link>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import ContentList from "@/components/ContentList";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Login from "@/components/Login";
import register from "@/components/Register";

export default {
  name: "HomePage",
  components: {
    NavHeader,
    ContentList,
    Navbar,
    Banner,
    Login,
    register
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
