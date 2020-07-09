<template>
  <div class="userInfoData">
    <!-- 左側label -->
    <div class="labelGroup">
      <div class="nameLabel">暱稱</div>
      <div class="genderLabel">性別</div>
      <div class="emailLabel">電子郵件</div>
      <div class="phoneLabel">電話</div>
      <div class="addressLabel">地址</div>
      <div class="collageLabel">大學資訊</div>
      <div>
        <!-- 填充用div -->
      </div>
      <div class="openFollowedLabel">公開帳號</div>
    </div>
    <!-- 右側input -->
    <div class="inputGroup">
      <div class="name">
        <input class="input100p" v-model="userInfo.name" type="text" />
      </div>
      <div class="gender">
        <select name="gender" class="input100p" v-model="userInfo.gender">
          <option v-for="index in genderOptions" :key="index">{{index.value}}</option>
        </select>
        <!-- <input class="input100p" v-model="userInfo.gender" type="text" /> -->
      </div>
      <div class="email">
        <input class="input100p onlyRead" readonly="readonly" v-model="userInfo.email" type="text" />
        <span class="isVerify" v-if="userInfo.emailVerified">已驗證</span>
        <router-link to="/user/emailverify" v-else>
          <span class="unVerify">驗證</span>
        </router-link>
      </div>
      <div class="phone">
        <input class="input100p" v-model="userInfo.phoneNumber" type="text" />
      </div>
      <div class="address">
        <input class="input100p" v-model="userInfo.address" type="text" />
      </div>
      <div class="collageLine1">
        <select name="gender" class="input100p" v-model="userInfo.collageLocation">
          <option v-for="index in countyOptions" :key="index">{{index.value}}</option>
        </select>
        <!-- <input class="input100p" v-model="userInfo.collageLocation" type="text" /> -->
        <input
          class="rightInput90p-10"
          placeholder="請輸入學校名稱"
          v-model="userInfo.collageName"
          type="text"
        />
      </div>
      <div class="collageLine2">
        <input class="input100p" placeholder="請輸入主修科系所" v-model="userInfo.majorSubject" type="text" />
        <select name="grade" class="rightInput90p-10" v-model="userInfo.grade">
          <option v-for="index in gradeOptions" :key="index">{{index.value}}</option>
        </select>
        <!-- <input class="rightInput90p" v-model="userInfo.grade" type="text" /> -->
      </div>
      <div class="openFollowed">
        <input
          type="checkbox"
          name="isOpen"
          value="open"
          :checked="userInfo.activelyAcceptFollowRequest==true"
          v-model="userInfo.activelyAcceptFollowRequest"
          v-if="userInfo.emailVerified"
        />
        <label v-else>
          <input type="checkbox" disabled />請先驗證信箱方可選擇是否自動被追蹤
        </label>
      </div>
      <div class="updataBtn">
        <button @click.prevent="sendUserInfo">更新</button>
      </div>
      <div class="respond">{{respond}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { updateUserInfo, userFollowedSetting } from "@/api/user";

export default {
  name: "Info",
  data() {
    return {
      respond: "",
      phoneNumber: "",

      genderOptions: [
        {
          index: 1,
          value: "男"
        },
        {
          index: 2,
          value: "女"
        }
      ],

      countyOptions: [
        {
          index: 1,
          value: "台北市"
        },
        {
          index: 2,
          value: "新北市"
        },
        {
          index: 3,
          value: "基隆市"
        }
      ],

      gradeOptions: [
        {
          value: "四技一",
          label: "四技一"
        },
        {
          value: "四技二",
          label: "四技二"
        },
        {
          value: "四技三",
          label: "四技三"
        },
        {
          value: "四技四",
          label: "四技四"
        },
        {
          value: "二技一",
          label: "二技一"
        },
        {
          value: "二技二",
          label: "二技二"
        },
        {
          value: "五專一",
          label: "五專一"
        },
        {
          value: "五專二",
          label: "五專二"
        },
        {
          value: "五專三",
          label: "五專三"
        },
        {
          value: "五專四",
          label: "五專四"
        },
        {
          value: "五專五",
          label: "五專五"
        },
        {
          value: "研究一",
          label: "研究一"
        },
        {
          value: "研究二",
          label: "研究二"
        }
      ]
    };
  },

  methods: {
    ...mapActions({
      updateUserState: "user/setUserInfoFromObj"
    }),

    sendUserInfo() {
      // 公開帳號api
      userFollowedSetting(this.userInfo.activelyAcceptFollowRequest)
        .then(res => {
          console.log(res.data);
          let userInfoUpdata = {
            activelyAcceptFollowRequest:
              res.data.result.activelyAcceptFollowRequest
          };
          this.updateUserState(userInfoUpdata);
        })
        .catch(err => {
          console.log(err);
        });
      // 個人資料api
      updateUserInfo(this.userInfo)
        .then(res => {
          console.log(res.data);
          let userInfoUpdata = {
            userId: res.data.result.id,
            name: res.data.result.name,
            gender: res.data.result.gendere,
            phoneNumber: "0" + res.data.result.phoneNumber,
            address: res.data.result.addrss,
            collageLocation: res.data.result.collageLocation,
            collageName: res.data.result.collageName,
            majorSubject: res.data.result.majorSubject,
            grade: res.data.result.grade
          };
          this.updateUserState(userInfoUpdata);
          this.respond = "修改成功!";
        })
        .catch(err => {
          err.resopnse.data.message;
          console.log(err);
          console.log("出錯");
          this.respond = "修改失敗";
        });
    }
  },

  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userInfoData {
  margin-top: 30px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% 80%;
}

.labelGroup {
  grid-row: 1/2;
  grid-column: 1/2;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 100%;
}

.labelGroup div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.inputGroup {
  grid-row: 1/2;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 70% 30%;
}

.inputGroup div {
  margin-top: 10px;
  margin-bottom: 10px;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
  margin-left: 5px;
}

.input100p {
  width: 100%;
  height: 35px;
  border-style: none none solid;
  border-bottom: 1px #7a7a7a solid;
}

select {
  cursor: pointer;
}

.rightInput90p-10 {
  width: 90%-10px;
  margin-left: 10px;
  border-style: none none solid;
  border-bottom: 1px #7a7a7a solid;
}

/* .inputGroup div input {
  border-style: none none solid;
  border-bottom: 1px #7a7a7a solid;
} */

/* .inputGroup div select {
  border-style: none none solid;
  border-bottom: 1px #7a7a7a solid;
  cursor: pointer;
} */

.name {
  grid-row: 1/2;
  grid-column: 1/2;
}

.gender {
  grid-row: 2/3;
  grid-column: 1/2;
}

.email {
  grid-row: 3/4;
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 100%;
}

.onlyRead {
  cursor: not-allowed;
}

.email > a {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: #b2702f;
  text-decoration: none;
}

.unVerify:hover {
  color: #331900;
  cursor: pointer;
}

.isVerify {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: #000000;
}

.phone {
  grid-row: 4/5;
  grid-column: 1/2;
}

.address {
  grid-row: 5/6;
  grid-column: 1/2;
}

.collageLocation {
  grid-row: 6/7;
  grid-column: 1/3;
}

.collageLocation input {
  width: 200px;
}

.collageLine1 {
  grid-row: 6/7;
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 33% 67%;
  grid-template-rows: 100%;
}

.collageLine2 {
  grid-row: 7/8;
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 100%;
}

.openFollowed {
  grid-row: 8/9;
  grid-column: 1/2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.openFollowed label {
  margin: 0px;
}

.openFollowed label input {
  position: relative;
  top: 5px;
  margin-right: 5px;
}

.openFollowed input {
  margin-left: 5px;
  height: 20px;
  width: 20px;
}

.updataBtn {
  grid-row: 9/10;
  grid-column: 1/2;
}

.updataBtn button {
  border: none;
  background-color: #b2702f;
  border-radius: 10px;
  height: 35px;
  width: 60px;
  color: #ffffff;
}
.respond {
  grid-row: 9/10;
  grid-column: 1/2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ff5404;
}

input {
  outline: none;
}

select {
  outline: none;
}
</style>
