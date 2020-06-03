<template>
  <div class="user">
    <Navbar></Navbar>

    <div class="title">
      <h1>Event Part</h1>
    </div>

    <hr />

    <div class="main">
      <p>主要</p>
      <form id="eventForm">
        <div>
          <label>標題</label>
          <input type="text" v-model="event.title" />
        </div>

        <div>
          <label>敘述</label>
          <textarea v-model="event.description"></textarea>
        </div>

        <div>
          <label>DM 宣傳海報</label>
          <input type="file" v-on:change="selectDM" />
        </div>

        <div>
          <label>參與人數上限</label>
          <input type="number" v-model="event.maxNumberOfPeople" />
        </div>

        <div>
          <label>活動報名截止日期</label>
          <input type="date" v-model="event.registrationDeadline" />
        </div>

        <div>
          <label>活動開始日期</label>
          <input type="date" v-model="event.eventStartTime" />
        </div>

        <div>
          <label>活動舉辦地點</label>
          <input type="text" v-model="event.place" />
        </div>

        <div>
          <label>活動報名費</label>
          <input type="number" v-model="event.fee" />
        </div>

        <div>
          <label>標籤(使用 , 隔開)</label>
          <input type="text" v-model="labelBuff" />
        </div>

        <div>
          <input type="button" value="送出" @click.prevent="sendCreateRequest" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/base/Navbar";
import { createEvent } from "@/api/event";

export default {
  data() {
    return {
      event: {
        title: "",
        description: "這是一個好玩的活動喔!(範本)",
        dmPicture: null,
        maxNumberOfPeople: 10,
        registrationDeadline: new Date().toISOString().substr(0, 10),
        eventStartTime: new Date().toISOString().substr(0, 10),
        place: "",
        fee: 0,
        labelNameList: []
      },

      labelBuff: []
    };
  },

  watch: {
    labelBuff(newVal, oldVal) {
      let labelSet = new Set();
      let labels = oldVal.split(",");
      for (var i = 0; i < labels.length; ++i) {
        labelSet.add(labels[i]);
      }
      this.event.labelNameList = [];
      labelSet.forEach(label => {
        this.event.labelNameList.push(label);
      });
    }
  },

  methods: {
    sendCreateRequest() {
      createEvent(this.event)
        .then(resp => {
          console.log(resp.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    selectDM(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      alert(files[0].name);
      this.event.dmPicture = files[0];
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
