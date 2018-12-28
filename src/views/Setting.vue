<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h3 class="text-xs-center">Your Settings</h3>
          <br>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  v-model="uimage"
                  type="text"
                  placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="uname"
                  type="text"
                  placeholder="Your Name"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="ubio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="uemail"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                >
              </fieldset>
              <!-- <fieldset class="form-group">
                <input
                  v-model="upassword"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                >
              </fieldset>-->
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSetting"
              >Update Settings</button>
              <button class="btn btn-lg btn-danger pull-xs-left" @click="logoutUser">Logout</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    //data initialization
    const username = this.$store.getters["users/username"];
    await this.$store.dispatch("users/getProfile", username);
    const userProfile = this.$store.getters["users/profile"];
    this.uimage = userProfile.image;
    this.ubio = userProfile.bio;
    this.uname = userProfile.username;
    this.uemail = userProfile.email;
  },
  data() {
    return {
      uimage: "",
      ubio: "",
      uname: "",
      upassword: "",
      uemail: ""
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("users/logoutUser");
      this.$router.replace("/");
    },
    updateSetting: async function() {
      //data updation
      const payload = {
        username: this.uname,
        bio: this.ubio,
        image: this.uimage,
        email: this.uemail
      };
      const username = this.$store.getters["users/username"];
      try {
        await this.$store.dispatch("users/updateProfile", {
          payload,
          username
        });
        this.$router.replace("/");
      } catch (e) {
        console.log(`From update Setting : ${e.message}`);
        throw e;
      }
    }
  }
};
</script>

<style scoped>
</style>
