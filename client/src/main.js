import Vue from 'vue'
import App from './App.vue'

import moment from 'moment';
import 'vue-awesome/icons'

import { router } from './routes';
import { store } from './store/store';
import VModal from 'vue-js-modal'

Vue.use(VModal)
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-animate/dist/vue2-animate.min.css'

import Vuebar from 'vuebar';
Vue.use(Vuebar)
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'https://murmuring-everglades-58247.herokuapp.com');
moment.locale('ru');

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.filter('getFormattedDate', (value) => {
    if (!value) return ''
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('getFomattedHTime',(value) => {
    if (!value) return ''
    return moment(value).format('HH:mm:ss')
})

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
