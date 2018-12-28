import { api } from "../api";
export default {
  namespaced: true,
  state: {
    articles: [],
    feedArticles: [],
    tagList: []
  },
  getters: {
    articles(state) {
      return state.articles;
    },
    feedArticles(state) {
      return state.feedArticles;
    },
    tagList(state) {
      return state.tagList;
    }
  },
  mutations: {
    setArticle(state, payload) {
      state.articles = payload;
    },
    setFeedArticle(state, payload) {
      state.feedArticles = payload;
    },
    setTagList(state, payload) {
      state.tagList = payload;
    }
  },
  actions: {
    getGlobalArticle: async function ({ commit }, payload) {
      let route = "/articles";
      const { tag, author, favorited, limit } = payload;
      if (tag || author || favorited || limit) {
        if (tag) route += `?tag=${tag}`;
        if (author) route += tag ? `&author=${author}` : `?author=${author}`;
        if (favorited)
          route +=
            tag || author
              ? `&favorited=${favorited}`
              : `?favorited=${favorited}`;
        if (limit)
          route +=
            tag || author || favorited ? `&limit=${limit}` : `?limit=${limit}`;
        const response = await api.get(route);
        return response.data.articles;
      } else {
        const globalArticle = await api.get(route);
        commit("setArticle", globalArticle.data.articles);
        return;
      }
    },
    getTagList: async function ({ commit }) {
      const response = await api.get("/tags");
      commit("setTagList", response.data.tags);
    },
    getFeedArticle: async function ({ commit }) {
      const feedArticle = await api.get("articles/feed");
      commit("setFeedArticle", feedArticle.data.articles);
    },
    favArticle: async function ({ commit }, articleSlug) {
      try {
        const response = await api.post(`/articles/${articleSlug}/favorite`);
        return response.data.article;
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
    unfavArticle: async function ({ commit }, articleSlug) {
      try {
        const response = await api.delete(`/articles/${articleSlug}/favorite`);
        return response.data.article;
        //console.log(response);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
    getSingleArticle: async function ({ commit }, slug) {
      try {
        let response = await api.get(`/articles/${slug}`);

        return response.data.article;
      } catch (e) {
        console.log(e)
        throw e
      }

    }
  }
};
