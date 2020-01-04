<template>
  <div class="flex-col height-50">
    <h1 class="hidden">Loading</h1>
    <div>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="circle"
        width="40"
        height="40"
      >
        <circle cx="50" cy="50" r="40" stroke="white" stroke-width="6" />
      </svg>
      <h2>The sphere will guide your interactions</h2>
    </div>
    <div class="headphones-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-headphones"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path
          d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
        ></path>
      </svg>
      <div class="headphones-text">
        <p>For best experience</p>
        <p>Use headphones</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageLoading"
};
</script>

<style scoped>
h2 {
  filter: blur(0.065rem);
}
p {
  filter: blur(0.05rem);
}
svg {
  filter: blur(0.065rem);
}

h2 {
  margin-top: 0.5rem;
}
.flex-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.height-50 {
  transform: translateY(45vh);
  height: 55%;
}
.headphones-warning {
  margin-bottom: 2.5rem;
}

.headphones-warning svg {
  margin-bottom: 0.5rem;
}

.headphones-text p {
  margin: 0;
  margin-bottom: 0.3rem;
}
</style>
