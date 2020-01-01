<template>
  <div
    id="app"
    v-touch:start="startHandler"
    v-touch:touchhold="touchHoldHandler"
  >
    <div class="example h-full">
      <transition name="fade" mode="out-in" appear>
        <PageHome
          v-if="state.screen === 'home' || state.screen === 'register'"
        ></PageHome>
        <PageLoading
          v-else-if="state.screen === 'loadingExperience'"
        ></PageLoading>
        <PageExperience
          v-else-if="state.screen === 'experience'"
        ></PageExperience>
      </transition>
      <transition name="fade">
        <div class="inline-block" v-if="state.screen === 'register'">
          <div class="input-group">
            <input type="text" placeholder="Name" v-model="name" />
            <input
              type="number"
              min="1900"
              max="2020"
              placeholder="Year of birth"
              v-model="year_birth"
            />
            <input type="text" placeholder="Language" v-model="language" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { Howl } from "howler";
import PageHome from "@/components/PageHome";
import PageLoading from "@/components/PageLoading";
import PageExperience from "@/components/PageExperience";

export default {
  name: "app",
  data: function() {
    return {
      fullscreen: false,
      name: "Santi",
      year_birth: "1997",
      language: "",
      state: { screen: "home" }
    };
  },
  components: { PageHome, PageLoading, PageExperience },
  mounted() {},

  methods: {
    enterFullscreen() {
      this.$fullscreen.enter(this.$el.querySelector(".example"), {
        wrap: false,
        background: "#000"
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    register: function() {
      if (this.name && this.year_birth && this.language) {
        console.log("Form full");
        this.state.screen = "loadingExperience";
        setTimeout(() => {
          this.state.screen = "experience";
        }, 6400);
      }
    },
    startHandler() {
      console.log("started");
    },
    touchHoldHandler() {
      console.log("ended");

      if (this.state.screen === "home") {
        this.enterFullscreen();
        this.state.screen = "register";
      } else if (this.state.screen === "register") {
        this.register();
      } else if (this.state.screen === "loadingExperience") {
        this.state.screen = "experience";
      }
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  cursor: url("./assets/cursor.svg"), pointer;
}
body {
  background-color: black;
  color: #b4b4b4;
  overflow: hidden;
}

#app {
  font-family: serif;
  text-align: center;
  height: 100%;
  font-family: "Tiempos Headline", Times, serif;
  font-weight: 300;
}

@font-face {
  font-family: "Tiempos Headline";
  src: local("Tiempos Headline Light"),
    url("./assets/fonts/TiemposHeadline-Light.otf") format("otf");
  font-weight: 300;
}

@font-face {
  font-family: "Tiempos Headline";
  src: local("Tiempos Headline Regular"),
    url("./assets/fonts/TiemposHeadline-Regular.otf") format("otf");
  font-weight: 400;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

video:focus {
  background: transparent;
  color: transparent;
}

.absolute {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  padding: 0;
  margin: 0;
}

.animation2 .letter,
.animation .letter,
.animation3 .letter {
  opacity: 0;
}

.font-light {
  font-family: "Tiempos Headline", Times, serif;
  font-weight: 300;
}
.font-regular {
  font-family: "Tiempos Headline", Times, serif;
  font-weight: 400;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

a {
  text-decoration: none;
  font-size: 1.2rem;
  filter: blur(0.08rem);
  transition: filter 0.2s ease-in-out, -webkit-text-fill-color 0.4s ease-in-out;
  color: #747474;
}

@media screen and (min-width: 650px) {
  a:hover {
    filter: blur(0.55rem);
  }
}

.padding-sides {
  padding: 0 1.5rem;
}
.bottom {
  position: absolute;
  bottom: 6%;
  left: 0;
  right: 0;
}

.inline-block {
  display: inline-block;
  margin: 0 auto;
}

.input-group {
  display: flex;
  margin-left: 80px;
}

input {
  background-color: transparent;
  border: transparent;
  color: white;
  border-left: 2px solid #b4b4b4;
  padding-left: 10px;
  margin: 0 15px;
  filter: blur(0.07rem);
  font-size: 1.05rem;
  color: #b4b4b4;
}
input::placeholder {
  color: #999999;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
  transition-delay: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
