import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip= false

import chenui from '../packages'

Vue.use(chenui)

new Vue({
  render: h => h(App),
}).$mount('#app')
