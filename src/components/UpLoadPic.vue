<template>
  <canvas id="QRCode" ref="QRCode" :data ="data" :width="size" :height="size">
  </canvas>
</template>

<script>

    export default {
        name: "UpLoadPic",
      props: {
        data: {
          type: String,
          default:  ""
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
            let map = [];
            let length = data.length;
            let amount = Math.sqrt(length);
            for (let i = 0; i < length; i++){
              map[i % amount] = map[i % amount] || [];
              map[i % amount][Math.floor(i / amount)] = data.substr(i, 1) !== "0";
            }
            let canvas = this.$refs.QRCode;
            let w = canvas.width;
            let h = canvas.height;
            let dw = w / amount, dh = h / amount;
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            let x = 0, y = 0;
            for (let i = 0; i < length; i++){
              x = i % amount;
              y = Math.floor(i / amount);
              if (map[x][y]){
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.fillRect(x * dw, y * dh, dw, dh);
              }
            }
          }
      }
    }
</script>

<style scoped>

</style>
