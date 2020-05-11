<template>
  <!-- 此頁面分為圖片區及資料區，各佔12等頁面，利用row分開成上下層。 -->
  <div class="info">
    <div class="container userinfo">
      <div class="row">
        <div class="col-lg-12">
          <!-- 圖片區 -->
          <div class="photoGroup">
            <div class="row">
              <div class="col-lg-12">
                <div class="userBackgroundPhoto">
                  <img :src="userInfo.backgroundUrl" class="PhotoSize" />
                </div>
              </div>
            </div>
            <div class="row marginTop-100px">
              <div class="col-lg-3 userPhoto">
                <el-avatar :size="130" :src="userInfo.imgUrl"></el-avatar>
              </div>
            </div>
            <div class="row photoBtn">
              <div class="col-lg-2"></div>
              <div class="col-lg-2">
                <label class="btn btn-warning upDataPic">
                  <input
                    id="upload_img"
                    style="display:none;"
                    type="file"
                    v-on:change="onAvatarChange($event)"
                  />
                  <i class="fa fa-photo"></i>更新頭貼
                </label>
              </div>
              <div class="col-lg-5"></div>
              <div class="col-lg-3">
                <label class="btn btn-warning upDataPic">
                  <input
                    id="upload_img"
                    style="display:none;"
                    type="file"
                    v-on:change="onBackgroundChange($event)"
                  />
                  <i class="fa fa-photo"></i>更新背景圖
                </label>
              </div>
            </div>
          </div>
          <!-- 資料區 -->
          <div class="row infoBar">
            <!-- 左側選單列表 -->
            <div class="col-lg-2">
              <!-- 利用bootstarp套件，切換不同物件，需要注意id名稱必須對上。 -->
              <div class="list-group mt-3" id="list-tab" role="tablist">
                <a
                  class="list-group-item list-group-item-action active listCSS"
                  id="list-userinfo-list"
                  data-toggle="list"
                  href="#list-userinfo"
                  role="tab"
                  aria-controls="userinfo"
                >基本資料</a>
                <a
                  class="list-group-item list-group-item-action listCSS"
                  id="list-changePassword-list"
                  data-toggle="list"
                  href="#list-changePassword"
                  role="tab"
                  aria-controls="changePassword"
                >修改密碼</a>
              </div>
            </div>
            <!-- 右側畫面顯示區 -->
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-12">
                  <div class="tab-content" id="nav-tabContent">
                    <!-- userinfo區 -->
                    <div
                      class="tab-pane fade show active"
                      id="list-userinfo"
                      role="tabpanel"
                      aria-labelledby="list-userinfo-list"
                    >
                      <div class="inputGroup">
                        <div class="inputItem">
                          <div class="row">
                            <div class="col-lg-9">
                              <el-input placeholder="請輸入您的暱稱" v-model="userInfo.name">
                                <template slot="prepend">暱稱</template>
                              </el-input>
                            </div>
                            <div class="col-lg-3">
                              <el-select v-model="userInfo.gender" placeholder="性別">
                                <el-option
                                  v-for="item in genderOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                ></el-option>
                              </el-select>
                            </div>
                          </div>
                        </div>
                        <div class="inputItem">
                          <div class="row">
                            <div class="col-lg-10">
                              <el-input
                                placeholder="請輸入您的電子信箱"
                                :disabled="true"
                                v-model="userInfo.email"
                              >
                                <template slot="prepend">信箱</template>
                              </el-input>
                            </div>
                            <div class="col-lg-2">
                              <el-button
                                type="primary"
                                round
                                disabled
                                v-if="userInfo.emailVerified"
                              >驗證</el-button>
                              <router-link to="/user/emailverify" v-else>
                                <el-button type="primary" round>驗證</el-button>
                              </router-link>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <h6 class="textTitle">連絡電話及住址</h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="inputItem">
                              <el-input placeholder="請輸入您的連絡電話" v-model="userInfo.phoneNumber">
                                <template slot="prepend">電話</template>
                              </el-input>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="inputItem">
                              <el-input placeholder="請輸入您的聯絡地址" v-model="userInfo.address">
                                <template slot="prepend">地址</template>
                              </el-input>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <h6 class="textTitle">您的大學資訊</h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="inputItem">
                              <div class="row">
                                <div class="col-lg-3">
                                  <el-select v-model="userInfo.collageLocation" placeholder="縣市">
                                    <el-option
                                      v-for="item in countyOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                                    ></el-option>
                                  </el-select>
                                </div>
                                <div class="col-lg-9">
                                  <el-input placeholder="請輸入您的學校名稱" v-model="userInfo.collageName">
                                    <template slot="prepend">學校</template>
                                  </el-input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="inputItem">
                              <div class="row">
                                <div class="col-lg-9">
                                  <el-input placeholder="請輸入您的科系名稱" v-model="userInfo.majorSubject">
                                    <template slot="prepend">科系</template>
                                  </el-input>
                                </div>
                                <div class="col-lg-3">
                                  <el-select v-model="userInfo.grade" placeholder="年級">
                                    <el-option
                                      v-for="item in gradeOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="inputItem">
                              <div class="row">
                                <div class="col-lg"></div>
                                <div class="col-lg-2">
                                  <el-button type="primary" round @click.prevent="sendUserInfo">更新</el-button>
                                </div>
                                <div class="col-lg mt-2 respond">{{respond}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- changePassword區 -->
                    <div
                      class="tab-pane fade"
                      id="list-changePassword"
                      role="tabpanel"
                      aria-labelledby="list-changePassword-list"
                    >
                      <div class="container mt-3">
                        <div class="row">
                          <div class="col-lg-12">
                            <h5>修改密碼</h5>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-lg-12">
                            <el-input placeholder="請輸入您的舊密碼" v-model="changePassword.oldPassword">
                              <template slot="prepend">舊密碼</template>
                            </el-input>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-lg-12">
                            <el-input placeholder="請輸入您的新密碼" v-model="changePassword.newPassword">
                              <template slot="prepend">新密碼</template>
                            </el-input>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-lg-12">
                            <el-input
                              placeholder="確認您的新密碼"
                              v-model="changePassword.newPasswordConfirm"
                            >
                              <template slot="prepend">確認新密碼</template>
                            </el-input>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="col-lg"></div>
                          <div class="col-lg-4">{{this.changePassword.changePasswordRespond}}</div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-lg-12">
                            <h5>更改後密碼應詳記，並每3個月更換一次。</h5>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-lg"></div>
                          <div class="col-lg-2">
                            <el-button type="primary" round @click.prevent="changePwd">確定</el-button>
                          </div>
                          <div class="col-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { authenticated } from "@/utils/AuthStore";
import {
  updateUserInfo,
  updateUserAvatar,
  updateProfileBackground
} from "@/api/user";
import { changePassword } from "@/api/auth";

export default {
  name: "Info",
  data() {
    return {
      respond: "",

      // 修改密碼區使用之資料
      changePassword: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
        changePasswordRespond: ""
      },

      genderOptions: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],

      countyOptions: [
        {
          value: "台北市",
          label: "台北市"
        },
        {
          value: "新北市",
          label: "新北市"
        },
        {
          value: "基隆市",
          label: "基隆市"
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
      logout: "auth/logout",
      updateUserState: "user/setUserInfoFromObj",
      setToken: "auth/login"
    }),

    // userInfo
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
          if (resp.data.success) {
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

    sendUserInfo() {
      updateUserInfo(this.userInfo)
        .then(res => {
          console.log(res.data);
          let userInfoUpdata = {
            userId: res.data.id,
            name: res.data.name,
            gender: res.data.gendere,
            phoneNumber: res.data.phoneNumber,
            address: res.data.addrss,
            collageLocation: res.data.collageLocation,
            collageName: res.data.collageName,
            majorSubject: res.data.majorSubject,
            grade: res.data.grade
          };
          this.updateUserState(userInfoUpdata);
          this.respond = "修改成功!";
        })
        .catch(err => {
          console.log(err);
          console.log("出錯");
          this.respond = "修改失敗";
        });
    },

    // changePassword
    changePwd() {
      // 判斷輸入欄位有無填寫
      if (
        this.changePassword.oldPassword == "" ||
        this.changePassword.newPassword == ""
      ) {
        this.changePassword.changePasswordRespond = "請輸入新舊密碼";
        return;
      }
      // 判斷兩次密碼有無成功匹配
      if (
        this.changePassword.newPassword !==
        this.changePassword.newPasswordConfirm
      ) {
        this.changePassword.changePasswordRespond = "確認密碼輸入錯誤";
        return;
      }
      let request = {
        oldPassword: this.changePassword.oldPassword,
        newPassword: this.changePassword.newPassword
      };
      changePassword(request)
        .then(resp => {
          console.log(resp.data);
          let token = {
            tokenType: resp.data.tokenType,
            accessToken: resp.data.accessToken
          };
          if (resp.data.success == false) {
            console.log("舊密碼輸入錯誤");
            this.changePassword.changePasswordRespond = "舊密碼輸入錯誤";
          } else {
            this.setToken(token);
            console.log("修改成功");
            this.changePassword.changePasswordRespond = "修改成功";
          }
        })
        .catch(err => {
          console.log(err);
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
  background-color: #eeeeee;
  height: 780px;
}

.listCSS {
  padding: 0px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.upDataPic {
  color: #ffffff;
  background-color: #ffbc04;
}

.userBackgroundPhoto {
  height: 200px;
  margin-top: 15px;
  margin-left: 0px;
}

.PhotoSize {
  height: 100%;
  width: 100%;
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

.photoGroup {
  position: relative;
  left: -15px;
}

.inputGroup {
  position: relative;
}

.inputItem {
  margin-top: 15px;
}

.el-select .el-input {
  width: 130px;
}

.textTitle {
  margin-top: 25px;
  text-align: left;
}

.respond {
  color: #ff5404;
}

.userinfo {
  width: 800px;
}
</style>
