import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import moment from 'moment';
import 'vue-awesome/icons'

import { routes } from './routes';
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
Vue.use(VueSocketio, 'http://localhost:3001');
moment.locale('ru');

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.filter('getFormattedDate', (value) => {
    if (!value) return ''
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('getFomattedHTime',(value) => {
    if (!value) return ''
    return moment(value).format('HH:mm:ss')
})

export const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    store.dispatch('auth');
    let userAuth = store.getters.auth;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && userAuth === false) next('login')
    else if(!requiresAuth && userAuth === true) next()
    else next();
})

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
