<template>
  <div class="user">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import { authenticated } from "@/utils/AuthStore";
import Navbar from "@/components/base/Navbar";

export default {
  name: "User",

  data() {
    return {};
  },

  components: {
    Navbar
  },

  beforeRouteEnter(to, from, next) {
    if (authenticated()) {
      next();
    } else {
      next("/");
    }
  }
};
</script>

<style scoped>
.user {
  position: relative;
  top: 50px;
  background-color: #b2702f;
  height: 100vh;
}
</style>