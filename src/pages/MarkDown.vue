<template>
  <div>
    <textarea :rows="10" v-model="text" @change="convertText"></textarea>
    <textarea :rows="10" v-model="html"></textarea>
    <div id="d"
         contenteditable="true"
         class="text"
         style="min-width: 10px; min-height: 300px;"
         @input="convertHtml">
      <el-row>
        <quill-editor
          v-model = "content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </el-row>
    </div>
  </div>
</template>

<script>
import showdown from 'showdown'

export default {
  name: "MarkDown",
  data() {
    return {
      content: '',
      editorOption:{},
      html: '',
      text: '',
      converter: {}
    }
  },
  components: {
    showdown
  },
  methods: {
    onEditorBlur(editor){

    },
    onEditorFocus(editor){

    },
    onEditorChange(editor,html,text){

    },
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
