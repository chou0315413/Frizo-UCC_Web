<template>
  <!-- 未來class可改成modal -->
  <div class="login">
    <!-- <div class="background" @click="noGoToLogin"></div> -->
    <!-- <div class="loginDivCenter"> -->
    <div class="loginDiv">
      <div class="UCCTitle mt-3">
        <h4 class="mt-3">歡迎回到UCC.</h4>
        <h5>登入帳號開始享受UCC吧</h5>
      </div>
      <div class="email">
        <!-- inputError部分如果為true則background為紅色 -->
        <!-- 監聽使用者按下Enter按鍵 -->
        <input
          type="text"
          :class="{inputError : inputIsError}"
          class="form-control textLetterSpacing"
          placeholder="輸入您的 E-mail 信箱"
          aria-describedby="inputGroup-sizing-sm"
          v-model="email"
          v-on:keyup.13="login"
        />
      </div>
      <div class="emailAlertText alertText">{{alertDiv.emailAlertText}}</div>
      <div class="passwd">
        <input
          type="password"
          :class="{inputError : inputIsError}"
          class="form-control textLetterSpacing"
          placeholder="輸入您的密碼"
          aria-describedby="inputGroup-sizing-sm"
          v-model="password"
          v-on:keyup.13="login"
        />
      </div>
      <!-- <div class="forgetPasswd">
        <a href="#" data-toggle="modal" data-target="#forgetPasswd">忘記密碼</a>
      </div>-->
      <div class="passwdAlertText alertText">{{alertDiv.passwdAlertText}}</div>
      <div class="loginBtn">
        <el-button type="primary" round :loading="onLoading===isLoading" @click="login">登入</el-button>
      </div>
      <div class="otherLoginWay">
        <h6 class="mt-2">其他登入方式</h6>
      </div>

      <div class="googleLogin">
        <!-- 先以a為連結，後續可以更改連結方式 -->
        <a
          href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <button type="button" class="btn btn-outline-secondary mb-2 otherLoginBtn">Google登入</button>
        </a>
      </div>
      <div class="facebookLogin">
        <a
          href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <button type="button" class="btn btn-outline-secondary mb-3 otherLoginBtn">Facebook登入</button>
        </a>
      </div>
      <div class="getUCCAccount">
        <h6 class="mt-3">
          沒有帳號嗎? 快去註冊吧!
          <!-- <span>
            <a href="#" data-toggle="modal" data-target="#register"></a>
          </span>-->
        </h6>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { signin } from "@/api/auth";
// import { authenticated } from "@/utils/AuthStore";
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
      loginBtnIsClick: false
    };
  },

  methods: {
    closeModal() {
      jquery("#Login").modal("toggle");
    },

    noGoToLogin() {
      this.loginBtnIsClick = false;
    },

    // goToLogin() {
    //   this.loginBtnIsClick = true;
    // },

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
    })
  },

  name: "LogIn"
};
</script>

<style scoped>
/* .login {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  z-index: 7;
  display: none;
} */

/* .noLogin {
  display: none;
} */

/* .background {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-color: #000000;
  opacity: 0.5;
  grid-column: 1/2;
  grid-row: 1/2;
} */

/* .loginDivCenter {
  position: relative;
  height: 500px;
  width: 470px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  grid-column: 1/2;
  grid-row: 1/2;
} */

.loginDiv {
  height: 500px;
  width: 470px;
  background-color: #ffffff;
  background-image: url(../../assets/signInBackground/login.jpg);
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.UCCTitle {
  grid-column: 1/9;
  grid-row: 1/2;
}

.email {
  grid-column: 2/8;
  grid-row: 2/3;
  margin-top: 5px;
  /* 解決區域重疊覆蓋問題 */
  z-index: 1;
}

.passwd {
  grid-column: 2/8;
  grid-row: 3/4;
  margin-top: 10px;
  /* 解決區域重疊覆蓋問題 */
  z-index: 1;
}

.alertText {
  font-size: 10px;
  color: red;
  font-weight: bold;
}

.emailAlertText {
  grid-column: 5/9;
  grid-row: 2/3;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.passwdAlertText {
  position: relative;
  top: -10px;
  text-align: center;
  grid-column: 5/9;
  grid-row: 4/5;
}

/* .forgetPasswd {
  position: relative;
  top: -10px;
  text-align: left;
  grid-column: 2/4;
  grid-row: 4/5;
} */

.loginBtn {
  grid-column: 1/9;
  grid-row: 4/5;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* 解決區域重疊覆蓋問題 */
  z-index: 1;
}

.otherLoginWay {
  grid-column: 1/9;
  grid-row: 5/6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.googleLogin {
  grid-column: 1/9;
  grid-row: 6/7;
}

.facebookLogin {
  position: relative;
  grid-column: 1/9;
  grid-row: 7/8;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.otherLoginBtn {
  width: 220px;
}

.getUCCAccount {
  position: relative;
  top: -5px;
  grid-column: 1/9;
  grid-row: 8/9;
}

.inputError {
  background-color: #ffc4c4;
}

.textLetterSpacing {
  letter-spacing: 1px;
}
</style>