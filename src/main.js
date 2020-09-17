import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import echarts from "echarts"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

//创建一个全局bus用来跨级传值
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
