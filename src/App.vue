<template>
  <div id="app">
    <div class="example h-full">
      <transition name="fade">
        <div
          class="h-center padding-sides"
          v-if="state.screen === 'home' || state.screen === 'register'"
        >
          <video
            ref="full"
            preload
            autoplay
            muted
            loop
            class="w-video"
            poster="./assets/umbra_poster.jpg"
          >
            <source src="./assets/umbra.mp4" type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>

          <div class="title-container w-full noselect">
            <div>
              <h2 class="title font-light absolute animation2" ref="element2">
                An inmersive experience to find yourself.
              </h2>
            </div>
            <div>
              <h3
                class="sub-title absolute font-regular animation"
                ref="element"
              >
                <span>Coming Soon</span>
              </h3>
            </div>
          </div>
          <div class="bottom noselect">
            <span
              href="https://paypal.me/pools/c/8kxzH2J8F0"
              class="animation3 regular"
              @click="away"
            >
              Hold the mouse<br />
              to continue
            </span>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="inline-block" v-if="state.screen === 'register'">
          <div class="input-group" v-on-clickaway="away">
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
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
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
  components: {},
  mounted() {
    this.$refs.element2.innerHTML = this.$refs.element2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    this.$refs.element.innerHTML = this.$refs.element.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    this.$anime({
      targets: ".animation2 .letter",
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      easing: "easeInOutQuad",
      duration: 7500,
      delay: this.$anime.stagger(190),
      loop: true
    });

    this.$anime({
      targets: ".animation .letter",
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      easing: "easeInOutQuad",
      duration: 8500,
      delay: this.$anime.stagger(220, { start: 4800 }),
      loop: true
    });
  },

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
    away: function() {
      console.log("clicked away");
      this.state.screen = "register";
      this.enterFullscreen();
      if (this.name && this.year_birth && this.language) {
        console.log("Form full");
        this.state.screen = "loadingExperience";
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

.title {
  font-size: 1.15rem;
  font-weight: normal;
  white-space: nowrap;

  top: 1.65rem;
  z-index: 10;

  filter: blur(0.08rem);
}

.sub-title {
  font-size: 3rem;
  font-weight: normal;
  white-space: nowrap;

  z-index: 5;
  color: #0f0f0f;
  filter: blur(0.15rem);
}

@media screen and (min-width: 650px) {
  .sub-title {
    font-size: 4.2rem;
    margin-top: -1.3rem;
  }
}

@media screen and (min-width: 650px) {
  .title {
    top: 1.2rem;
    font-size: 1.3rem;
  }
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

.title-container {
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  position: relative;
  text-align: center;
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
.h-center {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.w-video {
  margin-top: 3rem;
  width: 75%;
}
@media screen and (min-width: 650px) {
  .w-video {
    width: 40%;
  }
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
  transition: opacity 5s;
  transition-delay: 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
