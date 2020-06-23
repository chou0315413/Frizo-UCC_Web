<template>
  <div class="content">
    <div class="banner mt-3">
      <Banner></Banner>
    </div>
    <div class="activityList">
      <div class="selectList" ref="selectList4Event">
        <!-- <el-radio-group v-model="radio" @change="changeList" style="display:none;">
          <el-radio :label="1">
            <b>熱門</b>
          </el-radio>
          <el-radio :label="2">
            <b>最新</b>
          </el-radio>
          <el-radio :label="3">
            <b>追蹤</b>
          </el-radio>
        </el-radio-group>-->
        <!-- {{this.radio}} -->
        <div class="listBtnGroup">
          <div class="listBtn" :class="{active:radio==1}">
            <span @click.prevent="changeList(1)">熱門</span>
          </div>
          <div class="listBtn" :class="{active:radio==2}">
            <span @click.prevent="changeList(2)">最新</span>
          </div>
          <div class="listBtn" :class="{active:radio==3}">
            <span @click.prevent="changeList(3)">追蹤</span>
          </div>
        </div>
      </div>
      <keep-alive>
        <component :is="listPrint"></component>
      </keep-alive>
      <div class="mt-3">
        <el-button type="primary" round class="mb-3">更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import hotList from "@/components/listGroup/hotList";
import newList from "@/components/listGroup/newList";
import followList from "@/components/listGroup/followList";

export default {
  name: "Content",

  components: {
    Banner,
    hotList,
    newList,
    followList
  },

  data() {
    return {
      listPrint: "hotList",
      radio: 1,
      selectListHeight: "",
      curHeight: "",
      Height: "",
      changeHeight: ""
    };
  },

  methods: {
    changeList(val) {
      if (val == 1) {
        this.radio = 1;
        this.listPrint = "hotList";
      } else if (val == 2) {
        this.radio = 2;
        this.listPrint = "newList";
      } else if (val == 3) {
        this.radio = 3;
        this.listPrint = "followList";
      }
    },
    // selectList Function
    selectListFix() {
      this.curHeight = window.pageYOffset;
      if (this.curHeight > this.changeHeight) {
        this.selectList.classList.add("selectFix");
      } else {
        this.selectList.classList.remove("selectFix");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.selectListFix, true);
    this.selectList = this.$refs.selectList4Event;

    // 偵測selectList 物件高度
    this.selectListHeight = this.selectList.offsetTop;
    // 計算selectList與使用者窗口的高度
    this.Height = this.selectListHeight - this.curHeight;
    // 計算要Fixed的高
    this.changeHeight = this.Height - 62;
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
.content {
  position: relative;
  top: 50px;
  margin: auto;
  width: 900px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 15px;
}
.banner {
  position: relative;
  padding-top: 7px;
}
/* .activityList {
  margin: auto;
  width: 900px;
  box-sizing: border-box;
} */
.selectList {
  text-align: right;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: auto auto 200px;
  grid-template-rows: 100%;
  /* height: 35px; */
}
.listBtnGroup {
  position: relative;
  grid-row: 1/2;
  grid-column: 3/4;
  display: grid;
  grid-template-columns: auto auto auto 20px;
  grid-template-rows: 100%;
  margin-top: 5px;
}
.listBtn {
  text-align: center;
  font-size: 20px;
}
.listBtn span:hover {
  cursor: pointer;
}
.active {
  border-bottom: 2px rgb(255, 155, 23) solid;
}
/* .selectFix {
  text-align: right;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px #000000;
  height: 35px;
  padding-top: 8px;
  padding-right: 10px;
  position: fixed;
  width: 900px;
  top: 62px;
  z-index: 5;
} */

@media (max-width: 995px) {
  .activityList {
    width: 750px;
  }
}

@media (max-width: 837px) {
  .activityList {
    width: 100%;
  }
}

/* @media (max-width: 650px) {
  .activityList {
    width: 450px;
  }
}

@media (max-width: 450px) {
  .activityList {
    width: 300px;
  }
} */
</style>
