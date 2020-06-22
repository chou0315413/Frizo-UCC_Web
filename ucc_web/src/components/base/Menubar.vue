<template>
  <!-- 尚未加入在正常頁面滾動menubar時，鎖定主畫面 -->
  <div class="Menubar">
    <input type="checkbox" id="checkForMenu" />

    <label for="checkForMenu" @click="animation">
      <div :class="toggleIsFalse ? 'toggle' : 'burger'">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </label>
    <ul :class="scrollUpOrDown?'menu-show':'menu-hide'">
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
      <li class="menuItem">
        <a href="https://google.com">
          <img
            class="menuIcon"
            src="http://ntcbadm1.ntub.edu.tw/Inc/ShowIndexStdImg.ashx?dataPic=10646029"
            width="50px"
            height="50px"
            style="border-radius:50%;"
          />
        </a>
        <span slot="title">社團名稱</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleIsFalse: false,
      i: "0",
      scrollUpOrDown: true
    };
  },
  methods: {
    // animation() {
    //   if (this.toggleIsFalse === false) {
    //     this.toggleIsFalse = true;
    //     //偵測在小於837px寬度及出現滿版Menubar時，把卷軸監聽器移除
    //     if (document.body.offsetWidth < "837") {
    //       window.removeEventListener("scroll", this.handleScroll, true);
    //     }
    //   } else {
    //     this.toggleIsFalse = false;
    //     //偵測在大於837px寬度及出現滿版Menubar時，把卷軸監聽器移除
    //     if (document.body.offsetWidth > "837") {
    //       window.addEventListener("scroll", this.handleScroll, true);
    //     }
    //   }
    // },
    animation() {
      if (this.toggleIsFalse === false) {
        this.toggleIsFalse = true;
      } else {
        this.toggleIsFalse = false;
      }
    },
    //滾動隱藏、顯示Menu，由於Bug太多，暫時不使用
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
    }
  }
  // mounted() {
  //   if (document.body.offsetWidth > "837") {
  //     window.addEventListener("scroll", this.handleScroll, true);
  //   } else {
  //     window.removeEventListener("scroll", this.handleScroll, true);
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Menubar {
  position: absolute;
}

#checkForMenu {
  display: none;
}
.checkMenu {
  cursor: pointer;
  position: absolute;
}
.menuItem:hover {
  background-color: rgb(255, 166, 82);
  color: white;
}
.menuIcon {
  margin-left: 4px;
}
ul {
  height: 100vh;
  overflow: auto;
}
ul li span {
  display: none;
  font-size: 1.2rem;
  animation: fadein 0.3s ease-in;
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
#checkForMenu:checked ~ ul li span {
  display: block;
  margin-left: 8px;
}
#checkForMenu:checked ~ ul li {
  width: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
label {
  height: 35px;
  width: 50px;
  margin-top: 10px;
  margin-left: 15px;
}
.menu-show {
  list-style: none;
  position: absolute;
  top: 65px;
  left: 0px;
  margin: 0;
  padding: 0;
  overflow: scroll;
  z-index: 5;
  transition: left 0.3s ease;
}
.menu-hide {
  list-style: none;
  position: absolute;
  top: 65px;
  left: -110vw;
  margin: 0;
  padding: 0;
  z-index: 5;
  transition: left 0.3s ease;
}
.menuItem {
  background-color: #b2702f;
  color: rgb(228, 225, 225);
  width: 60px;
  height: 70px;
  display: flex;
  align-items: center;
  transition: 0.3s ease;
  border-right: #4f3f2f 1px solid;
  font-weight: bold;
  cursor: pointer;
}
.burger {
  cursor: pointer;
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
@media screen and (max-width: 837px) {
  .menu-show {
    transition: all 0.5s ease;
    width: 100vw;
    height: 100vh;
    top: 62px;
    left: -100vw;
    z-index: 3;
    opacity: 0;
    overflow-y: hidden;
  }
  .menuItem {
    width: 100vw;
    height: 60px;
    background-color: #b2702f;
  }
  #checkForMenu:checked ~ .menu-show {
    background-color: #b2702f;
    color: white;
    opacity: 0.9;
    left: -10px;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
    z-index: 2000;
  }
  #checkForMenu:checked ~ ul li {
    background-color: #b2702f;
    width: 100%;
    justify-content: center;
    height: 60px;
  }
  #checkForMenu:checked ~ ul li:hover {
    background-color: rgb(252, 175, 87);
    color: white;
  }
  #checkForMenu:checked ~ .menu-show {
    overflow-y: scroll;
  }
}
@media screen and (max-width: 480px) {
  #checkForMenu:checked ~ .menu-show {
    left: 0;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>