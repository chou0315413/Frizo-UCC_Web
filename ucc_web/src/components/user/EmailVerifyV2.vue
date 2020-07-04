<template>
  <div class="emailVerifyPage">
    <div class="container">
      <div class="title">
        <h3>信箱認證</h3>
      </div>
      <div class="verifyCodeFont">
        <span>驗證碼</span>
      </div>
      <div class="verifyCodeArea">
        <input class="verifyCodeInput" type="text" />
        <button class="sendBtn" @click.native="sendVerifyCodeEmail">寄信</button>
      </div>
      <div class="tipsBtn">
        <button
          style="border:none;background-color:white;color:rgb(165, 101, 42)"
          @click="openCloseTips"
        >
          <font-awesome-icon icon="info-circle" size="lg" class="tipsIcon" />
        </button>
      </div>
      <div class="note">
        <span>驗證後可立即啟用發布活動、消息等功能</span>
      </div>
      <div class="submit">
        <button type="submit" class="submitBtn" @click.native="sendCode">送出</button>
      </div>
    </div>
    <!-- Focus tips 背景 -->
    <div class="background" v-if="isTipsOpen" @click="openCloseTips"></div>

    <!------------- 提示視窗 ------------->
    <div class="tips" v-if="isTipsOpen">
      <div class="closeTips">
        <font-awesome-icon
          icon="info-circle"
          size="lg"
          style="color:rgb(165, 101, 42);margin-left:10px;"
        />
        <button
          style="border:none;background-color:white;color:rgb(165, 101, 42);margin-right:10px;"
          @click="openCloseTips"
        >
          <font-awesome-icon icon="times-circle" size="lg" class="tipsIcon" />
        </button>
      </div>
      <div class="TipsFont">
        <span>信箱驗證</span>
      </div>
      <div class="line"></div>
      <div class="TipsFont2">
        <span>在驗證過後你可以擁有額外的功能：</span>
      </div>
      <div class="TipsFontMain">
        <span>發布貼文</span>
      </div>
      <div class="TipsFontMain">
        <span>和好友私訊聊天</span>
      </div>
      <div class="TipsFontMain">
        <span>調整網頁配色</span>
      </div>
    </div>

    <!-- <el-button type="primary" class="mb-4" @click.native="sendVerifyCodeEmail">寄信</el-button>
    <el-button type="primary" class="mt-4" @click.native="sendCode">送出</el-button>-->
  </div>
</template>

<script>
import { sendVerifyCodeEmail, checkVerifyCodeEmail } from "@/api/user";

export default {
  data() {
    return {
      verifyCode: "",
      isTipsOpen: false
    };
  },

  methods: {
    sendVerifyCodeEmail,
    checkVerifyCodeEmail,
    sendCode() {
      this.checkVerifyCodeEmail(this.verifyCode)
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 打開提示訊息
    openCloseTips() {
      if (this.isTipsOpen === false) {
        this.isTipsOpen = true;
      } else {
        this.isTipsOpen = false;
      }
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
.emailVerifyPage {
  height: 100vh;
  width: 100vw;
  padding-top: 70px;
}
.container {
  margin: auto;
  height: 400px;
  width: 55%;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
}
.title {
  font-weight: bold;
  grid-row: 1/4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.verifyCodeFont {
  grid-row: 4/5;
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
  font-size: 20px;
}
.verifyCodeArea {
  grid-row: 5/6;
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
  align-items: center;
}
.verifyCodeInput {
  height: 78%;
  width: 25vw;
  min-width: 150px;
  padding: 3px;
  border-radius: 5px;
  border: 0.8px rgb(128, 128, 128) solid;
  transition: all 0.2s ease;
}
.verifyCodeInput:focus {
  outline: none;
  border: 1.2px rgb(165, 101, 42) solid;
}
.sendBtn {
  border: none;
  background-color: white;
  color: rgb(165, 101, 42);
  margin-left: 5px;
}
.sendBtn:focus {
  outline: none;
}
.tipsBtn {
  grid-row: 6/7;
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
  align-items: center;
  color: rgb(165, 101, 42);
}
.tipsBtn button:focus,
.closeTips button:focus {
  outline: none;
}
.tipsIcon {
  cursor: pointer;
}
.note {
  display: flex;
  justify-content: flex-start;
  margin-left: 25%;
  align-items: center;
}
.submit {
  grid-row: 8/12;
  display: flex;
  justify-content: center;
  align-items: center;
}
.submitBtn {
  border: none;
  background-color: rgb(165, 101, 42);
  width: 28.5vw;
  color: white;
  border-radius: 5px;
  height: 30px;
  margin-left: 10px;
  transition: all 0.2s ease;
}
.submitBtn:hover {
  background-color: rgb(107, 67, 30);
}
/* ------------------ tips CSS ------------------ */
.tips {
  height: 250px;
  width: 35vw;
  background-color: #fff;
  border-radius: 10px;
  margin-top: -325px;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  position: absolute;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
}
.closeTips {
  grid-row: 1/2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
/* 提視窗裡的信箱驗證字樣 */
.TipsFont {
  font-size: 23px;
  color: black;
}
.TipsFont2 {
  font-size: 18px;
  margin-top: -12px;
  color: black;
}
.line {
  height: 1.5px;
  width: 30vw;
  display: flex;
  background-color: gray;
  margin: 5px auto;
}
.TipsFontMain {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(165, 101, 42);
  font-weight: bold;
  margin-top: 5px;
}
</style>