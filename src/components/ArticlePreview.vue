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
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
  computed: {
    formattedDate() {
      return moment(this.article.createdAt).format("MMMM Do, YYYY");
    }
  },
  methods: {
    viewArticle() {
      this.$router.replace(`/article/${this.article.slug}`);
    }
  }
};
</script>
