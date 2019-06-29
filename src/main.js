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
window.routeTransitions = true;
window.animationFrequencySlider = true;
window.linearProgressAnimation = false;

Array.prototype.shuffle = function() {
    let i = this.length, j, temp;
    if ( i === 0 ) return this;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
