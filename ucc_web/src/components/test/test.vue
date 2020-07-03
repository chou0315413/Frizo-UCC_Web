<template>
  <div class="userPage">
    <!-- useCenter為固定水平置中，merge進user群組時，可調整刪除 -->
    <div class="useCenter">
      <div class="userHome">
        <div class="userIntroduction">
          <div class="userBackgroundPhoto"></div>
          <div class="userAvatar">
            <el-avatar :size="150" :src="circleUrl"></el-avatar>
          </div>
          <div class="userName">
            <b>{{userName}}</b>
          </div>
          <div class="description">{{description}}</div>
          <div class="divider"></div>
        </div>
        <div class="userActivity">
          <div class="btnGroup">
            <el-radio-group v-model="radio" @change="changeList">
              <el-radio :label="1">
                <b>活動</b>
              </el-radio>
              <el-radio :label="2">
                <b>消息</b>
              </el-radio>
            </el-radio-group>
          </div>
          <div class="activityContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "roger",
      description:
        "簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字簡介最長幾字",
      radio: 1
    };
  },

  name: "userPage"
};
</script>

<style scoped>
.userPage {
  /* 高度之後再做微調 */
  height: 200vh;
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
  /* 高度之後再做微調 */
  height: 200vh;
  background-color: #ffffff;
  border: 1px #cfcfcf solid;
}

.userIntroduction {
  position: relative;
  width: 750px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.userBackgroundPhoto {
  grid-column: 1/9;
  grid-row: 1/5;
  background-color: aqua;
}

.userAvatar {
  grid-column: 1/9;
  grid-row: 4/6;
  height: 100%;
  margin: auto;
}

.userName {
  grid-column: 1/9;
  grid-row: 7/8;
  font-size: 28px;
}

.description {
  position: relative;
  grid-column: 1/9;
  grid-row: 8/9;
  font-size: 20px;
}

.divider {
  position: relative;
  top: 5px;
  grid-column: 2/8;
  grid-row: 8/9;
  border-bottom: 1px #aaaaaa solid;
}

.userActivity {
  position: relative;
  height: 100vh;
  top: 5px;
}
</style>
