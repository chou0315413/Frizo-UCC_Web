<template>
  <div class="API">
    <button @click.prevent="sendFollowedSetting(true)">true</button>
    <button @click.prevent="sendFollowedSetting(false)">false</button>
  </div>
</template>  
<script>
import { userFollowedSetting } from "@/api/user";

export default {
  name: "API",

  data() {
    return { setting: true };
  },

  methods: {
    sendFollowedSetting(setting) {
      console.log(typeof setting);
      console.log(setting);
      userFollowedSetting(setting)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>