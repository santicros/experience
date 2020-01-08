<template>
  <div
    id="app"
    v-touch:start="startHandler"
    v-touch:touchhold="touchHoldHandler"
  >
    <div id="pixiApp" class="noselect"></div>
    <canvas id="canvas" class="noselect"></canvas>

    <div class="popup-orientation"><p>Please rotate your device</p></div>

    <div class="example h-full">
      <transition name="fade" mode="out-in" appear>
        <PageHome
          v-if="state.screen === 'home' || state.screen === 'register'"
        ></PageHome>
        <PageLoading
          v-else-if="state.screen === 'loadingExperience'"
        ></PageLoading>
        <PageExperience
          ref="experience"
          v-else-if="state.screen === 'experience'"
        ></PageExperience>
      </transition>
      <transition name="fade" appear>
        <div class="bottom-input" v-if="state.screen === 'register'">
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
// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from "howler";
import PageHome from "@/components/PageHome";
import PageLoading from "@/components/PageLoading";
import PageExperience from "@/components/PageExperience";

import * as PIXI from "pixi.js";
// import { OldFilmFilter } from "@pixi/filter-old-film";

export default {
  name: "app",
  data: function() {
    return {
      fullscreen: false,
      name: "Santi",
      year_birth: "1997",
      language: "",
      state: { screen: "home" },
      sound1: "",
      sound2: "",
      holdSound: ""
    };
  },
  components: { PageHome, PageLoading, PageExperience },
  mounted() {
    this.filmgrain();
    // this.drawCanvas();

    if (window.matchMedia("(orientation: portrait)").matches) {
      // you're in PORTRAIT mode
      console.log("you're in PORTRAIT mode");
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      // you're in LANDSCAPE mode
      console.log("you're in LANDSCAPE mode");
    }

    if (this.state.screen === "register") {
      console.log("You are registering right?");
    }

    this.sound1 = new Howl({
      src: ["sounds/begining_web.webm", "sounds/begining_web.mp3"],
      preload: true,
      loop: true
    });
    this.sound2 = new Howl({
      src: ["sounds/loading_experience.webm", "sounds/loading_experience.mp3"],
      preload: true,
      loop: true
    });
    this.holdSound = new Howl({
      src: ["sounds/hold.mp3"],
      preload: true
    });

    this.sound1.play();
    this.sound1.fade(0, 1, 2000);

    // Change global volume.
    // Howler.volume(0.5);
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
    register: function() {
      if (this.name && this.year_birth && this.language) {
        this.sound1.fade(1, 0, 2000);
        console.log("Form full");
        this.state.screen = "loadingExperience";
        this.sound2.play();
        this.sound2.fade(0, 1, 2000);
        setTimeout(() => {
          this.state.screen = "experience";
          this.sound2.fade(1, 0, 1000);
        }, 7000);
      }
    },
    startHandler() {
      console.log("started click");
    },
    touchHoldHandler() {
      console.log("longpress");
      this.holdSound.play();

      if (this.state.screen === "home") {
        // this.enterFullscreen();
        this.state.screen = "register";
      } else if (this.state.screen === "register") {
        this.register();
      }
    },
    drawCanvas() {
      let cvs = document.getElementById("pixiApp");
      //Create a Pixi Application
      const app = new PIXI.Application({
        antialias: true,
        transparent: true,
        resolution: window.devicePixelRatio,
        autoResize: true,
        resizeTo: window
      });

      cvs.appendChild(app.view);
      app.renderer.backgroundColor = 0x061639;

      const basicText = new PIXI.Text("Basic text in pixi");
      basicText.x = 50;
      basicText.y = 100;

      // Draw a green rectangle
      const rect = new PIXI.Graphics()
        .beginFill(0x00ff00)
        .drawRect(40, 40, 200, 200);

      // Add a blur filter
      rect.filters = [new PIXI.filters.BlurFilter()];

      // Display rectangle
      app.stage.addChild(rect);
    },
    filmgrain() {
      var viewWidth,
        viewHeight,
        canvas = document.getElementById("canvas"),
        ctx;

      // change these settings
      var patternSize = 80,
        patternScaleX = 1,
        patternScaleY = 1,
        patternRefreshInterval = 3,
        patternAlpha = 12; // int between 0 and 255,

      var patternPixelDataLength = patternSize * patternSize * 4,
        patternCanvas,
        patternCtx,
        patternData,
        frame = 0;

      initCanvas();
      initGrain();
      requestAnimationFrame(loop);

      // create a canvas which will render the grain
      function initCanvas() {
        viewWidth = canvas.width = canvas.clientWidth;
        viewHeight = canvas.height = canvas.clientHeight;
        ctx = canvas.getContext("2d");

        ctx.scale(patternScaleX, patternScaleY);
      }

      // create a canvas which will be used as a pattern
      function initGrain() {
        patternCanvas = document.createElement("canvas");
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;
        patternCtx = patternCanvas.getContext("2d");
        patternData = patternCtx.createImageData(patternSize, patternSize);
      }

      // put a random shade of gray into every pixel of the pattern
      function update() {
        var value;

        for (var i = 0; i < patternPixelDataLength; i += 4) {
          value = (Math.random() * 255) | 0;

          patternData.data[i] = value;
          patternData.data[i + 1] = value;
          patternData.data[i + 2] = value;
          patternData.data[i + 3] = patternAlpha;
        }

        patternCtx.putImageData(patternData, 0, 0);
      }

      // fill the canvas using the pattern
      function draw() {
        ctx.clearRect(0, 0, viewWidth, viewHeight);

        ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
        ctx.fillRect(0, 0, viewWidth, viewHeight);
      }

      function loop() {
        if (++frame % patternRefreshInterval === 0) {
          update();
          draw();
        }

        requestAnimationFrame(loop);
      }
    }
  }
};
</script>

<style>
.popup-orientation {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 11;
  justify-content: center;
  align-items: center;
}
.popup-orientation p {
  filter: blur(0.06rem);
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  pointer-events: none;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  cursor: url("./assets/cursor.svg"), pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  transition: transform 1.4s ease-in-out;
}

body {
  background-color: black;
  color: #b4b4b4;
  overflow: hidden;
}
@media screen and (orientation: portrait) {
  .popup-orientation {
    display: flex;
  }
}

*::-moz-selection {
  background-color: rgba(255, 255, 255, 0.15);
}

#app {
  font-family: serif;
  text-align: center;
  height: 100%;
  font-family: "Tiempos Headline", Times, serif;
  font-weight: 300;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
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

.hidden {
  display: none;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.h-full {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
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

.bottom-input {
  position: absolute;
  bottom: 25%;
  left: 0;
  right: 0;
}

.input-group {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 300px;
}
@media screen and (min-width: 640px) {
  .input-group {
    flex-direction: row;
    justify-content: space-between;
    max-width: 40rem;
  }
}

input {
  padding-left: 0.6rem;
  margin-left: -0.3rem;
  margin-top: 1rem;
  width: 100%;
  background-color: transparent;

  border: transparent;
  color: white;
  border-left: 2px solid #999999;

  filter: blur(0.07rem);
  font-size: 1.05rem;
  color: #b4b4b4;
}

@media screen and (min-width: 640px) {
  input {
    margin-left: 1rem;
  }
}

input::placeholder {
  color: #999999;
}

input:focus {
  outline: none;
  border-left: 2px solid white;
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
  transition: opacity 2.6s;
  transition-delay: 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
