import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },
    {
      path: "/login",
      name: "login",

      component: () => import("@/views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue")
    },
    {
      path: "/editor",
      name: "editor_new",
      component: () => import("@/views/ArticleCreate.vue")
    },
    {
      path: '/article/:article_slug',
      name: "articleView",
      props: true,
      component: () => import("@/views/ArticleView.vue")
    },
    {
      path: "/editor/:article_slug",
      name: "editor_edit",
      component: () => import("@/views/ArticleEdit.vue")
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/Setting.vue")
    },

    {
      path: "/:username/favorite",
      name: "favorite",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/:username",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    }
  ]
});
