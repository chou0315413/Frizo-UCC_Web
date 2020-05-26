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
      <component :is="listPrint">123</component>
    </keep-alive>
  </div>
</template>

<script>
import hotListTEST from "@/components/test/hotListTEST";
import followListTEST from "@/components/test/followListTEST";

export default {
  name: "ContentList",

  components: {
    hotListTEST,
    followListTEST
  },

  data() {
    return {
      listPrint: "hotListTEST",
      radio: 1
    };
  },

  methods: {
    changeList(val) {
      if (val == 1) {
        this.listPrint = "hotListTEST";
      } else if (val == 2) {
        this.listPrint = "newListTEST";
      } else if (val == 3) {
        this.listPrint = "followListTEST";
      }
    }
  }
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
