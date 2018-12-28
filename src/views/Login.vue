<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>
          <p v-if="loading" class="text-xs-center info">Signing in...</p>

          <ul class="error-messages">
            <li v-for="(value,key) in errors[0]">{{key}} {{value[0]}}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
                required
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="login">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,

      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    async login() {
      this.errors = [];
      try {
        this.loading = true;

        await this.$store.dispatch("users/loginUser", {
          email: this.email,
          password: this.password
        });
        var vm = this;
        setTimeout(function() {
          vm.$router.replace("/");
        }, 500);
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.errors.push(e.response.data.errors);
        throw e;
      }
    }
  }
};
</script>
