// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./util/viewport_max');
require('./assets/css/main.css');

Vue.config.productionTip = false;

//全局注入updated钩子
Vue.mixin({
    updated(){
        if(this.$mainSwiper) {
            this.$nextTick(this.$mainSwiper.update);
        }
    }
});

window.EventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
