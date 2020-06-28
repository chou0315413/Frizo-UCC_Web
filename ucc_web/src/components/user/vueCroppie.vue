<template>
  <div>
    <input type="file" @change="croppie" />
    <vue-croppie
      ref="croppieRef"
      :enableResize="false"
      :enableOrientation="false"
      :mouseWheelZoom="true"
      :boundary="{ width: 450, height: 300}"
      :viewport="{ width:250, height:250, 'type':'circle' }"
    ></vue-croppie>

    <!-- the result -->
    <img class="resultImg" :src="cropped" />
    <button @click="crop">裁減</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      croppieImage: "",
      cropped: null
    };
  },
  methods: {
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };

      reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: "base64",
        size: { width: 250, height: 250 },
        format: "jpeg"
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
        console.log(this.croppieImage);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultImg {
  border-radius: 50%;
}
</style>