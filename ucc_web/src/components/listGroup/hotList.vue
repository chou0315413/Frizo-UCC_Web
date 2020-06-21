<template>
  <div class="hotList">
    <div class="activity">
      <div class="item" v-for="index in hotList" :key="index">
        <div class="imgBox">
          <img :src="index.img" class="itemImg" />
        </div>
        <div class="itemContent">
          <div class="activityOwnUser">● 社團名稱</div>
          <div class="activityCreatedDate">6月10號 20:25</div>
          <div class="itemTitle">
            <b>{{index.title}}</b>
          </div>
          <div class="tag">
            <!-- <el-tag
              v-for="tag in tags"
              :key="tag.label"
              :type="tag.type"
              class="ml-2 mt-2"
            >{{ tag.label }}</el-tag>-->
            <span v-for="tag in tags" :key="tag.label" :type="tag.type">#{{ tag.label }}</span>
          </div>
          <div class="itemIntroduction mb-4">
            <div class="description">{{index.message}}</div>
          </div>
          <!-- <div class="divider"></div> -->
          <div class="maxJoinPeople">人{{index.joinPeople}}人</div>
          <div class="place">地 台北商業大學</div>
          <div class="activityDate">時{{index.deadline}}</div>
          <div class="message">訊 30</div>
          <div class="like">愛 15</div>
        </div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotList",
  data() {
    return {
      tags: [
        { type: "info", label: "熱舞" },
        { type: "info", label: "談得賽" },
        { type: "info", label: "哇哈哈" },
        { type: "info", label: "朵茉莉扣" },
        { type: "info", label: "kn44" }
      ],
      hotList: [
        {
          index: 1,
          title: "聯網未來挑戰賽(hotList)",
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
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr); */
}

.item {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  height: 250px;
  width: 100%;
  background-color: #ffffff;
  margin-top: 5px;
  /* border-bottom: 1px solid #707070; */
  padding-left: 1%;
  padding-right: 1%;
}
/* .item:nth-child(odd) {
  margin-right: 10px;
}
.item:nth-child(even) {
  margin-left: 10px;
} */

/* .item:hover {
  box-shadow: 0 0 15px #2e2e2e;
  transition: all 0.2s ease-in;
  transform: scale(1.01);
} */

.imgBox {
  padding: 5px;
  grid-column: 1/2;
  grid-row: 1/2;
}

.itemImg {
  height: 100%;
  width: 100%;
}

.itemContent {
  grid-column: 2/4;
  grid-row: 1/2;
  padding: 0px 15px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.activityOwnUser {
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  align-items: center;
}

.activityCreatedDate {
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  align-items: center;
}

.itemTitle {
  /* font-size: 12px; */
  grid-column: 1/4;
  grid-row: 2/3;
  display: flex;
  align-items: center;
  text-align: left;
}

.tag {
  position: relative;
  top: -5px;
  grid-column: 4/6;
  grid-row: 2/3;
  color: #ea7807;
  opacity: 0.8;
}

.itemIntroduction {
  text-align: left;
  grid-column: 1/6;
  grid-row: 3/5;
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

.itemTitle b:hover {
  text-decoration: underline;
  cursor: pointer;
}

.divider {
  position: relative;
  border-bottom: 1px #aaaaaa solid;
  grid-column: 1/4;
  grid-row: 1/2;
  width: 100%;
  height: 1px;
  top: 100%;
}

.maxJoinPeople {
  text-align: left;
  grid-column: 1/2;
  grid-row: 5/6;
}

.activityDate {
  grid-column: 2/3;
  grid-row: 5/6;
  text-align: left;
}

.place {
  grid-column: 3/4;
  grid-row: 5/6;
  text-align: left;
}

.message {
  grid-column: 4/5;
  grid-row: 5/6;
  text-align: left;
}

.like {
  grid-column: 5/6;
  grid-row: 5/6;
  text-align: left;
}

@media (max-width: 650px) {
  .itemTitle {
    font-size: 22px;
  }
}
</style>
