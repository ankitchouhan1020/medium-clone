<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div v-if="loading" class="col-xs-12 col-md-10 offset-md-1">
            <br>
            <h5>Loading ...</h5>
          </div>
          <div v-else class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" alt>
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>

            <button
              v-if="username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toSetting"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Edit Profile Setting
            </button>
            
            <button
              v-else-if="username && (!profile.following)"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{profile.username}}
            </button>
            
            <button
              v-else-if="username && profile.following"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toUnfollow"
            >
              <i class="ion-minus-round"></i>
              &nbsp;
              Unfollow {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading" class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="articleView === 'myArticle' ? 'active' : ''"
                  href="#"
                  @click="articleView = 'myArticle'"
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  :class="articleView === 'favArticle' ? 'active' : ''"
                  @click="articleView = 'favArticle'"
                >Favorited Articles</a>
              </li>
            </ul>
          </div>

          <template v-if="articleView === 'myArticle'">
            <ArticlePreview v-for="article in myArticle" :key="article.slug" :article="article"></ArticlePreview>
          </template>

          <template v-if="articleView === 'favArticle'">
            <ArticlePreview
              v-for="article in favoritedArticle"
              :key="article.slug"
              :article="article"
            ></ArticlePreview>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  async created() {
    try {
      this.loading = true;
      let name = this.$route.params.username;
      name = name.slice(1);
      let profileData = await this.$store.dispatch("users/getProfile", name);
      this.profile = { ...profileData };
      this.loading = false;
      this.favoritedArticle = await this.$store.dispatch(
        "articles/getGlobalArticle",
        { favorited: name }
      );
      this.myArticle = await this.$store.dispatch("articles/getGlobalArticle", {
        author: name
      });

      this.username = this.$store.getters["users/username"];
      this.loading = false;
    } catch (e) {
      console.log(e.messaage);
    }
  },

  components: {
    ArticlePreview
  },
  data() {
    return {
      loading: false,
      username: null,
      articleView: "myArticle",
      favoritedArticle: null,
      myArticle: null,
      profile: null
    };
  },
  methods: {
    toFollow: async function() {
      this.profile = await this.$store.dispatch(
        "users/followUser",
        this.profile.username
      );
    },
    toUnfollow: async function() {
      this.profile = await this.$store.dispatch(
        "users/unfollowUser",
        this.profile.username
      );
    },
    toSetting() {
      this.$router.replace("/setting");
    }
  }
};
</script>

<style scoped>
</style>
