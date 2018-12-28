<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <ul class="error-messages">
            <li v-for="(value,key) in errors[0]">{{key}} {{value[0]}}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="name"
                placeholder="Your Name"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="registerUser">Sign up</button>
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
      name: "",
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    async registerUser() {
      this.errors = [];
      try {
        await this.$store.dispatch("users/registerUser", {
          username: this.name,
          email: this.email,
          password: this.password
        });
      } catch (e) {
        this.errors.push(e.response.data.errors);
        throw e;
      }
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
