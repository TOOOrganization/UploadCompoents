<template>
  <canvas id="QRCode" ref="QRCode" :width="size" :height="size">
  </canvas>
</template>

<script>
    export default {
        name: "UpLoadPic",
      props: {
        data: {
          type: String,
          default:  "11111110000000001111111" +
                    "10000010000000001000001" +
                    "10111010000000001011101" +
                    "10111010000000001011101" +
                    "10111010000000001011101" +
                    "10000010000000001000001" +
                    "11111110000000001111111" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "00000000000000000000000" +
                    "11111110000000001111100" +
                    "10000010000000001000100" +
                    "10111010000000001010100" +
                    "10111010000000001000100" +
                    "10111010000000001111100" +
                    "10000010000000000000000" +
                    "11111110000000000000000"
        },
        size: {
          type: String,
          default: "200px"
        },
      },
      mounted() {
          this.showOn(this.data)
      },
      methods: {
          showOn(data) {
            let length = data.length;
            let amount = Math.sqrt(length);
            let canvas = this.$refs.QRCode;
            let w = canvas.width;
            let h = canvas.height;
            let dw = w / amount, dh = h / amount;
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < length; i++){
              if (data.substr(i, 1) !== "0"){
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.fillRect((i % amount) * dw, Math.floor(i / amount) * dh, dw, dh);
              }
            }
          }
      }
    }
</script>

<style scoped>

</style>
