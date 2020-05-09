<template>
  <div>
    <h1>測試改密碼(需要先登入) ..</h1>

    <div>
      <form id="cpwd">
        舊密碼: <input v-model="oldPassword"/>
        新密碼: <input v-model="newPassword"/>
        新密碼: <input v-model="newPasswordConfirm"/>
        <button @click.prevent="changePwd">改密碼</button>
      </form>
    </div>

    <hr>

    <h1>測試忘記密碼(不需要登入) ..</h1>

    <div>
      <form id="fpwd">
        Email: <input v-model="email"/>
        <button @click.prevent="sendVerifyEmail">寄出驗證確認信</button>
        新密碼: <input v-model="password"/>
        驗證碼: <input v-model="verifyCode"/>
        <button @click.prevent="resetPwd">送出</button>
      </form>
    </div>
  </div>
</template>

<script>
import { changePassword, sendForgotPasswordEmailVerify, resetPassword } from "@/api/auth";
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      email: '',
      password: '',
      verifyCode: '',
    }
  },

  methods: {
    ...mapActions({
      setToken: 'auth/login'
    }),

    changePwd() {
      if (this.newPassword == '' || this.oldPassword == ''){
        alert("未輸入資料");
        return;
      }
      if(this.newPassword != this.newPasswordConfirm){
        alert("兩次密碼輸入不符合");
        return;
      }
      let request = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      changePassword(request)
              .then(resp =>{
                console.log(resp.data);
                let token = {
                  tokenType: resp.data.tokenType,
                  accessToken: resp.data.accessToken
                };
                if (resp.data.success){
                  this.setToken(token)
                }else{
                  alert('修改成功')
                }
              })
              .catch(error => {
                console.log(error)
              });
    },

    sendVerifyEmail(){
      if (this.email != null){
        sendForgotPasswordEmailVerify(this.email)
                .then(resp =>{
                  console.log(resp.data)
                })
                .catch(error => {
                  console.log(error)
                });
      }else {
        alert("未輸入 email.")
      }
    },

    resetPwd(){
      if(this.email == '' || this.password == '' || this.verifyCode == ''){
        alert("資料輸入不完整");
        return;
      }
      let request = {
        email: this.email,
        password: this.password,
        verifyCode: this.verifyCode
      };

      resetPassword(request)
              .then(resp =>{
                if (resp.data.success){
                  alert('密碼重製成功')
                }else{
                  alert(resp.data.message)
                }
                console.log(resp.data)
              })
              .catch(error => {
                console.log(error)
              });
    }
  }
};
</script>


<style scoped>
  #cpwd div {
    margin-bottom: 10px;
  }

  #fpwd div {
    margin-bottom: 10px;
  }
</style>