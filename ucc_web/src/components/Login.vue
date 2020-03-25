<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="Login" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content logInDiv">
          <div class="modal-body">
            <h4 class="mt-3">歡迎回到UCC.</h4>
            <h5>登入帳號開始享受UCC吧</h5>
            <div class="input-group input-group-sm logInDivPading mb-3 mt-4 inputBorder">
              <input
                type="text"
                class="form-control textLetterSpacing"
                placeholder="輸入您的 E-mail 信箱"
                aria-describedby="inputGroup-sizing-sm"
                v-model="email"
              />
            </div>
            <div class="input-group input-group-sm logInDivPading mb-3 mt-4 inputBorder">
              <input
                type="password"
                class="form-control textLetterSpacing"
                placeholder="輸入您的密碼"
                aria-describedby="inputGroup-sizing-sm"
                v-model="password"
              />
            </div>
            <el-button type="primary" round :loading="onLoading===isLoading" @click="login">登入</el-button>
            <h6 class="mb-3 mt-4">其他登入方式</h6>
            <div class="logInWay">
              <button type="button" class="btn btn-outline-secondary mb-2 btnWidth">
                <a
                  href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
                >Google登入</a>
              </button>
              <br />
              <button type="button" class="btn btn-outline-secondary mb-3 btnWidth">
                <a
                  href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect"
                >Facebook登入</a>
              </button>
            </div>
            <h6 class="mt-3">
              沒有帳號嗎?
              <span>
                <a href="#">註冊</a>
              </span>
            </h6>
          </div>
        </div>
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
      }
    };
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
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.message);
          alert("抱歉，您輸入帳密有誤喔!");
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

.logInDivPading {
  position: relative;
  margin: auto;
  width: 350px;
}

.inputBorder {
  border: 1px #747474 solid;
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
</style>