<template>
  <div class="searchActivity">
    <div>
      <label>頁數</label>
      <input type="number" v-model="searchOwnActivity.pageNumber" />
    </div>

    <div>
      <label>依照以下排序:</label>
      {{this.searchOwnActivity.sortBy}}
      <label>
        <input
          type="radio"
          name="sortBy"
          value="createdAt"
          checked
          v-model="searchOwnActivity.sortBy"
        />發表日期
      </label>
      <label>
        <input
          type="radio"
          name="sortBy"
          value="registrationDeadline"
          v-model="searchOwnActivity.sortBy"
        />活動報名截止日期
      </label>
      <label>
        <input type="radio" name="sortBy" value="eventStartTime" v-model="searchOwnActivity.sortBy" />活動開始日期
      </label>
    </div>
    <div>
      <label>選擇升降序:</label>
      {{this.searchOwnActivity.direction}}
      <label>
        <input
          type="radio"
          name="direction"
          value="DESC"
          v-model="searchOwnActivity.direction"
          checked
        />降序
      </label>
      <label>
        <input type="radio" name="direction" value="ASC" v-model="searchOwnActivity.direction" />
        升序
      </label>
    </div>

    <button type="submit" @click.prevent="searchOwnActivitys">查詢</button>

    <div>
      <ul>
        <li v-for="(item, index) in searchResult" :key="item">
          <div :id="index">{{item}}</div>
        </li>
      </ul>
    </div>

    <hr />

    <div>
      <input type="number" v-model="uploadOwnActivity.eventId" />

      <input type="text" v-model="uploadOwnActivity.title" />

      <input type="text" v-model="uploadOwnActivity.description" />

      <input type="number" v-model="uploadOwnActivity.maxNumberOfPeople" />

      <!-- <input type="file" @change="selectDM" /> -->

      <input type="text" v-model="uploadOwnActivity.registrationDeadline" />

      <input type="text" v-model="uploadOwnActivity.eventStartTime" />

      <input type="text" v-model="uploadOwnActivity.place" />

      <input type="number" v-model="uploadOwnActivity.fee" />

      <input type="text" v-model="uploadOwnActivity.labelNameList" />

      <button type="submit" @click.prevent="uploadOwnActivitys">修改</button>
    </div>
    <!-- <input type="submit" @click.prevent="uploadOwnActivitys" value="修改" /> -->

    <hr />

    <div>
      <input type="text" v-model="deleteId.eventId" />

      <button type="submit" @click.prevent="deleteOwnActivitys">刪除</button>
    </div>
  </div>
</template>

<script>
import { searchOwnEvent, uploadOwnEvent, deleteOwnEvent } from "@/api/event";
export default {
  data() {
    return {
      searchOwnActivity: {
        pageNumber: 0,
        sortBy: "",
        direction: ""
      },

      uploadOwnActivity: {
        eventId: 0,
        title: "",
        description: "",
        maxNumberOfPeople: 0,
        dmPicture: null,
        registrationDeadline: new Date().toISOString().substr(0, 10),
        eventStartTime: new Date().toISOString().substr(0, 10),
        place: "",
        fee: 0,
        labelNameList: []
      },

      deleteId: {
        eventId: 0
      },

      searchResult: ["nothing.."]
    };
  },

  methods: {
    uploadOwnActivitys() {
      uploadOwnEvent(this.uploadOwnActivity)
        .then(resp => {
          if (resp.data.success) {
            this.searchResult = resp.data.result;
          } else {
            console.log(resp.data.message);
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    },

    searchOwnActivitys() {
      searchOwnEvent(this.searchOwnActivity)
        .then(resp => {
          if (resp.data.success) {
            this.searchResult = resp.data.result;
          } else {
            console.log(resp.data.message);
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    },

    deleteOwnActivitys() {
      deleteOwnEvent(this.deleteId)
        .then(resp => {
          if (resp.data.success) {
            this.searchResult = resp.data.result;
          } else {
            console.log(resp.data.message);
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    },

    // 照片匯入
    selectDM(e) {
      // 圖片上傳後端
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.uploadOwnActivity.dmPicture = files[0];
      // this.isAddPic = true;

      // // 圖片預覽
      // var input = event.target;
      // if (input.files) {
      //   var reader = new FileReader();
      //   reader.onload = e => {
      //     this.picPreview = e.target.result;
      //   };
      //   this.image = input.files[0];
      //   reader.readAsDataURL(input.files[0]);
      // }
    }
  }
};
</script>

<style>
</style>
