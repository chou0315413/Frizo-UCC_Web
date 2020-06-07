<template>
  <div class="user">
    <Navbar></Navbar>

    <div class="title">
      <h1>Find Event Part</h1>
    </div>

    <hr />

    <div class="main">
      <p>主要</p>

      <form>
        <div>
          <label>關鍵字</label>
          <input type="text" v-model="searchSpec.keywords" />
        </div>

        <div>
          <label>頁數</label>
          <input type="number" v-model="searchSpec.pageNumber" />
        </div>

        <div>
          <label>活動發表時間起始</label>
          <input type="date" v-model="searchSpec.createTimeA" />
          <label>活動發表時間結束</label>
          <input type="date" v-model="searchSpec.createTimeB" />
        </div>

        <div>
          <label>活動開始時間起始</label>
          <input type="date" v-model="searchSpec.startTimeA" />
          <label>活動開始時間結束</label>
          <input type="date" v-model="searchSpec.startTimeB" />
        </div>

        <div>
          <label>報名開始時間起始</label>
          <input type="date" v-model="searchSpec.registrationDeadlineA" />
          <label>報名開始時間結束</label>
          <input type="date" v-model="searchSpec.registrationDeadlineB" />
        </div>

        <div>
          <label>依照以下排序:</label>
          <label>
            <input type="radio" name="sortBy" value="createdAt" checked v-model="searchSpec.sortBy" />發表時間
          </label>
          <label>
            <input type="radio" name="sortBy" value="likes" v-model="searchSpec.sortBy" />熱度
          </label>
          <label>
            <input type="radio" name="sortBy" value="eventStartTime" v-model="searchSpec.sortBy" />活動開始時間
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="registrationDeadline"
              v-model="searchSpec.sortBy"
            />報名截止時間
          </label>
        </div>

        <div>
          <label>選擇升降序:</label>
          <label>
            <input
              type="radio"
              name="direction"
              value="DESC"
              v-model="searchSpec.direction"
              checked
            />降序
          </label>
          <label>
            <input type="radio" name="direction" value="ASC" v-model="searchSpec.direction" />升序
          </label>
        </div>

        <div>
          <input type="submit" value="search" @click.prevent="sendQuery" />
        </div>
      </form>

      <div>
        <ul>
          <li v-for="(item, index) in searchResult" :key="item">
            <div :id="index">{{item}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/base/Navbar";
import { findEvent } from "@/api/event";
export default {
  data() {
    return {
      searchSpec: {
        keywords: "",
        pageNumber: 0,
        createTimeA: null,
        createTimeB: null,
        startTimeA: null,
        startTimeB: null,
        registrationDeadlineA: null,
        registrationDeadlineB: null,
        direction: "DESC",
        sortBy: "createdAt"
      },

      searchResult: ["nothing.."]
    };
  },

  methods: {
    sendQuery() {
      findEvent(this.searchSpec)
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
    }
  },

  components: {
    Navbar: navbar
  }
};
</script>

<style>
.title {
  margin-top: 50px;
}

.main {
  margin-top: 50px;
}
</style>
