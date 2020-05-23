<template>
  <div class="userPage">
    <!-- useCenter為固定水平置中，merge進user群組時，可調整刪除 -->
    <div class="useCenter">
      <div class="userHome">
        <div class="userBackgroundPhoto"></div>
        <div class="userAvatar">
          <el-avatar :size="170" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  name: "userPage"
};
</script>

<style scoped>
.userPage {
  height: 100vh;
}

.useCenter {
  width: 1000px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userHome {
  width: 750px;
  height: 100vh;
  background-color: #ffffff;
  border: 1px #cfcfcf solid;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.userBackgroundPhoto {
  grid-column: 1/9;
  grid-row: 1/4;
  background-color: aqua;
}

.userAvatar {
  grid-column: 1/9;
  grid-row: 3/5;
  height: 100%;
  width: 200px;
  margin: auto;
}
</style>