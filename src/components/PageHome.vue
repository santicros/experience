<template>
  <div class="h-center padding-sides">
    <video
      ref="full"
      preload
      autoplay
      muted
      loop
      class="w-video"
      poster="@/assets/umbra_poster.jpg"
    >
      <source src="@/assets/umbra.mp4" type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>

    <div class="title-container w-full noselect">
      <div>
        <h2 class="title font-light absolute animation2" ref="element2">
          An inmersive experience to find yourself.
        </h2>
      </div>
      <div>
        <h3 class="sub-title absolute font-regular animation" ref="element">
          <span>Coming Soon</span>
        </h3>
      </div>
    </div>
    <div class="bottom noselect">
      <span
        href="https://paypal.me/pools/c/8kxzH2J8F0"
        class="animation3 regular"
        ref="element3"
      >
        Hold anywhere to continue
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHome",
  mounted() {
    this.$refs.element2.innerHTML = this.$refs.element2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    this.$refs.element.innerHTML = this.$refs.element.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    this.$refs.element3.innerHTML = this.$refs.element3.textContent.replace(
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
    this.$anime({
      targets: ".animation3 .letter",
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      easing: "easeInOutQuad",
      duration: 8500,
      delay: this.$anime.stagger(220, { start: 2200 }),
      loop: true
    });
  }
};
</script>

<style scoped>
.h-center {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.absolute {
  position: absolute;

  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
}

.title-container {
  margin: 0;
  margin-bottom: 20vh;
  padding: 0;
  position: relative;
  text-align: center;
}

.title {
  font-size: 1.15rem;
  font-weight: normal;
  white-space: nowrap;
  z-index: 10;
  filter: blur(0.08rem);
  top: 1.3rem;
}

.animation3 {
  filter: blur(0.075rem);
}

.sub-title {
  font-size: 3rem;
  font-weight: normal;
  white-space: nowrap;
  top: 50%;

  z-index: 5;
  color: #0f0f0f;
  filter: blur(0.15rem);
}

@media screen and (min-width: 650px) {
  .sub-title {
    font-size: 4.2rem;
  }
}

@media screen and (min-width: 650px) {
  .title {
    font-size: 1.3rem;
    top: 2.2rem;
  }
}
</style>
