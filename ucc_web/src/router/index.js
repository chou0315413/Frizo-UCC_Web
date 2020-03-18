import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Oauth2Redirect from "../pages/Oauth2Redirect";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: HomePage
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/oauth2/redirect',
            name: 'oauth2',
            component: Oauth2Redirect
        }
    ]
})