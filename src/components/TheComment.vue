<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img :src="comment.author.image" class="comment-author-img">
      </a>
      &nbsp;
      <a href class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{formatDate}}</span>
      <span v-if="username === comment.author.username" class="mod-options" @click="deleteComment">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["comment"],
  data() {
    return {};
  },
  computed: {
    formatDate() {
      return moment(this.comment.createdAt).format("MMMM Do, YYYY");
    },
    username() {
      return this.$store.getters["users/username"];
    }
  },
  methods: {
    deleteComment() {
      this.$emit("updateCommentList", this.comment.id);
    }
  }
};
</script>

<style scoped>
</style>