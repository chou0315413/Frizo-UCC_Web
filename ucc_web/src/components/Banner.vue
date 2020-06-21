<template>
  <div class="banner">
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item, index) in photoList" :key="index">
        <img class="picture" :src="item.url" />
      </el-carousel-item>
    </el-carousel>-->

    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in photoList" :key="index">
        <img class="picture" :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      photoList: [
        {
          url: require("@/assets/banner/1.jpg")
        },
        {
          url: require("@/assets/banner/2.jpg")
        },
        {
          url: require("@/assets/banner/3.jpg")
        }
      ]
    };
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__container {
  height: 260px;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

.picture {
  width: 100%;
  height: 100%;
}

/* .banner {
  margin: 120px auto 10px auto;
  width: 900px;
} */
@media (max-width: 995px) {
  .banner {
    width: 750px;
  }
}
@media screen and (max-width: 837px) {
  .banner {
    margin: 50px auto 0 auto;
    width: 100%;
    height: auto;
  }
  .picture {
    height: auto;
  }
}
</style>