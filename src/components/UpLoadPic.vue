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
          default:  ""
        },
        size: {
          type: String,
          default: "200px"
        },
        skin:{
          type:String,
          default: "default"
        },
        shape:{
          type:String,
          default: "default"
        },
        gradient:{
          type: Object,
          default: {
            direction: 0,
            colorMap: [
              [0, "rgba(255, 0, 0, 1)"],
              [1, "rgba(0, 0, 255, 1)"]
            ]
          }
        },
        baseColor:{
          type: String,
          default: "rgba(0, 0, 0, 1)"
        },
        image:{
          type: String,
          default: "none"
        },
        finish: {
          type: String,
          default: "false"
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
            ctx.fillStyle = this.baseColor;

            let x = 0, y = 0;
            for (let i = 0; i < length; i++){
              x = i % amount;
              y = Math.floor(i / amount);
              if (map[x][y]){
                switch (this.shape) {
                  case "default" : default :
                    ctx.fillRect(x * dw, y * dh, dw, dh);
                    break;
                  case "round" : case "cartoon" :
                    ctx.beginPath();
                    let ox = (x + 0.5) * dw, oy= (y + 0.5) * dh, radius = dw / 5 * 2;
                    ctx.arc(ox, oy, radius, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                    if (this.shape === "round") break;
                    if (x < amount - 1 && map[x+1][y]){
                      ctx.fillRect(ox, oy - radius, dw, radius * 2);
                    }
                    if (y < amount - 1 && map[x][y+1]){
                      ctx.fillRect(ox - radius, oy, radius * 2, dh);
                    }
                    if (x < amount - 1 && y < amount - 1 && map[x+1][y] && map[x][y+1] && map[x+1][y+1]){
                      ctx.fillRect(ox, oy, dw, dh);
                    }
                    break;
                }
              }
            }

            if (this.skin === "gradient"){
              ctx.globalCompositeOperation = "source-in"
              let gradient;
              this.gradient.direction = this.gradient.direction || 0;
              switch (this.gradient.direction){
                case 1 :gradient = ctx.createLinearGradient(0,h,w,0);break;
                case 2 :gradient = ctx.createLinearGradient(w/2,0,w/2,h);break;
                case 3 :gradient = ctx.createLinearGradient(w,h,0,0);break;
                case 4 :gradient = ctx.createLinearGradient(0,h/2,w,h/2);break;
                case 5 :gradient = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2, Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)));break;
                case 6 :gradient = ctx.createLinearGradient(w,h/2,0,h/2);break;
                case 0 : default:
                case 7 :gradient = ctx.createLinearGradient(0,0,w,h);break;
                case 8 :gradient = ctx.createLinearGradient(w/2,h,w/2,0);break;
                case 9 :gradient = ctx.createLinearGradient(w,0,0,h);break;
              }

              for (let i = 0 ;i < this.gradient.colorMap.length;i++) {
                gradient.addColorStop(this.gradient.colorMap[i][0], this.gradient.colorMap[i][1]);
              }
              ctx.fillStyle = gradient;
              ctx.fillRect(0,0, w, h);
            }

            if (this.image !== "none"){
              ctx.globalCompositeOperation = "source-over"
              let image = new Image();
              image.src = this.image;
              image.onload = function(){
                ctx.drawImage(image, w / 2 - dw * 5, h / 2 - dh * 5, dw * 9, dh * 9);
              }
            }

          }
      }
    }
</script>

<style scoped>

</style>
