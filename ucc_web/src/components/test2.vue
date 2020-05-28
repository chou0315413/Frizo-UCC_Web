<template>
  <div class="navbar">
    <div :class="scrollUpOrDown?'nav-show':'nav-hide'">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <input type="checkbox" id="check" />
        <el-menu-item index="1" class="uccItem">
          <!-- Menu -->
          <Menubar class="menubar"></Menubar>
          <!-- Menu -->
          <router-link to="/">
            <img class="logo" src="@/assets/UCC Classic.jpg" />
            <span id="fl">
              <h3>University Club Center</h3>
            </span>
          </router-link>
        </el-menu-item>
        <el-menu-item id="inputArea">
          <el-input v-model="search" @focus="searchOnfocus" @blur="searchOnblur" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-menu-item>

        <div class="loginArea">
          <!-- 登入狀態改變時會有不同的項目出現 -->
          <!-- 未登入 -->
          <el-menu-item
            index="6"
            href="#"
            class="login"
            data-toggle="modal"
            data-target="#Login"
            v-if="loginState === false"
            @click="openModal"
          >
            <i class="el-icon-user-solid" style="color:#A9A9A9"></i>
            <span class="loginFont">Login</span>
          </el-menu-item>
        </div>
        <!-- 已登入 -->
        <div class="rightBtnGroup" v-if="loginState === true">
          <router-link to="/chat" style="text-decoration:none;">
            <el-menu-item index="4" class="rightBtn">
              <i class="el-icon-chat-line-square" size="medium"></i>
              <span class="navFont">Chat</span>
            </el-menu-item>
          </router-link>

          <el-submenu index="5" href="#" class="rightBtn" id="followersBtn">
            <template slot="title" class="rightBtn">
              <font-awesome-icon
                icon="user-friends"
                size="lg"
                style="color:#A9A9A9;margin-right:8px;"
              />
              <span id="followers" style="font-size:16px;">Followers</span>
            </template>
            <el-menu-item class="rightBtn" index="5-1" href="#" id="dropDownBtn">追蹤者</el-menu-item>
            <el-menu-item class="rightBtn" index="5-2" href="#" id="dropDownBtn">追蹤中的社團</el-menu-item>
          </el-submenu>
          <el-submenu index="6" href="#" class="rightBtn">
            <template slot="title" class="rightBtn">
              <i class="el-icon-user-solid" style="color:#A9A9A9"></i>
              <span class="navFont">User</span>
            </template>
            <router-link to="/user/info" style="text-decoration:none;">
              <el-menu-item class="rightBtn" index="6-1" href="#">個人資料</el-menu-item>
            </router-link>
            <router-link to="/user/newActivity" style="text-decoration:none;">
              <el-menu-item class="rightBtn" index="6-2" href="#" id="dropDownBtn">發佈新活動、訊息</el-menu-item>
            </router-link>
            <el-menu-item class="rightBtn" index="6-3" @click.native="logout" id="dropDownBtn">登出</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
      <label for="check" @click="animation">
        <div :class="loginState ?  (toggleIsFalse ? 'toggle' : 'burger') : 'nothing'">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </label>
      <div :class="isGoToLogin?'modalDivShow':'modalDivNotShow'">
        <div class="background" @click="closeModal"></div>
        <!-- modalSideBar -->
        <div class="modalLoginSideBtn" @click="goToLogin"></div>
        <div class="modalRegisterSideBtn" @click="goToRegister"></div>
        <div class="modalForgetPasswdSideBtn" @click="goToforgerPasswd"></div>
        <!-- modalSideBar -->
        <div class="loginDivCenter">
          <div :class="onLogin?'goLogin':'notGoToLogin'">
            <Login></Login>
          </div>
          <div :class="onRegister?'goRegister':'notGoToRegister'">
            <register></register>
          </div>
          <div :class="onForgetPasswd?'goRegister':'notGoToRegister'">
            <forgetPasswd></forgetPasswd>
          </div>
        </div>
      </div>
      <div style="display:none;">
        <register></register>
        <forgetPasswd></forgetPasswd>
      </div>
    </div>
  </div>
</template>  
<script>
import { mapActions } from "vuex";
import { authenticated } from "@/utils/AuthStore";
import Login from "@/components/loginGroup/Login";
import register from "@/components/loginGroup/Register";
import forgetPasswd from "@/components/loginGroup/forgetPasswd";
import Menubar from "@/components/base/Menubar";

export default {
  name: "Navbar",

  data() {
    return {
      toggleIsFalse: false,
      email: "",
      password: "",
      search: "搜尋社團/活動",
      token: {
        tokenType: "",
        accessToken: ""
      },
      activeIndex: "1",
      activeIndex2: "1",
      loginState: "",
      i: "0",
      scrollUpOrDown: true,
      // 確認有無點擊登入按鈕
      isGoToLogin: false,

      // 判斷目前在哪個頁面上
      onLogin: true,
      onRegister: false,
      onForgetPasswd: false
    };
  },

  components: {
    Login,
    register,
    Menubar,
    forgetPasswd
  },

  methods: {
    goToforgerPasswd() {
      this.onRegister = false;
      this.onLogin = false;
      this.onForgetPasswd = true;
    },

    goToRegister() {
      this.onRegister = true;
      this.onLogin = false;
      this.onForgetPasswd = false;
    },

    goToLogin() {
      this.onRegister = false;
      this.onLogin = true;
      this.onForgetPasswd = false;
    },

    // 判斷使用者是否點擊登入按鈕
    openModal() {
      this.isGoToLogin = true;
    },
    closeModal() {
      this.isGoToLogin = false;
    },
    // 判斷使用者是否點擊登入按鈕

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // search的使用者友善
    searchOnfocus() {
      if (this.search === "搜尋社團/活動") {
        this.search = "";
      }
    },
    searchOnblur() {
      if (this.search === "") {
        this.search = "搜尋社團/活動";
      }
    },
    animation() {
      if (this.toggleIsFalse === false) {
        this.toggleIsFalse = true;
      } else {
        this.toggleIsFalse = false;
      }
    },
    //滾動隱藏、顯示Navbar
    handleScroll() {
      // 頁面滾動距頂部距離
      var scrollTop = window.pageYOffset;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;

      if (window.location.pathname === "/chat") {
        window.removeEventListener("scroll", this.handleScroll, true);
      } else if (scroll < 0) {
        this.scrollUpOrDown = true;
      } else {
        this.scrollUpOrDown = false;
      }
    },

    ...mapActions({
      logout: "auth/logout"
    })
  },

  mounted() {
    // 登入狀態偵測
    if (authenticated()) {
      this.loginState = true;
    } else {
      this.loginState = false;
    }
    //偵測卷軸滾動
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* modal 使用的CSS 類別 */

/* 登入用 */
.goLogin {
  display: unset;
}
.notGoToLogin {
  display: none;
}
/* 登入用 */

/* 註冊用 */
.goRegister {
  display: unset;
}
.notGoToRegister {
  display: none;
}
/* 註冊用 */

/* 忘記密碼用 */
.goForgetPasswd {
  display: unset;
}
.notGoToForgetPasswd {
  display: none;
}
/* 忘記密碼用 */

.modalDivShow {
  position: fixed;
  height: 110vh;
  width: 100vw;
  top: -5vh;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  z-index: 7;
}

.modalDivNotShow {
  display: none;
}

.background {
  position: absolute;
  height: 110vh;
  width: 100vw;
  z-index: -5;
  background-color: #000000;
  opacity: 0.5;
  grid-column: 1/9;
  grid-row: 1/9;
}

.loginDivCenter {
  position: relative;
  height: 500px;
  width: 470px;
  margin: auto;
  z-index: 5;
  grid-column: 1/9;
  grid-row: 1/9;
}

.modalLoginSideBtn {
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: violet;
}

.modalRegisterSideBtn {
  grid-column: 2/3;
  grid-row: 3/4;
  background-color: red;
}

.modalForgetPasswdSideBtn {
  grid-column: 2/3;
  grid-row: 4/5;
  background-color: rgb(170, 169, 169);
}
/* modal 使用的CSS 類別 */

.navbar {
  z-index: 6;
}
.nav-show,
.nav-show .el-menu.el-menu--horizontal {
  height: 61px;
  padding: 0px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.3s ease;
}
.nav-hide,
.nav-hide .el-menu.el-menu--horizontal {
  height: 61px;
  padding: 0px;
  width: 100%;
  position: fixed;
  top: -61px;
  left: 0;
  transition: top 0.3s ease;
}

.rightBtnGroup {
  display: flex;
  justify-content: flex-end;
}
.loginArea {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.login {
  width: 100px;
}
.Icon {
  border: 0px;
}
.logo {
  height: 40px;
  width: 70px;
  margin: 0 13px 12px 70px;
}
.menubar {
  width: 50px;
}
#fl {
  margin-top: 10px;
  float: right;
}
#followersBtn {
  width: 80px;
}
#followers {
  color: white;
  display: none;
}
#check {
  display: none;
}

.burger {
  display: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
}
.toggle {
  display: none;
  cursor: pointer;
  position: fixed;
  top: 15px;
  right: 20px;
}
.navFont {
  display: none;
}
#dropDownBtn:hover {
  background-color: #fff5e4;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: orange;
  margin: 5px;
  transition: all 0.2s ease-in;
}
.toggle div {
  transition: all 0.2s ease-in;
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
  width: 25px;
  height: 3px;
  background-color: orange;
  margin: 5px;
}
.toggle .line2 {
  opacity: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(0px, 0px);
  width: 25px;
  height: 3px;
  background-color: orange;
  margin: 5px;
}
@media screen and (max-width: 980px) {
  .rightBtnGroup {
    position: absolute;
    width: 200px;
    height: 168px;
    top: -200px;
    right: 0;
    flex-direction: column;
    text-align: center;
    background-color: rgb(255, 180, 94);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 5;
  }
  .rightBtn {
    display: block;
    font-size: 16px;
    color: white;
    text-decoration: none;
  }
  .rightBtn:hover {
    color: black;
  }
  .burger {
    display: block;
  }
  .toggle {
    display: block;
  }
  .navFont {
    display: inline;
  }
  #check:checked ~ .rightBtnGroup {
    right: 0;
    top: 60px;
    opacity: 1;
  }
  #followers:hover {
    color: #000;
  }
  #followers {
    display: inline;
  }
  #followersBtn {
    width: 100%;
  }
  font-awesome-icon {
    color: white;
  }
}
@media screen and (max-width: 870px) {
  .loginFont {
    display: none;
  }
}
@media screen and (max-width: 837px) {
  #inputArea {
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -125px;
    width: 250px;
  }
}
@media screen and (max-width: 555px) {
  .burger {
    position: absolute;
    top: 80px;
    right: 10px;
  }
  .toggle {
    position: absolute;
    top: 80px;
    right: 10px;
  }
  .loginArea {
    position: absolute;
    top: 60px;
    right: 10px;
  }
  .rightBtnGroup {
    top: -200px;
    right: 0;
    width: 180px;
    z-index: 5;
  }
  #check:checked ~ .rightBtnGroup {
    right: 0;
    top: 120px;
    opacity: 1;
  }
}
@media screen and (max-width: 480px) {
  #fl h3 {
    font-size: 1.5rem;
    margin-top: 5px;
  }
  .logo {
    height: 30px;
    width: 55px;
    margin-left: 50px;
  }
  .uccItem {
    padding: 0;
  }
}
</style>