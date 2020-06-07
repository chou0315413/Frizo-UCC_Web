<template>
  <div class="searchOwnEvent">
    <div>
      <label>頁數</label>
      <input type="number" v-model="searchSpec.pageNumber" />
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
        <input type="radio" name="sortBy" value="registrationDeadline" v-model="searchSpec.sortBy" />報名截止時間
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      OwnEvents: {
        pageNumber: 0,
        sortBy: "",
        direction: ""
      }
    };
  }
};
</script>

<style>
.searchOwnEvent {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>