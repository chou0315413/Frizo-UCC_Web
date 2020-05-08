<template>
  <div class="emailVerifyPage">
    <div class="container mt-3">
      <div class="row justify-content-md-center">
        <div class="col-lg-9 verifyDiv">
          <div class="top">
            <h1 class="mt-3">信箱驗證</h1>
            <p>您即將進行信箱驗證，在驗證過後你可以擁有額外的權力：</p>
            <div class="list">
              <ul>
                <li>發佈貼文</li>
                <li>和好友私訊聊天</li>
                <li>能夠隨心所欲的調整網頁色調</li>
              </ul>
            </div>
            <hr />
            <p>請按下寄信按鈕，隨後至信箱收取信件並在下方輸入欄內輸入相應數字。</p>
            <el-input placeholder v-model="verifyCode" class="input">
              <template slot="prepend">驗證碼</template>
            </el-input>
            <br />
            <el-button type="primary" class="mb-4" @click.native="sendVerifyCodeEmail">寄信</el-button>
            <el-button type="primary" class="mt-4" @click.native="sendCode">送出</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendVerifyCodeEmail, checkVerifyCodeEmail } from "@/api/user";

export default {
  data() {
    return {
      verifyCode: ""
    };
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


<style scoped>
.emailVerifyPage {
  height: 100vh;
}

.verifyDiv {
  height: 500px;
  border: 1px #000000 solid;
  background-color: #ffffff;
}

.top {
  position: relative;
  top: 40px;
}

.list {
  width: 300px;
  margin: auto;
  text-align: left;
}

.input {
  width: 300px;
}
</style>