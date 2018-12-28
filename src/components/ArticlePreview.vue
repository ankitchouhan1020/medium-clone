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
        :class="setFav ? '' : 'active'"
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
    return {
      setFav: true
    };
  },
  computed: {
    formattedDate() {
      return moment(this.article.createdAt).format("MMMM Do, YYYY");
    }
  },
  methods: {
    viewArticle() {
      this.$router.push({
        //name: "articleView",
        path: `/article/${this.article.slug}`
        // params: { articleDes: this.article }
      });
    },
    async setFavArticle() {
      if (this.setFav) {
        //let count = this.article.favoritesCount;
        this.$set(
          this.article,
          this.article.favoritesCount,
          this.article.favoritesCount + 1
        );
        try {
          let response = await this.$store.dispatch(
            "articles/favArticle",
            this.article.slug
          );
        } catch (e) {
          console.log(e.message);
          throw e;
        }
      } else {
        this.$set(
          this.article,
          this.article.favoritesCount,
          this.article.favoritesCount - 1
        );
        try {
          let response = await this.$store.dispatch(
            "articles/unfavArticle",
            this.article.slug
          );
        } catch (e) {
          console.log(e.message);
          throw e;
        }
      }
      this.setFav === true ? (this.setFav = false) : (this.setFav = true);
    }
  }
};
</script>
