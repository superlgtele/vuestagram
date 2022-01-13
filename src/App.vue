<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Back</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0 || step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <p>{{ name2 }}</p>
  <h4>Vuex {{ $store.state.name }}</h4>
  <button @click="$store.commit('changename')">Vuex 데이터바꾸기</button>
  <p>{{ $store.state.moreboard }}</p>
  <button @click="$store.dispatch('getData')">Vuex Actions기능</button> -->

  <UseContainer
    v-bind:makeimageurl="makeimageurl"
    v-bind:instadata="instadata"
    v-bind:step="step"
    @write="uploadwrite = $event"
  />
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container";
import { instadata } from "./assets/postdata";
import axios from "axios";
// import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      instadata: instadata,
      step: 0,
      makeimageurl: "",
      uploadwrite: "",
      choicefilter: "",
    };
  },
  mounted() {
    this.emitter.on("clickfilter", (result) => {
      this.choicefilter = result;
    });
  },
  components: {
    UseContainer: Container,
  },
  // computed: {
  //   ...mapState(["name2"]),
  // },
  methods: {
    publish() {
      const plusobject = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.makeimageurl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.uploadwrite,
        filter: this.choicefilter,
      };
      this.instadata.unshift(plusobject);
      this.step = 0;
    },
    more() {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((result) => {
          this.instadata.push(result.data);
        });
    },
    upload(e) {
      let upfile = e.target.files;
      let makeurl = URL.createObjectURL(upfile[0]);
      this.makeimageurl = makeurl;
      this.step++;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
