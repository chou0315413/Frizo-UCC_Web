<template>
  <div class="HomePage">
    <Navbar></Navbar>
    <!-- <Banner></Banner> -->
    <Content></Content>
    <!-- <router-link to="/store">到 Store 測試頁</router-link> -->
  </div>
</template>

<script>
import Content from "@/components/Content";
import Navbar from "@/components/base/Navbar";
// import Banner from "@/components/Banner";

export default {
  name: "HomePage",
  components: {
    Content,
    Navbar
    // Banner
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .login {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  z-index: 7;
}

.background {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-color: #000000;
  opacity: 0.5;
  grid-column: 1/2;
  grid-row: 1/2;
}

.loginDivCenter {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  grid-column: 1/2;
  grid-row: 1/2;
}

.loginDiv {
  height: 500px;
  width: 470px;
  background-color: #ffffff;
  background-image: url(../assets/signInBackground/login.jpg);
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.UCCTitle {
  grid-column: 1/9;
  grid-row: 1/2;
} */
</style>
