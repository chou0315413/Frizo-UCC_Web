<template>
  <!-- <div class="register"> -->
  <div class="registerDiv">
    <div class="goBack">
      <img @click.prevent="goBack" class="img100" src="@/assets/loginGroup/left-arrow.png" />
    </div>
    <div class="UCCLogo">
      <img class="logo" src="@/assets/UCC-Classic-PNG.png" />
    </div>
    <div class="UCCTitle">立即加入UCC</div>
    <div class="nicknameText titleText">稱謂</div>
    <div class="nickname">
      <input type="text" id="name" class="inputClass" v-model="name" />
    </div>
    <div class="emailText titleText">E-mail信箱</div>
    <div class="email">
      <input type="text" id="userEmail" class="inputClass" v-model="userEmail" />
    </div>
    <div class="passwordText titleText">密碼</div>
    <div class="password">
      <input type="password" id="userPassword" class="inputClass" v-model="userPassword" />
    </div>
    <div class="confirmPasswordText titleText">確認密碼</div>
    <div class="confirmPassword">
      <input type="password" id="reUserPassword" class="inputClass" v-model="reUserPassword" />
    </div>
    <div class="alertDiv">{{alertText}}</div>
    <div class="registerBtn">
      <!-- <el-button type="primary" round :loading="isClick===true" @click="register">註冊</el-button> -->
      <button class="buttonCSS" @click.prevent="register">註冊</button>
    </div>
    <!-- <div class="title">
      <h4>歡迎註冊UCC帳號</h4>
    </div>

    <div class="nickname">
      <input
        type="text"
        id="name"
        class="form-control textLetterSpacing"
        placeholder="輸入您的稱謂"
        aria-describedby="inputGroup-sizing-sm"
        v-model="name"
      />
    </div>

    <div class="email">
      <input
        type="text"
        id="userEmail"
        class="form-control textLetterSpacing"
        placeholder="輸入您的 E-mail 信箱"
        aria-describedby="inputGroup-sizing-sm"
        v-model="userEmail"
      />
    </div>

    <div class="passwd">
      <input
        type="password"
        id="userPassword"
        class="form-control textLetterSpacing"
        placeholder="輸入您欲設定的密碼"
        aria-describedby="inputGroup-sizing-sm"
        v-model="userPassword"
      />
    </div>

    <div class="confirmPasswd">
      <input
        type="password"
        id="reUserPassword"
        class="form-control textLetterSpacing"
        placeholder="請重複輸入您設定的密碼"
        aria-describedby="inputGroup-sizing-sm"
        v-model="reUserPassword"
      />
    </div>

    <div class="notice">請使用英文字母及阿拉伯數字和部分特殊符號</div>

    <div class="alertDiv">{{alertText}}</div>

    <div class="registerBtn">
      <el-button type="primary" round :loading="isClick===true" @click="register">註冊</el-button>
    </div>-->
  </div>
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
      alertText: "",
      // 回上一頁
      viewValue: "Login"
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
    },

    goBack() {
      // viewValue是在父元件on監聽的方法
      // 第二個引數this.viewValue是需要傳的值
      this.$emit("viewValue", this.viewValue);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerDiv {
  height: 480px;
  width: 400px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(12, 1fr);
  border-radius: 10px;
}

.goBack {
  grid-row: 1/2;
  grid-column: 1/2;
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

.inputClass {
  width: 100%;
  height: 80%;
  border: none;
  background-color: rgb(236, 236, 236);
  letter-spacing: 1px;
  border-radius: 5px;
}

.nicknameText {
  grid-row: 3/4;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.nickname {
  grid-row: 4/5;
  grid-column: 2/10;
}

.emailText {
  grid-row: 5/6;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.email {
  grid-row: 6/7;
  grid-column: 2/10;
}

.passwordText {
  grid-row: 7/8;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.password {
  grid-row: 8/9;
  grid-column: 2/10;
}

.confirmPasswordText {
  grid-row: 9/10;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.confirmPassword {
  grid-row: 10/11;
  grid-column: 2/10;
}

.alertDiv {
  position: relative;
  top: -10px;
  grid-column: 5/10;
  grid-row: 11/12;
  align-self: flex-start;
  justify-self: end;
  font-size: 10px;
  color: red;
  font-weight: bold;
}

.registerBtn {
  grid-row: 11/13;
  grid-column: 2/10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonCSS {
  height: 45%;
  width: 100%;
  border-radius: 15px;
  border: none;
  background-color: #a1662a;
  color: #fff;
  font-size: 18px;
}

/* 初版------------------------------------------------------------------------------- */

.title {
  grid-column: 1/9;
  grid-row: 2/3;
}

/* .registerDivPading {
  position: relative;
  margin: auto;
  width: 350px;
} */

h4 {
  margin-bottom: 20px;
}

.textLetterSpacing {
  letter-spacing: 1px;
}

/* .nickname {
  grid-column: 2/8;
  grid-row: 3/4;
} */

/* .email {
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

.inputBorder {
  border: 1px #747474 solid;
}

.notice {
  grid-column: 2/8;
  grid-row: 5/6;
  align-self: flex-end;
  justify-self: flex-end;
  font-size: 10px;
  margin: 0 1px 2px 0;
}

/* .registerBtn {
  grid-column: 1/9;
  grid-row: 7/8;
  align-self: center;
  justify-self: center;
} */

/* .alertDiv {
  grid-column: 4/8;
  grid-row: 6/7;
  align-self: end;
  justify-self: end;
  font-size: 10px;
  color: red;
  font-weight: bold;
} */
</style>
