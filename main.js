//globalProperties全局挂载方法 使用import {getCurrentInstance}from "vue";  
// const {proxy} = getCurrentInstance(); 挂载实例
//   proxy.showToast();
// view
import App from './App'
import * as Pinia from 'pinia';
import {
  showToast
} from "@/utils/common.js"
// main.js
import uviewPlus from '@/uni_modules/uview-plus'

// #ifndef VUE3

import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.showToast = showToast
  app.use(uviewPlus)
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  }
}
// #endif