<template>
  <div class="forgetPasswd">
    <div
      class="modal fade"
      id="forgetPasswd"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content forgetPasswdDiv">
          <div class="modal-body">
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
                <div class="input-group input-group-sm forgetPasswdDivPading mt-4 inputBorder">
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
                <div class="input-group input-group-sm forgetPasswdDivPading mt-4 inputBorder">
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
  background-image: url(../assets/signInBackground/login.jpg);
  background-size: cover;
}

.forgetPasswdDivPading {
  position: relative;
  margin: auto;
  width: 350px;
}

h4 {
  margin-top: 30px;
  margin-bottom: 30px;
}

.forgetPasswdPage {
  position: relative;
  height: 460px;
  box-shadow: 0 0 10px #000000;
  padding-top: 60px;
  background-image: url(../assets/signInBackground/login.jpg);
  background-size: cover;
}

.inputBorder {
  border: 1px #747474 solid;
}

.notice {
  position: relative;
  font-size: 10px;
  left: 80px;
}

.forgetPasswdBtn {
  margin-top: 25px;
}

.alertDiv {
  position: relative;
  font-size: 10px;
  color: red;
  font-weight: bold;
  left: 80px;
  font-size: 14px;
}
</style>
