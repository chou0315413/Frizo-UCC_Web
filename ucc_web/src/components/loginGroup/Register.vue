<template>
  <!-- <div class="register"> -->
  <div class="registerDiv">
    <div class="title">
      <h4>歡迎註冊UCC帳號</h4>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="input-group input-group-sm inputBorder">
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
        <div class="input-group input-group-sm mt-4 inputBorder">
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
        <div class="input-group input-group-sm mt-5 inputBorder">
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
        <div class="input-group input-group-sm mb-3 mt-4 inputBorder">
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
          <el-button type="primary" round :loading="isClick===true" @click="register">註冊</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { signup } from "@/api/auth";
export default {
  name: "register",

  data() {
    return {
      name: "",
      userEmail: "",
      userPassword: "",
      reUserPassword: "",
      isClick: false,
      alertText: ""
    };
  },

  methods: {
    signup,

    correctPassword() {
      this.isClick = true;
      let userInfo = {
        name: this.name,
        email: this.userEmail,
        password: this.userPassword
      };
      this.signup(userInfo)
        .then(resp => {
          alert(resp.data.message);
          if (resp.data.success) {
            location.reload();
          }
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.isClick = false;
    },

    errPassword() {
      this.alertText = "密碼不一致，請再次確認。";
    },

    // 確認密碼有無一致，若成功則執行correctPassword()，否則執行errPassword()
    register() {
      if (this.name == "" || this.userEmail == "" || this.userPassword == "") {
        this.alertText = "資料尚未填寫完畢。";
        return;
      }
      if (this.userPassword === this.reUserPassword) {
        this.correctPassword();
      } else {
        this.errPassword();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerDiv {
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
  grid-row: 1/2;
}

/* .registerDivPading {
  position: relative;
  margin: auto;
  width: 350px;
} */

h4 {
  margin-top: 30px;
  margin-bottom: 50px;
}

.registerPage {
  position: relative;
  height: 460px;
  box-shadow: 0 0 10px #000000;
  padding-top: 60px;
}

.inputBorder {
  border: 1px #747474 solid;
}

.notice {
  position: relative;
  font-size: 10px;
  left: 80px;
}

.registerBtn {
  margin-top: 25px;
}

.alertDiv {
  position: relative;
  font-size: 10px;
  color: red;
  font-weight: bold;
  left: 80px;
}
</style>
