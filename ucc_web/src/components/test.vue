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
                <input type="file" style="display:none;" />
                <font-awesome-icon icon="plus-square" size="lg" class="imageIcon" />
                <span>上傳照片</span>
              </label>
              <img
                src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646034"
                :class="isAddPic ? 'noPic' : 'havePic' "
              />
            </div>

            <div class="step">STEP.2 輸入活動名稱、活動內容介紹</div>
            <div class="title">
              <el-input placeholder="請輸入活動名稱" v-model="activityName" maxlength="20" show-word-limit>
                <template slot="prepend">活動名稱</template>
              </el-input>
            </div>
            <div class="description mt-3">
              <el-input
                type="textarea"
                placeholder="請輸入活動內容"
                v-model="description"
                rows="25"
                resize="none"
              ></el-input>
            </div>
            <div class="step">STEP.3 輸入活動其他相關資訊</div>
            <div class="otherInformation">
              <div class="peopleLimit">
                <el-input v-model="peopleLimit" type="number" min="0">
                  <template slot="prepend">人數上限</template>
                </el-input>
              </div>
              <div class="cost">
                <el-input v-model="cost" type="number" min="0">
                  <template slot="prepend">費用</template>
                </el-input>
              </div>
              <div class="deadline">
                <span class="demonstration">活動報名截止日</span>
                <el-date-picker v-model="deadline" type="date" placeholder="選擇日期">
                  <template slot="prepend">活動報名截止日</template>
                </el-date-picker>
              </div>
              <div class="place">
                <el-input placeholder="請輸入活動地點" v-model="place" maxlength="20">
                  <template slot="prepend">地點</template>
                </el-input>
              </div>
              <div class="time">
                <span class="demonstration">選擇活動日期</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="開始日期"
                  end-placeholder="結束日期"
                ></el-date-picker>
              </div>
              <div class="tag"></div>
            </div>
            <div class="step">STEP.4 輸入活動標籤類別</div>
            <div>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
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
              <el-button type="primary" round class="ml-3">發佈活動</el-button>
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
export default {
  data() {
    return {
      // 判斷目前content是發佈活動或是發佈消息
      contentCssIsActivity: true,
      // title文字會隨著sidebar更動
      title: "發佈活動",
      // 活動資料
      dm:
        "data:image/jpeg;base64,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",
      activityName: "",
      description: "",
      peopleLimit: 0,
      cost: 0,
      deadline: "",
      place: "",
      // 訊息資料
      messageTitle: "",
      messageDescription: "",
      // 標籤資料
      dynamicTags: [],
      tagsNumber: 0,
      inputVisible: false,
      inputValue: "",
      // 將來接上後端時需標註引號
      isAddPic: false
    };
  },

  name: "userPage"
};
</script>

<style scoped>
.userPage {
  height: 100vh;
}

/* container使用二擇一CSS */
.activityMode {
  height: 1300px;
  width: 800px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 10vh 5px 1fr;
  border: 1px solid #dddddd;
  box-shadow: 0px 0px 1px #000000;
  background-color: #ffffff;
}
.messageMode {
  height: 500px;
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
.dm span {
  display: none;
  font-size: 20px;
}
.dm:hover span {
  display: inline-block;
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

.cost {
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

.userBackgroundPhoto {
  grid-column: 1/9;
  grid-row: 1/4;
  background-color: aqua;
}
</style>