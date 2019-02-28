import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import './assets/main.scss'

import './plugins/bootstrap-vue'
import './plugins/vue-highlightjs'
import './plugins/vue-cookie'

Vue.config.productionTip = false;

window.hideBurgerOnIdle = false;
window.routeTransitions = false;
window.animationFrequencySlider = true;
window.linearProgressAnimation = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
