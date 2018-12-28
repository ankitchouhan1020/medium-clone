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
          <template v-if="username === article.author.username">
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
              class="btn btn-outline-danger btn-sm"
              @click="toDeleteArticle(article.slug)"
            >
              <i class="ion-trash-a"></i>
              &nbsp;
              Delete Article
            </button>
          </template>

          <template v-else>
            <button
              v-if="!profile.following"
              class="btn btn-sm btn-outline-secondary"
              @click="toFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{article.author.username}}
            </button>
            
            <button
              v-if="profile.following"
              class="btn btn-sm btn-outline-secondary"
              @click="toUnfollow"
            >
              <i class="ion-minus-round"></i>
              &nbsp;
              Unfollow {{article.author.username}}
            </button>
            &nbsp;&nbsp;
            <button
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
          </template>
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

          <template v-if="username === article.author.username">
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
              class="btn btn-outline-danger btn-sm"
              @click="toDeleteArticle(article.slug)"
            >
              <i class="ion-trash-a"></i>
              &nbsp;
              Delete Article
            </button>
          </template>

          <template v-else>
            <button
              v-if="!profile.following"
              class="btn btn-sm btn-outline-secondary"
              @click="toFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{article.author.username}}
            </button>
            
            <button
              v-if="profile.following"
              class="btn btn-sm btn-outline-secondary"
              @click="toUnfollow"
            >
              <i class="ion-minus-round"></i>
              &nbsp;
              Unfollow {{article.author.username}}
            </button>
            &nbsp;&nbsp;
            <button
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
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form v-if="user" class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="newCommentData"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="loggedUserProfile.image" class="comment-author-img">
              <button class="btn btn-sm btn-primary" @click.prevent="postComment">Post Comment</button>
            </div>
          </form>
          <div class="col-xs-12 col-md-8 offset-md-2" style="text-align:center" v-if="user===null">
            <router-link to="/login">Sign in</router-link>&nbsp; or&nbsp;
            <router-link to="/register">Register</router-link>&nbsp;to add comments on this article.
          </div>
          <br>
          <br>
          <TheComment
            v-for="comment in comments"
            :comment="comment"
            :key="comment.id"
            @updateCommentList="updateComments"
          ></TheComment>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TheComment from "@/components/TheComment.vue";
import moment from "moment";
import { api } from "./../store/api";
export default {
  components: {
    TheComment
  },
  async created() {
    this.loading = true;
    let article = await this.$store.dispatch(
      "articles/getSingleArticle",
      this.$route.params.article_slug
    );
    this.article = article;

    this.fetchComment(article.slug);
    this.profile = await this.$store.dispatch(
      "users/getProfile",
      this.article.author.username
    );
    if (this.$store.getters["users/user"]) {
      this.loggedUserProfile = await this.$store.dispatch(
        "users/getProfile",
        this.$store.getters["users/username"]
      );
    }
    this.loading = false;
  },
  name: "articleView",
  data() {
    return {
      newCommentData: "",
      loggedUserProfile: null,
      article: null,
      loading: false,
      profile: null,
      comments: null
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
    },
    postComment: async function() {
      try {
        let res = await api.post(`/articles/${this.article.slug}/comments`, {
          comment: { body: this.newCommentData }
        });
        this.newCommentData = "";
        this.fetchComment(this.article.slug);
      } catch (e) {
        throw e;
      }
    },
    async fetchComment(slug) {
      let response = await api.get(`/articles/${slug}/comments`);
      this.comments = response.data.comments;
    },
    async updateComments(id) {
      try {
        await api.delete(`/articles/${this.article.slug}/comments/${id}`);
        await this.fetchComment(this.article.slug);
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>

<style scoped>
</style>
