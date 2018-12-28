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
                  v-model="title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
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
                    v-for="(tagName,index) in taglist"
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
  async created() {
    let slug = this.$route.params.article_slug;
    try {
      let article = await this.$store.dispatch(
        "articles/getSingleArticle",
        slug
      );
      this.slug = article.slug;
      this.title = article.title;
      this.description = article.description;
      this.body = article.body;
      this.taglist = article.tagList;
    } catch (e) {
      this.errors.push(e);
    }
  },
  data() {
    return {
      slug: "",
      title: "",
      description: "",
      body: "",
      taglist: [],
      msg: "",
      tag: "",
      errors: []
    };
  },
  methods: {
    pushTag() {
      this.taglist = [...this.taglist, this.tag];
      this.tag = "";
    },
    removeTag(inx) {
      this.tagList.splice(inx, 1);
    },
    publishArticle: async function() {
      try {
        let response = await api.put(`/articles/${this.slug}`, {
          title: this.title,
          body: this.body,
          description: this.description,
          tagList: this.taglist
        });
        this.$router.push(`/article/${response.data.article.slug}`);
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
