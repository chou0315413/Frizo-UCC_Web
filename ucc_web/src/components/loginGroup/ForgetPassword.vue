<template>
  <div class="forgetPasswdDiv">
    <div class="goBack">
      <img @click.prevent="goBack" class="img100" src="@/assets/loginGroup/left-arrow.png" />
    </div>
    <div class="goClose">
      <img class="img100" src="@/assets/loginGroup/close.png" />
    </div>
    <div class="UCCLogo">
      <img class="logo" src="@/assets/UCC-Classic-PNG.png" />
    </div>
    <div class="UCCTitle">取回帳號</div>
    <div class="emailText titleText">請輸入你的E-mail信箱</div>
    <div class="email">
      <input type="text" id="email" class="inputClass" v-model="email" />
    </div>
    <div class="sendVerification">
      <!-- <el-button type="primary" round :loading="sendEmailIsClick===true" @click="sendVerifyEmail">送出</el-button> -->
      <button class="sendVerifyBtn" @click.prevent="sendVerifyEmail">送出</button>
    </div>
    <div class="verificationText titleText">請輸入驗證碼</div>
    <div class="verification">
      <input type="text" id="verifyCode" class="inputClass" v-model="verifyCode" />
    </div>
    <div class="passwordText titleText">新密碼</div>
    <div class="password">
      <input type="password" id="userPassword" class="inputClass" v-model="password" />
    </div>
    <div class="confirmPasswordText titleText">確認新密碼</div>
    <div class="confirmPassword">
      <input type="password" id="reUserPassword" class="inputClass" v-model="rePassword" />
    </div>
    <div class="alertDiv">{{alertText}}</div>
    <div class="forgetPasswordBtn">
      <!-- <el-button type="primary" round :loading="resetIsClick===true" @click="resetPwd">確認</el-button> -->
      <button class="resetBtn" @click="resetPwd">確認</button>
    </div>
    <!-- <div class="title">
      <h4>忘記密碼</h4>
    </div>

    <div class="email">
      <input
        type="text"
        id="email"
        class="form-control textLetterSpacing"
        placeholder="請輸入您的 E-mail 信箱"
        aria-describedby="inputGroup-sizing-sm"
        v-model="email"
      />
    </div>

    <div class="sendVerification">
      <el-button type="primary" round :loading="sendEmailIsClick===true" @click="sendVerifyEmail">送出</el-button>
    </div>

    <div class="verification">
      <input
        type="text"
        id="verifyCode"
        class="form-control textLetterSpacing"
        placeholder="請輸入驗證碼"
        aria-describedby="inputGroup-sizing-sm"
        v-model="verifyCode"
      />
    </div>

    <div class="passwd">
      <input
        type="password"
        id="userPassword"
        class="form-control textLetterSpacing"
        placeholder="請輸入您欲設定的密碼"
        aria-describedby="inputGroup-sizing-sm"
        v-model="password"
      />
    </div>

    <div class="confirmPasswd">
      <input
        type="password"
        id="reUserPassword"
        class="form-control textLetterSpacing"
        placeholder="請重複輸入您設定的密碼"
        aria-describedby="inputGroup-sizing-sm"
        v-model="rePassword"
      />
    </div>

    <div class="notice">請使用英文字母及阿拉伯數字和部分特殊符號</div>

    <div class="alertDiv">{{alertText}}</div>

    <div class="forgetPasswdBtn">
      <el-button type="primary" round :loading="resetIsClick===true" @click="resetPwd">確認</el-button>
    </div>-->
  </div>
</template>

<script>
import { sendForgotPasswordEmailVerify, resetPassword } from "@/api/auth";

export default {
  name: "forgetPasswd",

  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
      verifyCode: "",
      alertText: "",
      sendEmailIsClick: false,
      resetIsClick: false,
      // 回上一頁
      viewValue: "Login",
      closeValue: "close"
    };
  },

  methods: {
    sendVerifyEmail() {
      // 判斷有無輸入Email欄位
      if (this.email == "") {
        this.alertText = "未輸入Email信箱";
        return;
      } else {
        // 如果有輸入Email欄位，判斷使用者是否輸入正確Email格式。
        let chackEmailStyle = this.email;
        let at = "@";
        let haveAt = false; // eslint-disable-line no-unused-vars
        for (let i = 0; i < chackEmailStyle.length; i++) {
          if (chackEmailStyle.charAt(i) == at) {
            haveAt = true;
          }
        }
        if (haveAt == false) {
          this.alertText = "Email格式錯誤";
          return;
        }
        // 如上述都無錯誤，送出Email驗證碼。
        sendForgotPasswordEmailVerify(this.email)
          .then(resp => {
            this.alertText = "已送出認證信";
            console.log(resp.data);
          })
          .catch(error => {
            this.alertText = "發生錯誤";
            console.log(error);
          });
      }
    },

    resetPwd() {
      // 判斷有無輸入資料欄位。
      if (this.email == "" || this.password == "" || this.verifyCode == "") {
        this.alertText = "資料輸入不完整";
        return;
      }
      //   判斷密碼輸入有無一致。
      if (this.password !== this.rePassword) {
        this.alertText = "密碼二次輸入不一致";
        return;
      }

      //   如上續項目有達成，執行下面重設密碼之動作。
      let request = {
        email: this.email,
        password: this.password,
        verifyCode: this.verifyCode
      };

      resetPassword(request)
        .then(resp => {
          if (resp.data.success) {
            this.alertText = "密碼重製成功";
            window.location.reload();
          } else {
            console.log(resp.data.message);
            this.alertText = "驗證碼輸入錯誤";
          }
          console.log(resp.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    goBack() {
      // viewValue是在父元件on監聽的方法
      // 第二個引數this.viewValue是需要傳的值
      this.$emit("viewValue", this.viewValue);
    }

    // goClose() {
    //   // viewValue是在父元件on監聽的方法
    //   // 第二個引數this.viewValue是需要傳的值
    //   this.$emit("closeValue", this.closeValue);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forgetPasswdDiv {
  height: 480px;
  width: 400px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(12, 1fr);
  border-radius: 10px;
}

.goBack {
  position: relative;
  left: 5px;
  top: 5px;
  grid-row: 1/2;
  grid-column: 1/2;
}

.goClose {
  position: relative;
  top: 7px;
  left: -7px;
  grid-row: 1/2;
  grid-column: 10/11;
}

.img100 {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.UCCTitle {
  grid-column: 6/10;
  grid-row: 2/3;
  margin-left: -15px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.UCCLogo {
  grid-column: 4/6;
  grid-row: 1/3;
  margin-right: 35px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.logo {
  height: 45px;
  width: 75px;
}

.titleText {
  font-size: 16px;
  font-weight: bold;
}

.emailText {
  grid-row: 3/4;
  grid-column: 2/7;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.inputClass {
  width: 100%;
  height: 80%;
  border: none;
  background-color: rgb(236, 236, 236);
  letter-spacing: 1px;
  border-radius: 5px;
}

.email {
  grid-row: 4/5;
  grid-column: 2/10;
}

.sendVerification {
  grid-row: 5/6;
  grid-column: 2/10;
}

.sendVerifyBtn {
  height: 80%;
  width: 100%;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: #a1662a;
  color: #fff;
  font-size: 18px;
}

.verificationText {
  grid-row: 6/7;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.verification {
  position: relative;
  top: -10px;
  grid-row: 7/8;
  grid-column: 2/10;
}

.passwordText {
  position: relative;
  top: -10px;
  grid-row: 8/9;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.password {
  position: relative;
  top: -20px;
  grid-row: 9/10;
  grid-column: 2/10;
}

.confirmPasswordText {
  position: relative;
  top: 20px;
  grid-row: 9/10;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.confirmPassword {
  grid-row: 10/11;
  grid-column: 2/10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.alertDiv {
  font-size: 14px;
  color: red;
  font-weight: bold;
  grid-column: 6/10;
  grid-row: 11/12;
  align-self: flex-start;
  justify-self: flex-end;
}

.forgetPasswordBtn {
  grid-column: 2/10;
  grid-row: 11/13;
  display: flex;
  justify-content: center;
  align-items: center;
}

.resetBtn {
  height: 40%;
  width: 100%;
  border-radius: 15px;
  border: none;
  outline: none;
  background-color: #a1662a;
  color: #fff;
  font-size: 18px;
}

button:hover {
  background-color: #be854c;
}
/* 初版------------------------------------------------------------------------ */

.title {
  grid-column: 1/9;
  grid-row: 2/3;
}

/* .email {
  grid-column: 2/6;
  grid-row: 3/4;
} */

/* .sendVerification {
  grid-column: 6/8;
  grid-row: 3/4;
} */

/* .verification {
  grid-column: 2/8;
  grid-row: 4/5;
} */

.passwd {
  grid-column: 2/8;
  grid-row: 5/6;
}

.confirmPasswd {
  grid-column: 2/8;
  grid-row: 6/7;
}

.notice {
  grid-column: 2/8;
  grid-row: 5/6;
  justify-self: flex-end;
  align-self: flex-end;
  position: relative;
  font-size: 10px;
  margin: 0 1px 2px 0;
}

.forgetPasswdBtn {
  grid-column: 1/9;
  grid-row: 7/8;
}

.forgetPasswdDivPading {
  position: relative;
  margin: auto;
  width: 350px;
}

h4 {
  margin-bottom: 15px;
}

.forgetPasswdPage {
  position: relative;
  height: 460px;
  box-shadow: 0 0 10px #000000;
  padding-top: 60px;
}

.inputBorder {
  border: 1px #747474 solid;
}
/* .alertDiv {
  font-size: 10px;
  color: red;
  font-weight: bold;
  grid-column: 5/8;
  grid-row: 6/7;
  align-self: end;
  justify-self: end;
} */
</style>
