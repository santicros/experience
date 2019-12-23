import Vue from 'vue'
import App from './App.vue'
import VueAnime from 'vue-animejs';
import fullscreen from 'vue-fullscreen'

Vue.use(VueAnime)
Vue.use(fullscreen)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
