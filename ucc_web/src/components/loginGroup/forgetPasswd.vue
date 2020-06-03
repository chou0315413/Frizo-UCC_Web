<template>
  <!-- <div class="forgetPasswd"> -->
  <!-- <div
      class="modal fade"
      id="forgetPasswd"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      ref="modal"
  >-->
  <!-- <div class="modal-dialog modal-dialog-centered" role="document"> -->
  <div class="forgetPasswdDiv">
    <!-- <div class="modal-body"> -->

    <div class="title">
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
    </div>

    <!-- </div> -->
  </div>
  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->
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
      resetIsClick: false
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forgetPasswdDiv {
  height: 500px;
  width: 470px;
  background-image: url(../../assets/signInBackground/login.jpg);
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.title {
  grid-column: 1/9;
  grid-row: 2/3;
}

.email {
  grid-column: 2/6;
  grid-row: 3/4;
}

.sendVerification {
  grid-column: 6/8;
  grid-row: 3/4;
}

.verification {
  grid-column: 2/8;
  grid-row: 4/5;
}

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
.alertDiv {
  font-size: 10px;
  color: red;
  font-weight: bold;
  grid-column: 5/8;
  grid-row: 6/7;
  align-self: end;
  justify-self: end;
}
</style>
