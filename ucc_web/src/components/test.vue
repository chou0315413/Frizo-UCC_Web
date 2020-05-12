<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#Login"
    >Launch demo modal</button>

    <!-- Modal -->
    <div class="modal fade" id="Login" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content logInDiv">
          <div class="modal-body">
            <div class="sideBar">
              <div class="list-group" id="myList" role="tablist">
                <a
                  class="list-group-item list-group-item-action sideBtn active"
                  data-toggle="list"
                  href="#home"
                  role="tab"
                >登入</a>
                <a
                  class="list-group-item list-group-item-action sideBtn"
                  data-toggle="list"
                  href="#profile"
                  role="tab"
                >註冊</a>
                <a
                  class="list-group-item list-group-item-action sideBtn"
                  data-toggle="list"
                  href="#messages"
                  role="tab"
                >忘記密碼</a>
              </div>
            </div>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="home" role="tabpanel">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <h4 class="mt-3">歡迎回到UCC.</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <h5>登入帳號開始享受UCC吧</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm logInDivPading mb-3 mt-4">
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
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm logInDivPading mt-4">
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
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4 forgetPasswdBtn">
                      <a href="#" data-toggle="modal" data-target="#forgetPasswd">忘記密碼</a>
                    </div>
                    <div class="col-lg-8">
                      <div class="alertDiv">{{alertDiv.alertText}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <el-button
                        type="primary"
                        round
                        :loading="onLoading===isLoading"
                        @click="login"
                      >登入</el-button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <h6 class="mb-3 mt-4">其他登入方式</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="logInWay">
                        <!-- 先以a為連結，後續可以更改連結方式 -->
                        <a
                          href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
                        >
                          <button
                            type="button"
                            class="btn btn-outline-secondary mb-2 btnWidth"
                          >Google登入</button>
                        </a>
                        <br />
                        <a
                          href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"
                        >
                          <button
                            type="button"
                            class="btn btn-outline-secondary mb-3 btnWidth"
                          >Facebook登入</button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <h6 class="mt-3">
                        沒有帳號嗎?
                        <span>
                          <a href="#" data-toggle="modal" data-target="#register">註冊</a>
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <h4>歡迎註冊UCC帳號</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm registerDivPading inputBorder">
                        <input
                          type="text"
                          id="name"
                          class="form-control textLetterSpacing"
                          placeholder="輸入您的稱謂"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm registerDivPading mt-4 inputBorder">
                        <input
                          type="text"
                          id="userEmail"
                          class="form-control textLetterSpacing"
                          placeholder="輸入您的 E-mail 信箱"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="userEmail"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm registerDivPading mt-5 inputBorder">
                        <input
                          type="password"
                          id="userPassword"
                          class="form-control textLetterSpacing"
                          placeholder="輸入您欲設定的密碼"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="userPassword"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div
                        class="input-group input-group-sm registerDivPading mb-3 mt-4 inputBorder"
                      >
                        <input
                          type="password"
                          id="reUserPassword"
                          class="form-control textLetterSpacing"
                          placeholder="請重複輸入您設定的密碼"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="reUserPassword"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="alertDiv mb-3">{{alertText}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="notice">請使用英文字母及阿拉伯數字和部分特殊符號</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="registerBtn">
                        <el-button
                          type="primary"
                          round
                          :loading="isClick===true"
                          @click="register"
                        >註冊</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="messages" role="tabpanel">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <h4>忘記密碼</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm forgetPasswdDivPading inputBorder">
                        <input
                          type="text"
                          id="email"
                          class="form-control textLetterSpacing"
                          placeholder="請輸入您的 E-mail 信箱"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="email"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12 mb-3">
                      <div class="forgetPasswdBtn">
                        <el-button
                          type="primary"
                          round
                          :loading="sendEmailIsClick===true"
                          @click="sendVerifyEmail"
                        >送出</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group input-group-sm forgetPasswdDivPading inputBorder">
                        <input
                          type="text"
                          id="verifyCode"
                          class="form-control textLetterSpacing"
                          placeholder="請輸入驗證碼"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="verifyCode"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div
                        class="input-group input-group-sm forgetPasswdDivPading mt-4 inputBorder"
                      >
                        <input
                          type="password"
                          id="userPassword"
                          class="form-control textLetterSpacing"
                          placeholder="請輸入您欲設定的密碼"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div
                        class="input-group input-group-sm forgetPasswdDivPading mt-4 inputBorder"
                      >
                        <input
                          type="password"
                          id="reUserPassword"
                          class="form-control textLetterSpacing"
                          placeholder="請重複輸入您設定的密碼"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="rePassword"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="notice">請使用英文字母及阿拉伯數字和部分特殊符號</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="alertDiv">{{alertText}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="forgetPasswdBtn">
                        <el-button
                          type="primary"
                          round
                          :loading="resetIsClick===true"
                          @click="resetPwd"
                        >確認</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signin } from "@/api/auth";
// import { authenticated } from "@/utils/AuthStore";
import { mapActions } from "vuex";
import jquery from "jquery";
// import register from "@/components/Register";
// import forgetPasswd from "@/components/forgetPasswd";

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
        alertText: ""
      },
      inputIsError: false
    };
  },

  components: {
    // register,
    // forgetPasswd
  },

  methods: {
    closeModal() {
      jquery("#Login").modal("toggle");
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
          this.token.tokenType = resp.data.tokenType;
          this.token.accessToken = resp.data.accessToken;
          const token = this.token;
          this.storeToken(token);
          this.closeModal();
          location.reload();
        })
        .catch(err => {
          console.log(err.message);
          this.isLoading = "false";
          if ((this.email === "") & (this.password === "")) {
            this.inputIsError = true;
            this.alertDiv.alertText = "抱歉，信箱帳號及密碼必須輸入。";
          } else {
            this.alertDiv.alertText =
              "抱歉，您輸入帳密有誤，請重新確認帳號密碼。";
          }
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
.logInDiv {
  height: 500px;
  background-image: url(../assets/signInBackground/login.jpg);
  background-size: cover;
}

.sideBar {
  position: absolute;
  left: -100px;
}

.sideBtn {
  height: 70px;
  width: 80px;
}

.logInDivPading {
  position: relative;
  margin: auto;
  width: 350px;
}

.forgetPasswdBtn {
  text-align: right;
}

.textLetterSpacing {
  letter-spacing: 1px;
}

.centerPadding {
  position: relative;
  margin: auto;
  text-align: center;
  width: 300px;
}

.logInWay button {
  position: relative;
  width: 220px;
  margin: auto;
  margin-bottom: 5px;
}

.btnWidth {
  width: 200px;
}

.alertDiv {
  position: relative;
  font-size: 10px;
  color: red;
  font-weight: bold;
  left: 80px;
}

.inputError {
  background-color: #ffc4c4;
}
</style>