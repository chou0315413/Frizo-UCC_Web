<template>
  <div class="ContentList mt-4">
    <div class="selectList">
      <el-radio-group v-model="radio" @change="changeList">
        <el-radio :label="1">
          <b>熱門</b>
        </el-radio>
        <el-radio :label="2">
          <b>最新</b>
        </el-radio>
        <el-radio :label="3">
          <b>追蹤</b>
        </el-radio>
      </el-radio-group>
    </div>
    <keep-alive>
      <component :is="listPrint"></component>
    </keep-alive>
    <div>
      <el-button type="primary" round class="mb-3">更多</el-button>
    </div>
  </div>
</template>

<script>
import hotList from "@/components/listGroup/hotList";
import newList from "@/components/listGroup/newList";
import followList from "@/components/listGroup/followList";

export default {
  name: "ContentList",

  components: {
    hotList,
    newList,
    followList
  },

  data() {
    return {
      listPrint: "hotList",
      radio: 1
    };
  },

  methods: {
    changeList(val) {
      if (val == 1) {
        this.listPrint = "hotList";
      } else if (val == 2) {
        this.listPrint = "newList";
      } else if (val == 3) {
        this.listPrint = "followList";
      }
    }
  }

  // mounted() {
  //   if (this.radio === 1) {
  //     this.listPrint = hotList;
  //   } else if (this.radio === 2) {
  //     this.listPrint = newList;
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ContentList {
  position: relative;
  margin: auto;
  width: 900px;
  box-sizing: border-box;
}
.selectList {
  text-align: right;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px #000000;
  height: 35px;
  padding-top: 8px;
  padding-right: 10px;
}

@media (max-width: 995px) {
  .ContentList {
    width: 750px;
  }
}

@media (max-width: 837px) {
  .ContentList {
    width: 100%;
  }
}

/* @media (max-width: 650px) {
  .ContentList {
    width: 450px;
  }
}

@media (max-width: 450px) {
  .ContentList {
    width: 300px;
  }
} */
</style>
