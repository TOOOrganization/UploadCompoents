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
        skin:{
          type:String,
          default:"0"
        },
        color1:{
          type: String,
          default: "#FF0000"
        },
        color2:{
          type: String,
          default: "#0000FF"
        },
        image:{
          type: String,
          default: ""
        }
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
            ctx.fillStyle = "rgba(0, 0, 0, 1)";

            let x = 0, y = 0;
            for (let i = 0; i < length; i++){
              x = i % amount;
              y = Math.floor(i / amount);
              if (map[x][y]){
                if(this.skin === "0")
                  ctx.fillRect(x * dw, y * dh, dw, dh);
                else{
                  ctx.beginPath();
                  let ox = (x + 0.5) * dw, oy= (y + 0.5) * dh, radius = dw / 5 * 2;
                  ctx.arc(ox, oy, radius, 0, Math.PI * 2, false);
                  ctx.closePath();
                  ctx.fill();
                  if(this.skin === "2"){
                    if (x < amount - 1 && map[x+1][y]){
                      ctx.fillRect(ox, oy - radius, dw, radius * 2);
                    }
                    if (y < amount - 1 && map[x][y+1]){
                      ctx.fillRect(ox - radius, oy, radius * 2, dh);
                    }
                    if (x < amount - 1 && y < amount - 1 && map[x+1][y] && map[x][y+1] && map[x+1][y+1]){
                      ctx.fillRect(ox, oy, dw, dh);
                    }
                  }
                }

              }

            }

            ctx.globalCompositeOperation = "source-in"
            let gradient = ctx.createLinearGradient(0,0,w,h);
            gradient.addColorStop(0, this.color1);
            gradient.addColorStop(1, this.color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0,0, w, h);

            ctx.globalCompositeOperation = "source-over"
            let image = new Image();
            image.src = this.image;
            image.onload = function(){
              ctx.drawImage(image, w / 2 - dw * 5, h / 2 - dh * 5, dw * 9, dh * 9);
            }
          }
      }
    }
</script>

<style scoped>

</style>
