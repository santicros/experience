<template>
  <div>
    <video preload ref="video1" :class="{ paused: pausedVideo }">
      <source src="@/assets/videos/video1.mp4" type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>

    <button @click="togglePlayPause()" class="interactive-circle-button">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="circle"
      >
        <circle cx="50" cy="50" r="40" stroke-width="6" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "PageExperience",
  data: function() {
    return {
      pausedVideo: false,
      endedVideo: false
    };
  },
  mounted() {
    this.play();

    this.videoElement.addEventListener("ended", () => {
      this.ended();
    });
  },
  computed: {
    videoElement() {
      return this.$refs.video1;
    }
  },
  methods: {
    play() {
      console.log("PLAY");
      this.videoElement.play();
    },
    togglePlayPause() {
      if (this.endedVideo === false) {
        if (this.videoElement.paused === false) {
          this.videoElement.pause();
          this.pausedVideo = true;
        } else {
          this.videoElement.play();
          this.pausedVideo = false;
        }
      }
    },
    ended() {
      console.log("Video ended");
      this.endedVideo = true;
    }
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  transition: opacity 0.2s ease-in-out;
}

video.paused {
  opacity: 0.15;
}

.interactive-circle-button {
  border: none;
  margin: 0;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 2.2rem;
  height: 2.2rem;
  background-color: transparent;
  transform: scale(1);
  transition: transform 0.35s ease-in-out;
  filter: blur(0.08rem);
  margin: 0 auto;
  margin-bottom: 1rem;
}

.interactive-circle-button:hover {
  transform: scale(1.2);
}
.interactive-circle-button .circle {
  stroke: white;
  fill: white;
  fill-opacity: 0;
}
.interactive-circle-button .circle:hover {
  fill-opacity: 1;
}
</style>
