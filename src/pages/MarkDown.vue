<template>
  <div>
    <textarea :rows="10" v-model="text" @change="convertText"></textarea>
    <textarea :rows="10" v-model="html"></textarea>
    <div id="d"
         contenteditable="true"
         class="text"
         style="min-width: 500px; min-height: 300px;"
         @input="convertHtml">
    </div>
  </div>
</template>

<script>
import showdown from 'showdown'
export default {
  name: "MarkDown",
  data() {
    return {
      html: '',
      text: '',
      converter: {}
    }
  },
  components: {
    showdown
  },
  methods: {
    convertText() {
      this.html = this.converter.makeHtml(this.text);
      document.getElementById("d").innerHTML = this.html;
    },
    convertHtml() {
      this.html = document.getElementById("d").innerHTML;
    }
  },
  mounted() {
    //创建实例
    this.converter = new showdown.Converter();
    this.converter.setOption('tables', true);
  }
}
</script>

<style scoped>
  @import "../css/sspai.css";
</style>
