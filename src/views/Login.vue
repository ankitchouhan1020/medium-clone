<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <ul class="error-messages">
            <li :key="error.message" v-for="error in errors">{{ error.message }}</li>
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
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    login() {
      this.errors = [];
      try {
        this.$store.dispatch("users/loginUser", {
          email: this.email,
          password: this.password
        });
        this.$router.replace("/");
      } catch (e) {
        this.errors.push(e.message);
        throw e;
      }
    }
  }
};
</script>
