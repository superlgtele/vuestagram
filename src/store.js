import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "연습중",
      likes: 30,
      clicklikes: false,
      moreboard: {},
    };
  },
  mutations: {
    changename(state) {
      state.name = "성공!";
    },
    likesplus(state) {
      if (state.clicklikes == false) {
        state.likes++;
        state.clicklikes = true;
      } else {
        state.likes--;
        state.clicklikes = false;
      }
    },
    setMore(state, data) {
      state.moreboard = data;
    },
  },
  actions: {
    getData(context) {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((result) => {
          context.commit("setMore", result.data);
        });
    },
  },
});

export default store;
