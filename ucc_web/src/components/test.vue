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
        <input type="radio" name="direction" value="ASC" v-model="searchOwnActivity.direction" />升序
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
  </div>
</template>

<script>
import { searchOwnEvent } from "@/api/event";
export default {
  data() {
    return {
      searchOwnActivity: {
        pageNumber: 0,
        sortBy: "",
        direction: ""
      },

      searchResult: ["nothing.."]
    };
  },

  methods: {
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
    }
  }
};
</script>

<style>
</style>
