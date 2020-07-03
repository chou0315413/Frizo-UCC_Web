<template>
  <div class="initiateActivity">
    <button class="openModel" @click="openCloseModel">發布活動</button>
    <!-- Focus Model 背景 -->
    <div class="background" v-if="isModelOpen" @click="openCloseModel"></div>
    <!-- Model 主體 -->
    <div class="Model" v-if="isModelOpen">
      <div :class="isActivityPage?'stateLine':'stateLine2'"></div>
      <!-------------------------- 發起活動頁面 -------------------------->
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
          style="width:300px;height:180px;"
          placeholder="活動描述..."
        ></textarea>
        <!-- 上傳活動照片 -->
        <div class="dm">
          <label :class="isAddPic ? 'havePic' : 'noPic' ">
            <input type="file" style="display:none;" accept="image/*" @change="selectDM" />
            <font-awesome-icon icon="file-image" size="lg" class="imageIcon" />
            <span>上傳照片</span>
          </label>
          <img :src="this.picPreview" class="dmImg" :class="isAddPic ? 'noPic' : 'havePic'" />
        </div>
        <!-- 活動人數 -->
        <div class="people">
          <label class="peopleDescription">人數</label>
          <select v-model="people" class="peopleSelect">
            <option>請選擇</option>
            <option value="5人">5人</option>
            <option value="5~10人">5~10人</option>
            <option value="10~20人">10~20人</option>
            <option value="20人以上">20以上</option>
          </select>
        </div>
        <!-- 活動地點 -->
        <div class="location">
          <label class="locationDescription">活動地點</label>
          <input type="text" class="locationInput" placeholder="請輸入活動地點" />
        </div>
        <!-- 報名截止日 -->
        <div class="deadline">
          <span class="demonstration">活動報名截止日</span>
          <el-date-picker
            v-model="event.registrationDeadline"
            type="date"
            placeholder="選擇日期"
            @change="deadlineDateChange"
          >
            <template slot="prepend">活動報名截止日</template>
          </el-date-picker>
        </div>
        <!-- 活動開始日期 -->
        <div class="time">
          <span class="demonstration">活動開始日期</span>
          <el-date-picker
            v-model="event.eventStartTime"
            type="date"
            placeholder="選擇日期"
            @change="startTimeDateChange"
          >
            <template slot="prepend">活動開始日期</template>
          </el-date-picker>
        </div>
        <!-- 活動標籤 -->
        <div class="tag">
          <el-tag
            :key="tag"
            v-for="tag in event.labelNameList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="newTag"
            :disabled="tagsNumber == 5"
          >新增標籤</el-button>
        </div>
        <!-- 提交活動至後端 -->
        <div class="activityPush">
          <button class="pushActivityBtn" round @click.prevent="sendCreateRequest">發布</button>
        </div>
      </div>
      <!-------------------------- 發起消息頁面 -------------------------->
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
        <!-- 消息描述 -->
        <textarea
          class="messageDescription"
          style="width:280px;height:280px;"
          placeholder="有什麼消息..."
        ></textarea>
        <!-- 上傳消息照片 -->
        <div class="msgPic">
          <label :class="isAddMsgPic ? 'haveMsgPic' : 'noMsgPic' ">
            <input type="file" style="display:none;" accept="image/*" @change="selectMsgPic" />
            <font-awesome-icon icon="file-image" size="lg" class="imageIcon" />
            <span>上傳照片</span>
          </label>
          <img
            :src="this.msgPicPreview"
            class="msgPicImg"
            :class="isAddMsgPic ? 'noMsgPic' : 'haveMsgPic'"
          />
        </div>
        <!-- 提交消息至後端 -->
        <div class="messagePush">
          <button class="pushMessageBtn">發布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createEvent } from "@/api/event";
export default {
  name: "InitiateActivity",
  data() {
    return {
      isModelOpen: false,
      isActivityPage: true,
      // 發布活動的照片
      isAddPic: false,
      picPreview: null,
      dmPicture: null,
      // 發布訊息的照片
      isAddMsgPic: false,
      msgPicPreview: null,
      msgPicture: null,

      people: "請選擇",
      // 活動資料
      event: {
        title: "",
        description: "",
        dmPicture: null,
        maxNumberOfPeople: 10,
        registrationDeadline: new Date().toISOString().substr(0, 10),
        eventStartTime: new Date().toISOString().substr(0, 10),
        place: "",
        fee: 0,
        labelNameList: []
      },
      // 標籤資料
      tagsNumber: 0,
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    // 送出活動發起請求
    sendCreateRequest() {
      createEvent(this.event)
        .then(resp => {
          console.log(resp.data);
          alert("發佈成功");
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    // 打開發起模組
    openCloseModel() {
      if (this.isModelOpen === false) {
        this.isActivityPage = true;
        this.isModelOpen = true;
      } else {
        this.isModelOpen = false;
      }
    },
    // 進入發起活動頁
    gotoActivityPage() {
      if (this.isActivityPage === false) {
        this.isActivityPage = true;
      }
    },
    // 進入發起消息頁
    gotoMessagePage() {
      if (this.isActivityPage === true) {
        this.isActivityPage = false;
      }
    },
    // 活動照片匯入
    selectDM(e) {
      // 圖片上傳後端
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.dmPicture = files[0];
      this.isAddPic = true;

      // 活動圖片預覽
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.picPreview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    // 訊息照片匯入
    selectMsgPic(e) {
      // 圖片上傳後端
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.msgPicture = files[0];
      this.isAddMsgPic = true;

      // 訊息圖片預覽
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.msgPicPreview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    // 活動截止日期
    deadlineDateChange() {
      this.event.registrationDeadline = this.event.registrationDeadline
        .toISOString()
        .substr(0, 10);
    },
    // 活動開始日期
    startTimeDateChange() {
      this.event.eventStartTime = this.event.eventStartTime
        .toISOString()
        .substr(0, 10);
    },
    // 刪除標籤方法
    handleClose(tag) {
      this.event.labelNameList.splice(this.event.labelNameList.indexOf(tag), 1);
      console.log("標籤被移除");
      this.tagsNumber = this.tagsNumber - 1;
    },
    // 新增標籤方法
    newTag() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 輸入完畢將標籤推送至標籤集合
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.event.labelNameList.push(inputValue);
        this.tagsNumber = this.tagsNumber + 1;
      }
      this.inputVisible = false;
      this.inputValue = "";
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
/* 發起模組 */
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
/* ---------------發布活動CSS--------------- */

.initialActivityPage {
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: 470px;
}
/* 活動標題CSS */
.activityTitle {
  font-size: 20px;
  grid-row: 2/3;
  grid-column: 1/3;
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
/* 活動描述CSS */
.activityDescription {
  margin-top: 5px;
  grid-row: 3/6;
  border: none;
  transition: all 0.1s ease;
  padding: 5px;
}
.activityDescription:focus {
  outline: 1.5px rgb(165, 101, 42) solid;
}
/* 活動圖片CSS */
.dm {
  position: relative;
  grid-row: 3/8;
  float: left;
  max-width: 240px;
  max-height: 200px;
  overflow: hidden;
  margin-top: 6px;
}

.dm label {
  height: 25px;
  width: 100px;
  position: absolute;
  left: 10px;
  top: 5px;
  margin: 0;
}
.dm label span,
.imageIcon {
  transition: color 0.2s;
  margin-left: 3px;
}
.dm label:hover span,
.dm label:hover .imageIcon {
  color: rgb(165, 101, 42);
}
.dmImg {
  position: absolute;
  width: 250px;
  height: 200px;
  object-fit: contain;
}
.havePic {
  display: none;
}
.noPic {
  display: block;
}
/* 活動人數 & 地點CSS */
.people {
  grid-row: 8/9;
  display: flex;
  margin-left: 72px;
  font-size: 14px;
}
.peopleDescription,
.locationDescription {
  line-height: 25px;
  margin-right: 3px;
}
.peopleSelect,
.locationInput {
  height: 25px;
  margin-left: 5px;
  border: 1px #ddd solid;
  border-radius: 5px;
  outline: none;
  color: rgb(105, 105, 105);
  background-color: #ddd;
  transition: all 0.2s ease;
}
.peopleSelect:focus,
.locationInput:focus {
  border: 1px rgb(165, 101, 42) solid;
}
.location {
  grid-row: 9/10;
  grid-column: 1/3;
  display: flex;
  height: 25px;
  margin-left: 44px;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
}
.locationInput {
  border: 1px #ddd solid;
  padding: 5px;
  width: 220px;
}
/* 報名截止時間 */
.deadline {
  grid-row: 10/11;
}
/* 活動時間 */
.time {
  grid-row: 11/12;
}
.deadline,
.time {
  display: flex;
  height: 25px;
  font-size: 14px;
  text-align: right;
}
.demonstration {
  width: 100px;
  line-height: 25px;
}
/* 更改選擇日期套件CSS */
.el-input__icon {
  line-height: 25px;
  margin-left: 5px;
}
.el-input--suffix .el-input__inner {
  width: 220px;
  height: 25px;
  background-color: #ddd;
  margin-left: 8px;
  border-radius: 5px;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border: 1px rgb(165, 101, 42) solid;
  outline: none;
}
.el-date-table td.today span {
  color: rgb(165, 101, 42);
}

.el-date-table td:hover span {
  color: rgb(165, 101, 42);
}
.el-date-table td.current:not(.disabled) span {
  background-color: rgb(165, 101, 42);
}
/* 標籤 */
.tag {
  grid-row: 12/13;
  grid-column: 1/3;
  display: flex;
  width: 70%;
  overflow: hidden;
}
.tag:hover {
  overflow: scroll;
}
/* scroll樣式 */
::-webkit-scrollbar {
  width: 0px;
  height: 5px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: #bbb;
}
.el-button,
.el-tag {
  height: 30px;
  margin-left: 10px;
}
.el-button {
  line-height: 5px;
}
.el-tag {
  line-height: 28px;
  color: rgb(165, 101, 42);
  background-color: white;
  border: 1px rgb(165, 101, 42) solid;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
}
.el-button:focus,
.el-button:hover {
  color: rgb(165, 101, 42);
  background-color: white;
  border: 1px rgb(165, 101, 42) solid;
}
.activityPush {
  position: absolute;
  right: 50px;
  bottom: 20px;
}
.pushActivityBtn {
  width: 60px;
  height: 30px;
  border: none;
  background-color: rgb(165, 101, 42);
  color: white;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.2s ease;
}
.pushActivityBtn:focus,
.pushActivityBtn:hover {
  outline: none;
  background-color: rgb(110, 70, 33);
}
/* ---------------發布消息CSS--------------- */

.initialMessagePage {
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: 470px;
}
/* 消息描述CSS */
.messageDescription {
  grid-row: 2/13;
  display: flex;
  border: none;
  transition: all 0.1s ease;
  padding: 5px;
}
.messageDescription:focus {
  outline: 1.5px rgb(165, 101, 42) solid;
}
/* 活動圖片CSS */
.msgPic {
  position: relative;
  grid-row: 2/13;
  grid-column: 2/3;
  float: left;
  max-width: 240px;
  max-height: 200px;
  overflow: hidden;
  margin-top: 6px;
}

.msgPic label {
  height: 25px;
  width: 100px;
  position: absolute;
  left: 0;
  top: 0px;
  margin: 0;
}
.msgPic label span,
.imageIcon {
  transition: color 0.2s;
  margin-left: 3px;
}
.msgPic label:hover span,
.msgPic label:hover .imageIcon {
  color: rgb(165, 101, 42);
}
.msgPicImg {
  position: absolute;
  width: 250px;
  height: 200px;
  object-fit: contain;
  margin-left: 10px;
}
.haveMsgPic {
  display: none;
}
.noMsgPic {
  display: block;
}
li {
  height: 40px;
}
.messagePush {
  position: absolute;
  right: 50px;
  bottom: 20px;
}
.pushMessageBtn {
  width: 60px;
  height: 30px;
  border: none;
  background-color: rgb(165, 101, 42);
  color: white;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.2s ease;
}
.pushMessageBtn:focus,
.pushMessageBtn:hover {
  outline: none;
  background-color: rgb(110, 70, 33);
}
</style>