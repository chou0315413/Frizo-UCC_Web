<template>
  <div>
    <h1>測試上傳 Profile..</h1>

    <div>
      <form id="userInfo">
        <div>
          <img :src="userInfo.imgUrl">
          選定 avatar :
          <input type="file" v-on:change="onAvatarChange($event)" />
        </div>

        <div>
          <img :src="userInfo.backgroundUrl">
          選定 bacjground :
          <input type="file" v-on:change="onBackgroundChange($event)" />
        </div>

        <div>
          名稱 :
          <input type="text" v-model="userInfo.userName" />
        </div>

        <div>
          電話 :
          <input type="text" v-model="userInfo.phoneNumber" />
        </div>

        <div>
          性別 :
          <input type="text" v-model="userInfo.gender" />
        </div>

        <div>
          address :
          <input type="text" v-model="userInfo.address" />
        </div>

        <div>
          collageName :
          <input type="text" v-model="userInfo.collageName" />
        </div>

        <div>
          majorSubject :
          <input type="text" v-model="userInfo.majorSubject" />
        </div>

        <div>
          grade :
          <input type="text" v-model="userInfo.grade" />
        </div>

        <div>
          email :
          <input type="text" v-model="userInfo.email" />
        </div>

        <div>
          address :
          <input type="text" v-model="userInfo.address" />
        </div>

        <button @click.prevent="upload">上傳</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUserInfo, updateUserAvatar, updateProfileBackground } from "@/api/user";
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions({
      updateUserState: "user/setUserInfoFromObj"
    }),

    onAvatarChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      var imgBuffer = files[0];
      updateUserAvatar(imgBuffer)
              .then(resp => {
                console.log(resp.data);
                if (resp.data.success){
                  let userInfo = {
                    imageUrl: resp.data.message
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
                if (resp.data.success){
                  let userInfo = {
                    backgroundUrl: resp.data.message
                  };
                  this.updateUserState(userInfo);
                }
              })
              .catch(error => {
                console.log(error);
              });
    },

    upload() {
      updateUserInfo(this.userInfo)
        .then(res => {
          console.log(res.data);
          let userInfo = {
            userId: res.data.id,
            userName: res.data.name,
            gender: res.data.gender,
            phoneNumber: res.data.phoneNumber,
            address: res.data.address,
            collageLocation: res.data.collageLocation,
            collageName: res.data.collageName,
            majorSubject: res.data.majorSubject,
            grade: res.data.grade,
            email: res.data.email,
            provider: res.data.provider,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
            emailVerified: res.data.emailVerified,
            imageUrl: res.data.imageUrl,
            backgroundUrl: res.data.backgroundUrl
          };
          this.updateUserState(userInfo);
        })
        .catch(error => {
          console.log(error);
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


<style scoped>
  #userInfo div {
    margin-bottom: 10px;
  }
</style>