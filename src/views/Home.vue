<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  v-if="username"
                  class="nav-link"
                  :class="{active: activeClass==='feed'}"
                  @click="setFeed"
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  :class="{active: activeClass==='global'}"
                  @click="setGlobal"
                >Global Feed</a>
              </li>
              <li class="nav-item" v-if="activeClass === 'tag'">
                <a class="nav-link disabled" :class="{active: activeClass==='tag'}">#{{selectedTag}}</a>
              </li>
            </ul>
          </div>
          <template v-if="activeClass === 'global'">
            <ArticlePreview :key="article.slug" v-for="article in articles" :article="article"></ArticlePreview>
          </template>
          <template v-if="username && (activeClass === 'feed')">
            <ArticlePreview :key="article.slug" v-for="article in feedArticles" :article="article"></ArticlePreview>
          </template>

          <template v-if="activeClass === 'tag'">
            <ArticlePreview :key="article.slug" v-for="article in tagArticles" :article="article"></ArticlePreview>
          </template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                href="#"
                class="tag-pill tag-default"
                @click="getTagedArticle(tag)"
                v-for="tag in tags"
                :key="tag"
              >{{tag}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  components: {
    ArticlePreview
  },
  created() {
    if (this.$store.getters["articles/articles"].length == 0)
      this.$store.dispatch("articles/getGlobalArticle", {});
    if (this.$store.getters["articles/tagList"].length == 0)
      this.$store.dispatch("articles/getTagList");
  },

  data() {
    return {
      activeClass: "global",
      selectedTag: "",
      tagArticles: [],
      feedArticles: []
    };
  },
  methods: {
    getTagedArticle: async function(tagName) {
      this.activeClass = "tag";
      this.selectedTag = tagName;
      try {
        const response = await this.$store.dispatch(
          "articles/getGlobalArticle",
          {
            tag: this.selectedTag
          }
        );
        this.tagArticles = response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    setGlobal() {
      this.activeClass = "global";
    },
    setFeed: async function() {
      if (this.activeClass !== "feed") {
        this.activeClass = "feed";
        await this.$store
          .dispatch("articles/getFeedArticle")
          .catch(e => console.log(e));
        this.feedArticles = this.$store.getters["articles/feedArticles"];
      }
    }
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
    },
    articles() {
      return this.$store.getters["articles/articles"];
    },
    tags() {
      return this.$store.getters["articles/tagList"];
    }
  }
};
</script>

<style scoped>
</style>
