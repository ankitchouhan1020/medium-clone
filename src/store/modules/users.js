import { api, setToken, clearToken } from "../api";
export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return state.user || null;
    },
    profile(state) {
      return state.profile || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    getUser: async function ({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    loginUser: async function ({ commit }, { email, password }) {
      try {
        var response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    registerUser: async function ({ commit }, { username, email, password }) {
      try {
        const response = await api.post("/users", {
          user: {
            username,
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    logoutUser: function ({ commit }) {
      clearToken();
      commit("setUser", null);
      commit("setProfile", null);
    },
    getProfile: async function ({ commit, state }, username) {
      try {
        const response = await api.get(`/profiles/${username}`);
        if (state.user && state.user.username === username) {
          commit("setProfile", response.data.profile);
        }
        return response.data.profile;
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
    updateProfile: async function ({ commit }, value) {
      try {
        await api.put("/user", value.payload);
      } catch (e) {
        console.log(`From updateProfile - ${e.message}`);
        throw e;
      }
    },
    followUser: async function ({ commit }, username) {
      try {
        const response = await api.post(`/profiles/${username}/follow`);
        return response.data.profile;
        //console.log(response);
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    },
    unfollowUser: async function ({ commit }, username) {
      try {
        const response = await api.delete(`/profiles/${username}/follow`);
        return response.data.profile;
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    }
  }
};
