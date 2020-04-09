<template>
  <div class="ContentList mt-4">
    <!-- <nav aria-label="breadcrumb" class="float-right titieList">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="listPrint='hotList'">
          <a href="#">熱門</a>
        </li>
        <li class="breadcrumb-item" @click="listPrint='newList'">
          <a href="#">最新</a>
        </li>
        <li class="breadcrumb-item" @click="listPrint='followList'">
          <a href="#">追蹤</a>
        </li>
      </ol>
    </nav>-->

    <keep-alive>
      <component :is="listPrint"></component>
    </keep-alive>

    <!-- <div class="block mt-3">
      <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
    </div>-->

    <!-- <div class="item">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 imgBox">
            <img
              src="https://exfast.me/wp-content/uploads/2019/04/1554182762-cddf42691119d44059a16a4095047a33-1140x600.jpg"
              class="itemImg"
            />
          </div>
          <div class="col-lg-9 itemContent">
            <h3 class="itemTitle mb-3">活動主題，名稱。</h3>
            <div class="itemIntroduction mb-4">
              <h6>內容大綱介紹內容大綱介紹內紹內容大綱介紹大容大綱介紹內容大容大綱容大綱介紹內容大容大容大綱介紹內容大容大容大綱介紹內容大容大容大綱介紹內容大容大容大綱介紹內容大容大容大綱介紹內容大容大介紹內容大綱介</h6>
            </div>
            <div class="itemAttention">
              關注度：12
              <br />留言數：23
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
// import hotList from "@/components/listGroup/hotList";
// import newList from "@/components/listGroup/newList";
import followList from "@/components/listGroup/followList";

export default {
  name: "ContentList",
  components: {
    // hotList,
    // newList,
    followList
  },
  data() {
    return {
      listPrint: "followList"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ContentList {
  position: relative;
  margin: auto;
  width: 900px;
}
/* .titieList {
  position: absolute;
  top: -25px;
  right: 10px;
} */
/* .breadcrumb {
  background-color: #ffffff;
} */
</style>
