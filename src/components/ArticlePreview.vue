<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image">
      </a>
      <div class="info">
        <router-link
          href="#"
          class="author"
          :to="'/@' + article.author.username"
        >{{article.author.username}}</router-link>
        <span class="date">{{formattedDate}}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        @click="setFavArticle"
        :class="article.favorited ? 'active' : ''"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <a href="#" class="preview-link" @click="viewArticle">
      <h1>{{ article.title }}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["article"],
  data() {
    return {};
  },
  computed: {
    formattedDate() {
      return moment(this.article.createdAt).format("MMMM Do, YYYY");
    }
  },
  methods: {
    viewArticle() {
      this.$router.push({
        path: `/article/${this.article.slug}`
      });
    },
    async setFavArticle() {
      if (this.$store.getters["users/user"] === null) {
        alert("Please Sign in to save favorite.");
        return;
      }
      try {
        var resarticle;
        if (this.article.favorited) {
          resarticle = await this.$store.dispatch(
            "articles/unfavArticle",
            this.article.slug
          );
        } else {
          resarticle = await this.$store.dispatch(
            "articles/favArticle",
            this.article.slug
          );
        }
        this.$set(this.article, "favoritesCount", resarticle.favoritesCount);
        this.$set(this.article, "favorited", resarticle.favorited);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    }
  }
};
</script>
