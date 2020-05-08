<template>
  <div>
    <h1>測試檔案上傳..</h1>

    <div>
      <form>
        選定文件 :
        <input type="file" v-on:change="onAvatarChange($event)" />
        名稱 :
        <input type="text" v-model="userInfo.name" />
        電話 :
        <input type="text" v-model="userInfo.phoneNumber" />

        <button @click.prevent="upload">上傳</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from "@/api/user";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userInfo: {
        name: "",
        avatar: null,
        background: null,
        gender: "",
        phoneNumber: "",
        address: "",
        collageLocation: "",
        collageName: "",
        majorSubject: "",
        grade: ""
      }
    };
  },

  methods: {
    ...mapActions({
      updateUserState: "user/setUserInfoFromObj"
    }),

    onAvatarChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.userInfo.avatar = files[0];
    },

    upload() {
      updateUserInfo(this.userInfo)
        .then(res => {
          console.log(res.data);
          let userInfo = {
            userId: res.data.id,
            userName: res.data.name,
            imgUrl: res.data.imageUrl,
            backgroundUrl: "",
            gender: "",
            phoneNumber: res.data.phoneNumber,
            address: "",
            collageLocation: "",
            collageName: "",
            majorSubject: "",
            grade: "",
            email: "",
            provider: "",
            createdAt: "",
            updatedAt: "",
            emailVerified: res.data.emailVerified
          };
          this.updateUserState(userInfo);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
</style>