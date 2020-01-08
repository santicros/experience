import Vue from 'vue'
import App from './App.vue'
import VueAnime from 'vue-animejs';
import fullscreen from 'vue-fullscreen'
import Vue2TouchEvents from 'vue2-touch-events'



Vue.use(VueAnime)
Vue.use(fullscreen)
Vue.use(Vue2TouchEvents)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
