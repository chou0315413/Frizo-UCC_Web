<template>
  <div class="userChangePw">
    <!-- 左側label -->
    <div class="labelGroup">
      <div>舊密碼</div>
      <div>新密碼</div>
      <div>確認新密碼</div>
    </div>
    <!-- 右側input -->
    <div class="inputGroup">
      <div class="oldPassword">
        <input class="input100p" v-model="oldPassword" type="text" />
      </div>
      <div class="newPassword">
        <input class="input100p" v-model="newPassword" type="text" />
      </div>
      <div class="newPasswordConfirm">
        <input class="input100p" v-model="newPasswordConfirm" type="text" />
      </div>
      <div class="updataBtn">
        <button @click.prevent="changePwd">更改密碼</button>
      </div>
      <div class="respond">{{changePasswordRespond}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { changePassword } from "@/api/auth";

export default {
  name: "Info",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      changePasswordRespond: ""
    };
  },

  methods: {
    ...mapActions({
      updateUserState: "user/setUserInfoFromObj",
      setToken: "auth/login"
    }),

    // changePassword
    changePwd() {
      // 判斷輸入欄位有無填寫
      if (this.oldPassword == "" || this.newPassword == "") {
        this.changePasswordRespond = "請輸入新舊密碼";
        return;
      }
      // 判斷兩次密碼有無成功匹配
      if (this.newPassword !== this.newPasswordConfirm) {
        this.changePasswordRespond = "確認密碼輸入錯誤";
        return;
      }
      let request = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      changePassword(request)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success == false) {
            console.log("舊密碼輸入錯誤");
            this.changePasswordRespond = "舊密碼輸入錯誤";
          } else {
            let token = {
              tokenType: resp.data.result.tokenType,
              accessToken: resp.data.result.accessToken
            };
            this.setToken(token);
            console.log("修改成功");
            this.changePasswordRespond = "修改成功";
          }
        })
        .catch(err => {
          console.log(err);
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
.userChangePw {
  margin-top: 30px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% 80%;
}

.labelGroup {
  grid-row: 1/2;
  grid-column: 1/2;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
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
  grid-template-rows: repeat(8, 1fr);
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
}

.inputGroup div input {
  border-style: none none solid;
  border-bottom: 1px #7a7a7a solid;
}

.oldPassword {
  grid-row: 1/2;
  grid-column: 1/2;
}

.newPassword {
  grid-row: 2/3;
  grid-column: 1/2;
}

.newPasswordConfirm {
  grid-row: 3/4;
  grid-column: 1/2;
}

.updataBtn {
  grid-row: 4/5;
  grid-column: 1/2;
}

.updataBtn button {
  border: none;
  background-color: #b2702f;
  border-radius: 10px;
  height: 35px;
  width: 80px;
  color: #ffffff;
}
.respond {
  grid-row: 4/5;
  grid-column: 1/2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ff5404;
}
</style>
