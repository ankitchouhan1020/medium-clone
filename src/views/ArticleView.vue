<template>
  <div class="article-page">
    <div class="banner">
      <div v-if="loading">
        <h4 class="container" style="text-align:center">Loading...</h4>
      </div>
      <div v-if="!loading" class="container">
        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <a href>
            <img :src="article.author.image">
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{formattedDate}}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="!loading" class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.description}}</p>
          <h2 id="introducing-ionic">{{article.title}}</h2>
          <p>{{article.body}}</p>
        </div>
      </div>

      <div class="tag-list">
        <a
          href="#"
          class="tag-pill tag-default"
          @click="viewTagArticleList(tag)"
          v-for="tag in article.tagList"
          :key="tag"
          style="text-decoration:none"
        >{{tag}}</a>
      </div>
      <hr>

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html">
            <img :src="article.author.image">
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{formattedDate}}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p
                class="card-text"
              >With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
              &nbsp;
              <a href class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p
                class="card-text"
              >With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img">
              </a>
              &nbsp;
              <a href class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  async created() {
    this.loading = true;
    let article = await this.$store.dispatch(
      "articles/getSingleArticle",
      this.$route.params.article_slug
    );
    this.article = article;
    this.loading = false;
  },
  name: "articleView",
  data() {
    return {
      article: null,
      loading: false
    };
  },
  computed: {
    formattedDate() {
      return moment(this.article.createdAt).format("MMMM Do, YYYY");
    }
  },
  methods: {
    viewTagArticleList(tagName) {
      this.$router.push({ name: "home", params: { tagName: tagName } });
    }
  }
};
</script>

<style scoped>
</style>
