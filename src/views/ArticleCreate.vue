<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h5 class="text-xs-center">{{msg}}</h5>
          <ul class="error-messages">
            <li :key="error.message" v-for="error in errors">{{ error.message }}</li>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags and press enter"
                  v-model="tag"
                  @keyup.enter.space="pushTag"
                >
                <div class="tag-list">
                  <a
                    href="#"
                    style="text-decoration:none"
                    class="tag-pill tag-default"
                    @click="removeTag(index)"
                    v-for="(tagName,index) in article.tagList"
                    :key="index"
                  >{{tagName}}</a>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "./../store/api.js";
export default {
  data() {
    return {
      msg: "",
      tag: "",
      errors: [],
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    };
  },
  methods: {
    pushTag() {
      this.article.tagList.push(this.tag);
      this.tag = "";
    },
    removeTag(inx) {
      this.article.tagList.splice(inx, 1);
    },
    publishArticle: async function() {
      try {
        await api.post("/articles", this.article);
        this.msg = "Article Posted Successfully.";
        this.article.title = "";
        this.article.description = "";
        this.article.body = "";
        this.article.tagList = [];
      } catch (e) {
        this.errors.push(e.message);
        throw e;
      }
    }
  }
};
</script>

<style scoped>
</style>
