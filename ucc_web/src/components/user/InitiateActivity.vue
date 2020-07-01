<template>
  <div class="initiateActivity">
    <button class="openModel" @click="openCloseModel">發布活動</button>
    <!-- Focus Model 背景 -->
    <div class="background" v-if="isModelOpen" @click="openCloseModel"></div>
    <!-- Model 主體 -->
    <div class="Model" v-if="isModelOpen">
      <div :class="isActivityPage?'stateLine':'stateLine2'"></div>
      <!-- 發起活動頁 -->
      <div class="initialActivityPage" v-if="isActivityPage">
        <div class="switchPage">
          <li>
            <div class="switchBtn" id="activityBtn" @click="gotoActivityPage">發布活動</div>
          </li>
          <li>
            <div class="switchBtn" @click="gotoMessagePage">發布消息</div>
          </li>
        </div>
        <div class="line"></div>
        <!-- 活動標題 -->
        <input type="text" class="activityTitle" placeholder="標題" />
        <!-- 活動描述 -->
        <textarea
          class="activityDescription"
          style="width:300px;height:100px;"
          placeholder="活動描述..."
        ></textarea>
        <!-- 上傳照片 -->
        <div class="dm">
          <label :class="isAddPic ? 'havePic' : 'noPic' ">
            <input type="file" style="display:none;" accept="image/*" @change="selectDM" />
            <font-awesome-icon icon="plus-square" size="lg" class="imageIcon" />
          </label>
          <img :src="this.picPreview" class="dmImg" :class="isAddPic ? 'noPic' : 'havePic'" />
        </div>
      </div>
      <!-- 發起消息頁面 -->
      <div class="initialMessagePage" v-else>
        <div class="switchPage">
          <li>
            <div class="switchBtn" @click="gotoActivityPage">發布活動</div>
          </li>
          <li>
            <div
              class="switchBtn"
              id="messageBtn"
              @click="gotoMessagePage"
              style="font-weigth:700;"
            >發布消息</div>
          </li>
        </div>
        <div class="line"></div>
        <h2>Message</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitiateActivity",
  data() {
    return {
      isModelOpen: false,
      isActivityPage: true,
      isAddPic: false,
      picPreview: null,
      dmPicture: null
    };
  },
  methods: {
    openCloseModel() {
      if (this.isModelOpen === false) {
        this.isActivityPage = true;
        this.isModelOpen = true;
      } else {
        this.isModelOpen = false;
      }
    },
    gotoActivityPage() {
      if (this.isActivityPage === false) {
        this.isActivityPage = true;
      }
    },
    gotoMessagePage() {
      if (this.isActivityPage === true) {
        this.isActivityPage = false;
      }
    },
    // 照片匯入
    selectDM(e) {
      // 圖片上傳後端
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.dmPicture = files[0];
      this.isAddPic = true;

      // 圖片預覽
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.picPreview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.8;
  z-index: 0;
}
.openModel {
  height: 50px;
  width: 100px;
}
.Model {
  position: relative;
  padding: 15px 25px;
  margin: auto;
  height: 500px;
  width: 600px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 5;
}
.initialActivityPage {
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  height: 470px;
}
.initialMessagePage {
  display: grid;
  height: 470px;
}
.switchPage {
  grid-row: 1/2;
  display: flex;
}
.switchBtn {
  display: inline;
  margin-right: 10px;
  cursor: pointer;
}
#activityBtn {
  font-weight: 900;
}
#messageBtn {
  font-weight: 900;
}
.stateLine {
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 25px;
  height: 2px;
  width: 64px;
  background-color: rgb(165, 101, 42);
  transition: all 0.3s ease;
}
.stateLine2 {
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 99px;
  height: 2px;
  width: 64px;
  background-color: rgb(165, 101, 42);
  transition: all 0.3s ease;
}
.line {
  height: 1.5px;
  width: 90%;
  overflow: hidden;
  position: absolute;
  background-color: rgb(156, 156, 156);
  margin-top: 26px;
}
.activityTitle {
  font-size: 20px;
  grid-row: 2/3;
  border: none;
  border-bottom: 1px lightgray solid;
  width: 97%;
  transition: all 0.2s ease;
  margin-left: 5px;
}
.activityTitle:focus {
  outline: none;
  border-bottom: 1px rgb(165, 101, 42) solid;
}
.activityDescription {
  margin-top: 5px;
  grid-row: 3/5;
  border: none;
  transition: all 0.1s ease;
  padding: 5px;
}
.activityDescription:focus {
  outline: 1.5px rgb(165, 101, 42) solid;
}
</style>