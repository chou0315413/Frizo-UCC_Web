<template>
  <div class="followList">
    <div class="activity">
      <div class="item" v-for="index in followList" :key="index">
        <div class="imgBox">
          <img :src="index.img" class="itemImg" />
        </div>
        <div class="itemContent">
          <div class="itemTitle">
            <b>{{index.title}}</b>
          </div>
          <div class="itemIntroduction mb-4">
            <div class="description">{{index.message}}</div>
          </div>
          <div class="divider"></div>
          <div class="deadline">活動截止日期：{{index.deadline}}</div>
          <div class="joinPeople mt-2">目前參加人數：{{index.joinPeople}}人</div>
          <div class="tag">
            <el-tag
              v-for="tag in tags"
              :key="tag.label"
              :type="tag.type"
              class="ml-2 mt-2"
            >{{ tag.label }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "followList",
  data() {
    return {
      tags: [
        { type: "info", label: "熱舞" },
        { type: "info", label: "談得賽" },
        { type: "info", label: "哇哈哈" },
        { type: "info", label: "朵茉莉扣" },
        { type: "info", label: "kn44" }
      ],
      followList: [
        {
          index: 1,
          title: "聯網未來挑戰賽(follow)",
          message:
            "快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!快來參加!",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img:
            "https://files.bountyhunter.co/contest/public/202004/f5eac69d-0e16-46f9-b228-f75a15f77c3c_640x640.png"
        },
        {
          index: 2,
          title: "「舜間發現愛，興善攝光彩」廟會創意攝影與創",
          message:
            "木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人木頭人!",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img:
            "https://files.bountyhunter.co/contest/public/202004/8ae04293-cd11-40d0-9040-d7578369dcd6_640x640.png"
        },
        {
          index: 3,
          title: "WHO需要你的關心？關懷譚先生大賽",
          message:
            "火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人火星人",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img:
            "https://files.bountyhunter.co/contest/public/202004/91e55cfd-2414-4230-a830-9adf72a980a2_640x640.jpg"
        },
        {
          index: 4,
          title: "藝術智能之「我眼中的抗疫英雄」創作繪畫比賽",
          message:
            "隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的隨機的",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img:
            "https://files.bountyhunter.co/contest/public/202004/7e4ebc1b-1ff2-4e8b-aa8d-7fc42cf045e4_640x640.png"
        },
        {
          index: 5,
          title: "109年使用牌照稅網路有獎徵答",
          message: "快來參加!",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img:
            "https://files.bountyhunter.co/contest/public/202004/9773bdd1-948f-4d66-9cde-0c1854f3a51f_640x640.png"
        },
        {
          index: 6,
          title: "熱舞社期末展",
          message: "不見不散!",
          deadline: "8月8號",
          joinPeople: "12",
          tag: "",
          img: "/def"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.item {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 450px;
  width: 430px;
  box-shadow: 0 0 3px #2e2e2e;
  background-color: #ffffff;
  margin: 10px auto;
  box-sizing: content-box;
}

.item:hover {
  /* border: 1px #acacac solid; */
  box-shadow: 0 0 15px #2e2e2e;
  transition: all 0.5s ease-in;
}

.imgBox {
  padding: 5px;
  grid-column: 1/9;
  grid-row: 1/5;
}

.itemImg {
  height: 100%;
  width: 100%;
}

.itemContent {
  grid-column: 1/9;
  grid-row: 5/9;
  padding: 0px 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.itemTitle {
  font-size: 22px;
  grid-column: 1/5;
  grid-row: 1/2;
  text-align: left;
}

.itemTitle b:hover {
  text-decoration: underline;
}

.itemIntroduction {
  text-align: left;
  grid-column: 1/5;
  grid-row: 2/4;
  height: 35px;
}

/* 省略文字 */
/* 和chat.vue的省略文字寫法有些許差異 */
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.divider {
  position: relative;
  top: -2px;
  grid-column: 1/5;
  grid-row: 4/5;
  border-top: 1px #aaaaaa solid;
}

.deadline {
  grid-column: 1/3;
  grid-row: 4/5;
  text-align: left;
}

.joinPeople {
  text-align: left;
  grid-column: 1/3;
  grid-row: 4/5;
  position: relative;
  top: 50%;
}

.tag {
  position: relative;
  top: -5px;
  grid-column: 3/5;
  grid-row: 4/6;
}

@media (max-width: 650px) {
  .itemTitle {
    font-size: 22px;
  }
}
</style>
