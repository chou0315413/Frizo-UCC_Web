<template>
  <!-- 未來class可改成modal -->
  <div class="loginGroup">
    <div class="loginGroupDiv">
      <div class="UCCLogo">
        <img class="logo" src="@/assets/UCC-Classic-PNG.png" />
      </div>
      <div class="UCCTitle">登入UCC</div>
      <div class="emailText titleText">E-mail信箱</div>
      <div class="email">
        <input
          type="text"
          :class="{inputError : inputIsError}"
          class="inputClass"
          v-model="email"
          v-on:keyup.13="login"
        />
      </div>
      <div class="emailAlertText alertText">{{alertDiv.emailAlertText}}</div>
      <div class="passwordText titleText">密碼</div>
      <div class="passwd">
        <input
          type="password"
          :class="{inputError : inputIsError}"
          class="inputClass"
          v-model="password"
          v-on:keyup.13="login"
        />
      </div>
      <div class="passwdAlertText alertText">{{alertDiv.passwdAlertText}}</div>
      <div class="forgetPasswd">
        <span @click.prevent="goForgetPassword">忘記密碼</span>
      </div>
      <div class="registerTitle">還沒有帳號嗎?</div>
      <div class="register">
        <span @click.prevent="goRegister">註冊</span>
      </div>
      <div class="loginBtn">
        <button @click.prevent="login">登入</button>
      </div>
      <div class="leftDivider">
        <hr />
      </div>
      <div class="dividerText titleText">或者</div>
      <div class="rightDivider">
        <hr />
      </div>
      <div class="facebookBtn">
        <a
          href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <img class="otherWayLoginBtn" src="@/assets/loginGroup/facebook.png" />
        </a>
      </div>
      <div class="googleBtn">
        <a
          href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <img class="otherWayLoginBtn" src="@/assets/loginGroup/google.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { signin } from "@/api/auth";
import { mapActions } from "vuex";
import jquery from "jquery";

export default {
  data() {
    return {
      dialogVisible: false,
      onLoading: "true",
      isLoading: "false",
      email: "",
      password: "",
      token: {
        tokenType: "",
        accessToken: ""
      },
      alertDiv: {
        emailAlertText: "",
        passwdAlertText: ""
      },
      inputIsError: false,
      loginBtnIsClick: false,
      // 切換至註冊頁面或忘記密碼頁面
      register: "Register",
      forgetPassword: "ForgetPassword"
    };
  },

  methods: {
    closeModal() {
      jquery("#Login").modal("toggle");
    },

    noGoToLogin() {
      this.loginBtnIsClick = false;
    },

    login() {
      this.isLoading = "true";
      var userInfo = {
        email: this.email,
        password: this.password
      };
      var jsonData = userInfo;
      signin(jsonData)
        .then(resp => {
          if (resp.data.success) {
            this.token.tokenType = resp.data.result.tokenType;
            this.token.accessToken = resp.data.result.accessToken;
            const token = this.token;
            this.storeToken(token);
            this.closeModal();
            location.reload();
          } else {
            this.isLoading = "false";
            this.inputIsError = true;
            this.alertDiv.alertText = resp.data.message;
          }
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = "false";
          this.inputIsError = true;
          if (err.response.data.message == "帳號不存在") {
            this.alertDiv.emailAlertText = err.response.data.message;
            this.alertDiv.passwdAlertText = "";
            return;
          }
          if (err.response.data.message == "密碼輸入錯誤。") {
            this.alertDiv.emailAlertText = "";
            this.alertDiv.passwdAlertText = "密碼輸入錯誤";
          }
          this.alertDiv.emailAlertText = err.response.data.result.email;
          this.alertDiv.passwdAlertText = err.response.data.result.password;
        });
    },

    ...mapActions({
      storeToken: "auth/login"
    }),

    goRegister() {
      // viewValue是在父元件on監聽的方法
      // 第二個引數this.viewValue是需要傳的值
      this.$emit("viewValue", this.register);
    },

    goForgetPassword() {
      // viewValue是在父元件on監聽的方法
      // 第二個引數this.viewValue是需要傳的值
      this.$emit("viewValue", this.forgetPassword);
    }
  },

  name: "loginGroup"
};
</script>

<style scoped>
.loginGroupDiv {
  height: 480px;
  width: 400px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(12, 1fr);
  border-radius: 10px;
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

.emailText {
  grid-column: 2/5;
  grid-row: 3/4;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.titleText {
  font-size: 16px;
  font-weight: bold;
}

.email {
  grid-column: 2/10;
  grid-row: 4/5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.inputClass {
  width: 100%;
  height: 80%;
  border: none;
  background-color: rgb(236, 236, 236);
  letter-spacing: 1px;
  border-radius: 5px;
}

.alertText {
  font-size: 10px;
  color: red;
  font-weight: bold;
}

.emailAlertText {
  grid-column: 6/10;
  grid-row: 5/6;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.passwdAlertText {
  text-align: center;
  grid-column: 6/10;
  grid-row: 7/8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.passwordText {
  grid-column: 2/4;
  grid-row: 5/6;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.passwd {
  grid-column: 2/10;
  grid-row: 6/7;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.forgetPasswd {
  grid-row: 7/8;
  grid-column: 2/4;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.registerTitle {
  grid-row: 8/9;
  grid-column: 6/9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.register {
  grid-row: 8/9;
  grid-column: 9/10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginBtn {
  position: relative;
  top: -5px;
  grid-column: 2/10;
  grid-row: 9/10;
  /* 解決重疊問題 */
  z-index: 1;
}

.loginBtn button {
  height: 100%;
  width: 100%;
  border-radius: 15px;
  border: none;
  background-color: #a1662a;
  color: #fff;
  font-size: 18px;
}

span {
  color: #a1662a;
  cursor: pointer;
}

hr {
  border: 0;
  border-bottom: 2px solid rgb(236, 236, 236);
}

.leftDivider {
  grid-column: 1/5;
  grid-row: 10/11;
}

.dividerText {
  grid-column: 5/7;
  grid-row: 10/11;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rightDivider {
  grid-column: 7/11;
  grid-row: 10/11;
}

.facebookBtn {
  grid-column: 5/6;
  grid-row: 11/12;
  margin-right: 5px;
}

.googleBtn {
  grid-column: 6/7;
  grid-row: 11/12;
  margin-left: 5px;
}

.otherWayLoginBtn {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
</style>