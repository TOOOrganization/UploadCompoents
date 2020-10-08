<template>
  <div>12312313
    <textarea
      :rows="10"
      v-model="text"
      @change="convertText">
    </textarea>
    <textarea
      :rows="10"
      v-model="html">
    </textarea>
    <div id="d"
         contenteditable="true"
         v-html="html"
         class="text"
         style="min-width: 500px; min-height: 300px; background-color: lightgrey"
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
    },
    convertHtml() {
      this.html = document.getElementById("d").innerHTML;
    }
  },
  mounted() {
    //创建实例
    this.converter = new showdown.Converter();
  }
}
</script>

<style scoped>
  @import "../css/sspai.css";
</style>
