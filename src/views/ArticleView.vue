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
          <button
            v-if="username === article.author.username"
            class="btn btn-sm btn-outline-secondary"
            @click="toEditArticle"
          >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </button>
          &nbsp;&nbsp;
          <button
            v-if="username === article.author.username"
            class="btn btn-outline-danger btn-sm"
            @click="toDeleteArticle(article.slug)"
          >
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
          </button>
          <button
            v-if="!(username === article.author.username) && !(profile.following)"
            class="btn btn-sm btn-outline-secondary"
            @click="toFollow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          
          <button
            v-if="!(username === article.author.username) && (profile.following)"
            class="btn btn-sm btn-outline-secondary"
            @click="toUnfollow"
          >
            <i class="ion-minus-round"></i>
            &nbsp;
            Unfollow {{article.author.username}}
          </button>
          &nbsp;&nbsp;
          <button
            v-if="!(username === article.author.username)"
            class="btn btn-sm btn-outline-primary"
            @click="setFavArticle"
            :class="article.favorited ? 'active' : ''"
          >
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
          <a href="#">
            <img :src="article.author.image">
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{formattedDate}}</span>
          </div>

          <button
            v-if="username === article.author.username"
            class="btn btn-sm btn-outline-secondary"
            @click="toEditArticle"
          >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </button>
          &nbsp;&nbsp;
          <button
            v-if="username === article.author.username"
            class="btn btn-outline-danger btn-sm"
            @click="toDeleteArticle(article.slug)"
          >
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
          </button>
          <button
            v-if="!(username === article.author.username) && !(profile.following)"
            class="btn btn-sm btn-outline-secondary"
            @click="toFollow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          
          <button
            v-if="!(username === article.author.username) && (profile.following)"
            class="btn btn-sm btn-outline-secondary"
            @click="toUnfollow"
          >
            <i class="ion-minus-round"></i>
            &nbsp;
            Unfollow {{article.author.username}}
          </button>
          &nbsp;&nbsp;
          <button
            v-if="!(username === article.author.username)"
            class="btn btn-sm btn-outline-primary"
            @click="setFavArticle"
            :class="article.favorited ? 'active' : ''"
          >
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
import moment, { relativeTimeRounding } from "moment";
import { api } from "./../store/api";
export default {
  async created() {
    this.loading = true;
    let article = await this.$store.dispatch(
      "articles/getSingleArticle",
      this.$route.params.article_slug
    );
    this.article = article;
    this.loading = false;
    this.profile = await this.$store.dispatch(
      "users/getProfile",
      this.article.author.username
    );
  },
  name: "articleView",
  data() {
    return {
      article: null,
      loading: false,
      profile: null
    };
  },
  computed: {
    formattedDate() {
      return moment(this.article.createdAt).format("MMMM Do, YYYY");
    },
    user() {
      return this.$store.getters["users/user"];
    },
    username() {
      return this.$store.getters["users/username"];
    }
  },
  methods: {
    viewTagArticleList(tagName) {
      this.$router.push({ name: "home", params: { tagName: tagName } });
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
    },
    toFollow: async function() {
      if (this.user === null) {
        alert("Please Sign in to follow");
        return;
      }
      this.profile = await this.$store.dispatch(
        "users/followUser",
        this.article.author.username
      );
    },
    toUnfollow: async function() {
      this.profile = await this.$store.dispatch(
        "users/unfollowUser",
        this.article.author.username
      );
    },
    async toDeleteArticle(slug) {
      try {
        await api.delete(`/articles/${slug}`);
        this.$router.push(`/@${this.username}`);
      } catch (e) {
        throw e;
      }
    },
    toEditArticle() {
      try {
        this.$router.push(`/editor/${this.article.slug}`);
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>

<style scoped>
</style>
