<template>
  <div>
    <Navbar></Navbar>
    <menubar></menubar>
    <h1>Test Page</h1>
    <label>驗證碼</label>
    <input type="text" v-model="verifyCode" />
    <button @click="sendVerifyCodeEmail">寄信</button>
    <button @click="sendCode">送出</button>
  </div>
</template>

<script>
import { sendVerifyCodeEmail, checkVerifyCodeEmail } from "@/api/user";
import Navbar from "@/components/Navbar";
import Menubar from "@/components/Menubar";

export default {
  data() {
    return {
      verifyCode: ""
    };
  },

  components: {
    Navbar,
    Menubar
  },

  methods: {
    sendVerifyCodeEmail,
    checkVerifyCodeEmail,
    sendCode() {
      this.checkVerifyCodeEmail(this.verifyCode)
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>