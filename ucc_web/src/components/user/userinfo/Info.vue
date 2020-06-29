<template>
  <div class="info">
    <div class="userinfo">
      <div class="photoGroup">
        <div class="userBackgroundPhoto">
          <!-- <img :src="userInfo.backgroundUrl" class="PhotoSize" /> -->
          <img :src="testUserBackgroundPhoto" class="PhotoSize" />
        </div>
        <div class="userBackgroundPhotoBtn">
          <label>
            <input
              id="upload_img"
              style="display:none;"
              type="file"
              v-on:change="onBackgroundChange($event)"
            />
            封面照片
          </label>
        </div>
        <div class="userPhoto">
          <el-avatar :size="130" :src="userInfo.imgUrl"></el-avatar>
        </div>
        <div class="userPhotoBtn">
          <label>
            <input
              id="upload_img"
              style="display:none;"
              type="file"
              v-on:change="onAvatarChange($event)"
            />
            換
          </label>
        </div>
        <div class="photoUserName">{{userInfo.name}}</div>
      </div>
      <div class="userInfoContnet">
        <div class="sideBar">
          <div class="userInfoUpDataBtn">
            <span
              :class="{active:view=='changeInfo'}"
              @click.prevent="changeView('changeInfo')"
            >個人檔案</span>
          </div>
          <div class="userChangePwBtn">
            <span :class="{active:view=='changePw'}" @click.prevent="changeView('changePw')">修改密碼</span>
          </div>
        </div>
        <div class="infoShow">
          <keep-alive>
            <component :is="view"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { authenticated } from "@/utils/AuthStore";
import { updateUserAvatar, updateProfileBackground } from "@/api/user";
import changeInfo from "@/components/user/userinfo/changeInfo";
import changePw from "@/components/user/userinfo/changePw";

export default {
  name: "Info",

  components: {
    changeInfo,
    changePw
  },

  data() {
    return {
      respond: "",
      phoneNumber: "",
      view: "changeInfo",

      testUserBackgroundPhoto:
        "https://png.pngtree.com/thumb_back/fh260/back_pic/03/71/59/3557b810e06df32.jpg"
    };
  },

  methods: {
    ...mapActions({
      updateUserState: "user/setUserInfoFromObj"
    }),

    // 切換components的功能
    changeView(viewName) {
      this.view = viewName;
    },

    onAvatarChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      var imgBuffer = files[0];
      updateUserAvatar(imgBuffer)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success) {
            let userInfo = {
              imageUrl: resp.data.result
            };
            this.updateUserState(userInfo);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    onBackgroundChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      var imgBuffer = files[0];
      updateProfileBackground(imgBuffer)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success) {
            let userInfo = {
              backgroundUrl: resp.data.result.message
            };
            this.updateUserState(userInfo);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  beforeRouteEnter(to, from, next) {
    if (authenticated()) {
      next();
    } else {
      next("/");
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
.info {
  background-color: #b2702f;
  height: 780px;
}

.userinfo {
  position: relative;
  width: 800px;
  height: 750px;
  margin: auto;
}

.photoGroup {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 250px;
}

.userBackgroundPhoto {
  grid-row: 1/5;
  grid-column: 1/6;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 0.5px #3b3b3b solid;
}

.userPhoto {
  grid-row: 3/5;
  grid-column: 3/4;
}

.userBackgroundPhotoBtn {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-row: 4/5;
  grid-column: 5/6;
  padding-right: 20px;
  padding-bottom: 5px;
}

.userBackgroundPhotoBtn label {
  background-color: #dddddd;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  opacity: 0.8;
  cursor: pointer;
}

.userPhotoBtn {
  grid-column: 3/4;
  grid-row: 5/6;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-right: 20px;
}

.userPhotoBtn label {
  border-radius: 35px;
  background-color: #dddddd;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  cursor: pointer;
  z-index: 1;
}

.photoUserName {
  position: relative;
  grid-row: 5/6;
  grid-column: 3/4;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  top: 5px;
}

.PhotoSize {
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.userInfoContnet {
  background-color: #ffffff;
  height: 500px;
  margin-top: 20px;
  border-radius: 15px;
  border: 0.5px #3b3b3b solid;
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 100%;
}

.marginTop-100px {
  margin-top: -100px;
}

.photoBtn {
  text-align: right;
  margin-top: -70px;
}

.infoBar {
  position: relative;
  top: 40px;
  height: 500px;
  border: 1px solid #dddddd;
  box-shadow: 0px 0px 1px #000000;
  width: 100%;
  background-color: #ffffff;
}

.sideBar {
  position: relative;
  height: 100px;
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 100%;
  top: 30px;
}

.sideBar div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sideBar div span {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 70%;
}

.active {
  border-left: 2px #000000 solid;
  font-weight: bold;
}

.infoShow {
  grid-row: 1/2;
  grid-column: 2/3;
  border-left: 2px #3b3b3b solid;
}
</style>
