import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Oauth2Redirect from "../pages/Oauth2Redirect";
import UserInfo from "../components/UserInfo";
import page404 from "../pages/page404";

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
        },
        {
            path: '/UserInfo',
            name: 'UserInfo',
            component: UserInfo
        },
        {
            path: '/*',
            name: page404,
            component: page404
        }
    ]
})