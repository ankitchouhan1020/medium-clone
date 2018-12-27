<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Medium</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/setting">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="username===null" class="nav-item">
          <router-link class="nav-link" to="/register">Sign Up</router-link>
        </li>
        <li v-if="username===null" class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" :to="`/@${username}`">{{username}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>

<style scoped>
</style>
