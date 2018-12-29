<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>
          <p v-if="loading" class="text-xs-center info">{{msg}}</p>
          <ul class="error-messages">
            <li v-for="(value,key) in errors[0]" :key="key">{{key}} {{value[0]}}</li>
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
      errors: [],
      loading: false,
      msg: "Your details are getting register..."
    };
  },
  methods: {
    registerUser() {
      this.errors = [];
      try {
        this.loading = true;
        this.$store.dispatch("users/registerUser", {
          username: this.name,
          email: this.email,
          password: this.password
        });

        this.msg = "Details Registered...You are being redirect to home page..";
        var vm = this;
        setTimeout(function() {
          vm.loading = false;
          vm.$router.push("/");
        }, 1500);
      } catch (e) {
        this.errors.push(e.response.data.errors);
        this.loading = false;
        throw e;
      }
    }
  }
};
</script>

<style scoped>
</style>
