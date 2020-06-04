<template>
  <!-- 動態轉換CSS -->
  <div :class="contentCssIsActivity?'postActivity':'postMessage'">
    <!-- 本頁使用原生CSS-grid，未來有較好的寫法再另外更新。 -->
    <!-- 動態轉換CSS -->
    <div class="container" :class="contentCssIsActivity ? 'activityMode' : 'messageMode' ">
      <div class="topTitle">
        <!-- 未來可以增加transition變化 -->
        <h4>{{title}}</h4>
      </div>

      <!-- divider邊線 -->
      <div class="divider"></div>

      <!-- 左側選單 -->
      <div class="sidebar">
        <div class="list-group mt-3" id="list-tab" role="tablist">
          <a
            class="list-group-item list-group-item-action active listCSS"
            id="list-activity-list"
            data-toggle="list"
            href="#list-activity"
            role="tab"
            aria-controls="activity"
            @click="activityChangeMode"
          >發佈活動</a>
          <a
            class="list-group-item list-group-item-action listCSS"
            id="list-message-list"
            data-toggle="list"
            href="#list-message"
            role="tab"
            aria-controls="message"
            @click="messageChangeMode"
          >發佈消息</a>
        </div>
      </div>
      <!-- 中間內容轉換 -->
      <div class="content">
        <div class="tab-content" id="nav-tabContent">
          <!-- 發佈活動 -->
          <div
            class="tab-pane fade show active activity"
            id="list-activity"
            role="tabpanel"
            aria-labelledby="list-activity-list"
          >
            <div class="step">STEP.1 上傳活動宣傳照</div>

            <!-- <img :src="dm" class="dmImg" /> -->
            <div class="dm">
              <label :class="isAddPic ? 'havePic' : 'noPic' ">
                <input type="file" style="display:none;" accept="image/*" @change="selectDM" />
                <!-- <input type="file" style="display:none;" v-on:change="selectDM" /> -->
                <font-awesome-icon icon="plus-square" size="lg" class="imageIcon" />
                <span>上傳照片</span>
              </label>
              <img :src="this.picPreview" class="dmImg" :class="isAddPic ? 'noPic' : 'havePic'" />
            </div>
            <div class="step">STEP.2 輸入活動名稱、活動內容介紹</div>
            <div class="title">
              <el-input placeholder="請輸入活動名稱" v-model="event.title" maxlength="20" show-word-limit>
                <template slot="prepend">活動名稱</template>
              </el-input>
            </div>
            <div class="description mt-3">
              <el-input
                type="textarea"
                placeholder="請輸入活動內容"
                v-model="event.description"
                rows="25"
                resize="none"
              ></el-input>
            </div>
            <div class="step">STEP.3 輸入活動其他相關資訊</div>
            <div class="otherInformation">
              <div class="peopleLimit">
                <el-input v-model="event.maxNumberOfPeople" type="number" min="0">
                  <template slot="prepend">人數上限</template>
                </el-input>
              </div>
              <div class="fee">
                <el-input v-model="event.fee" type="number" min="0">
                  <template slot="prepend">費用</template>
                </el-input>
              </div>
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
                <!-- <button @click="getActivityDeadline">test</button> -->
              </div>
              <div class="place">
                <el-input placeholder="請輸入活動地點" v-model="event.place" maxlength="20">
                  <template slot="prepend">地點</template>
                </el-input>
              </div>
              <div class="time">
                <span class="demonstration">選擇活動開始日期</span>
                <el-date-picker
                  v-model="event.eventStartTime"
                  type="date"
                  placeholder="選擇日期"
                  @change="startTimeDateChange"
                >
                  <template slot="prepend">選擇活動開始日期</template>
                </el-date-picker>
                <!-- <button @click="getActivityStartTime">test</button> -->
              </div>
              <div class="tag"></div>
            </div>
            <div class="step">STEP.4 輸入活動標籤類別</div>
            <div>
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
              >新的標籤</el-button>
            </div>
            <div class="step">STEP.5 檢查活動內容並發佈活動</div>
            <div class="activityPush">
              <el-button type="primary" round class="ml-3" @click.prevent="sendCreateRequest">發佈活動</el-button>
            </div>
          </div>
          <!-- 發佈消息 -->
          <div
            class="tab-pane fade show message"
            id="list-message"
            role="tabpanel"
            aria-labelledby="list-message-list"
          >
            <!-- <div class="step">請輸入新消息的主題</div> -->
            <div class="msgTop">
              <div class="msgTopTitle">
                <el-input placeholder="請輸入主題" v-model="messageTitle" clearable></el-input>
              </div>
              <div class="msgTopPhoto">
                <div class="msgTopPhotoBorder">
                  <label>
                    <input type="file" style="display:none;" />
                    <font-awesome-icon icon="image" size="lg" class="imageIcon" />
                    <span>上傳照片</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="messageDescription mt-3">
              <el-input
                type="textarea"
                placeholder="請輸入新消息內容"
                v-model="messageDescription"
                rows="10"
                resize="none"
              ></el-input>
            </div>
            <div class="messagePush mt-3">
              <div class="messagePushBtn">
                <el-button type="primary" round class="ml-3">發佈消息</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createEvent } from "@/api/event";

export default {
  name: "postActivityAndMessage",
  data() {
    return {
      // 判斷目前content是發佈活動或是發佈消息
      contentCssIsActivity: true,
      // title文字會隨著sidebar更動
      title: "發佈活動",
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
      // 訊息資料
      messageTitle: "",
      messageDescription: "",
      // 標籤資料
      tagsNumber: 0,
      inputVisible: false,
      inputValue: "",
      // 將來接上後端時需標註引號
      isAddPic: false,
      picPreview: null
    };
  },

  methods: {
    // 送出活動發起請求
    sendCreateRequest() {
      createEvent(this.event)
        .then(resp => {
          console.log(resp.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    // 照片匯入
    selectDM(e) {
      // 圖片上傳後端
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.event.dmPicture = files[0];
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
    },

    deadlineDateChange() {
      this.event.registrationDeadline = this.event.registrationDeadline
        .toISOString()
        .substr(0, 10);
    },
    startTimeDateChange() {
      this.event.eventStartTime = this.event.eventStartTime
        .toISOString()
        .substr(0, 10);
    },

    // sidebar使用之methods
    activityChangeMode() {
      // this.title = "發佈活動";
      if (this.contentCssIsActivity !== true) {
        this.contentCssIsActivity = true;
      }
    },
    messageChangeMode() {
      // this.title = "發佈消息";
      if (this.contentCssIsActivity == true) {
        this.contentCssIsActivity = false;
      }
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
/* 最外圍大框使用二擇一CSS */
.postActivity {
  height: 1180px;
  background-color: #eeeeee;
}
.postMessage {
  height: 100vh;
  background-color: #eeeeee;
}

/* container使用二擇一CSS */
.activityMode {
  height: 1150px;
  width: 800px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 10vh 5px 1fr;
  border: 1px solid #dddddd;
  box-shadow: 0px 0px 1px #000000;
  background-color: #ffffff;
}
.messageMode {
  position: relative;
  top: 30px;
  height: 450px;
  width: 800px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 10vh 5px 1fr;
  border: 1px solid #dddddd;
  box-shadow: 0px 0px 1px #000000;
  background-color: #ffffff;
}

/* activityMode裡元件使用之CSS */
.topTitle {
  grid-column: 1/11;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar {
  grid-column: 1/11;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-group {
  flex-direction: row;
}
.listCSS {
  padding: 0px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 150px;
  border-radius: 0.25rem;
}
.list-group-item.active {
  background-color: orange;
  color: white;
  border: orange;
  margin-top: 0;
}
.list-group-item {
  border: 1px orange solid;
  color: orange;
}
.list-group-item:hover {
  background-color: rgb(245, 187, 111);
  color: white;
  border: none;
}
.list-group-item + .list-group-item.active {
  margin-top: 0;
}
.list-group-item + .list-group-item {
  border-top-width: 1px;
}
.el-input-group__append,
.el-input-group__prepend,
.el-input .el-input__count {
  color: orange;
}
.el-input .el-input__count {
  color: orange;
}
.el-date-editor .el-range-separator {
  padding: 0;
}
.el-textarea__inner {
  height: 30vh;
}
h4 {
  margin: 0;
  padding: 0;
}

.divider {
  grid-column: 1/11;
  grid-row: 2/3;
  border-bottom: 1px #a5a5a5 solid;
}

.content {
  grid-column: 3/9;
  grid-row: 3/4;
}

/* 內容定位 */
.activity {
  grid-column: 3/9;
  grid-row: 3/4;
}
.message {
  grid-column: 3/9;
  grid-row: 3/4;
}
/* 內容定位 */

.step {
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 6px;
  height: 5vh;
  line-height: 5vh;
  text-align: start;
  background-image: linear-gradient(90deg, #ff9100 0%, rgb(255, 197, 131) 100%);
  border-radius: 0.5rem;
  color: white;
}
.noPic {
  display: block;
}
.havePic {
  display: none;
}

.dm {
  color: orange;
  grid-column: 3/9;
  height: 20vh;
  border-radius: 3rem;
  border: 2px orange dashed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dmImg {
  height: 100%;
  width: 100%;
  border-radius: 3rem;
}

.dm span {
  display: none;
  font-size: 20px;
}
.dm:hover span {
  display: inline-block;
  animation: fadein 0.1s ease-in;
}
/* 上傳圖片文字出現的動畫 */
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
.dm label {
  height: 30px;
  width: 150px;
  font-size: 25px;
  cursor: pointer;
}

.otherInformation {
  height: 300px;
  display: grid;
  grid-template-columns: 0.5fr 5px 0.5fr;
  grid-template-rows: repeat(4, 1fr);
}

.peopleLimit {
  grid-column: 1/2;
  grid-row: 1/2;
}

.fee {
  grid-column: 3/4;
  grid-row: 1/2;
}

.deadline {
  grid-column: 1/4;
  grid-row: 2/3;
}

.place {
  grid-column: 1/4;
  grid-row: 3/4;
}

.demonstration {
  margin-right: 5px;
}

.time {
  grid-column: 1/4;
  grid-row: 4/5;
}
.msgTop {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  margin-top: 20px;
}
.msgTopTitle {
  display: flex;
  grid-column: 1/3;
  grid-row: 1/2;
}
.msgTopPhoto {
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
}
.messagePush {
  display: grid;
  grid-template-columns: 0.65fr 0.35fr;
  grid-template-rows: repeat(1, 1fr);
}

.messagePushBtn {
  grid-column: 1/3;
  grid-row: 1/2;
}

.imageIcon {
  margin-right: 5px;
}

.msgTopPhoto label {
  margin: 0;
  cursor: pointer;
}
.msgTopPhotoBorder {
  cursor: pointer;
  margin: 0;
  border: 1px orange solid;
  border-radius: 1rem;
  width: 9vw;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .msgTopPhoto label:hover {
  transform: scale(1.2, 1.2);
  transition: 0.5s;
} */

/* 標籤CSS */
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/* 標籤CSS */
</style>