import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home.vue'
import login from './components/login.vue'
import register from './components/register.vue'

Vue.use(Router)

export default new Router({
    mode: 'history', // supp le #
    routes: [
        {path: '/', component: home},
        {path: '/login', component: login},
        {path: '/register', component: register}
    ]
})