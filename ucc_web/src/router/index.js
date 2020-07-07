import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            alias: '/index',
            redirect: '/'
        },

        {
            path: '/',
            name: 'home',
            component: resolve => require(['@/pages/HomePage.vue'], resolve)
        },

        {
            path: '/oauth2/redirect',
            name: 'oauth2',
            component: resolve => require(['@/pages/Oauth2Redirect.vue'], resolve)
        },

        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/loginGroup/Login.vue'], resolve)
        },

        {
            path: '/user',
            name: 'user',
            redirect: '/',
            component: resolve => require(['@/pages/User.vue'], resolve),
            children: [
                { path: 'info', component: resolve => require(['@/components/user/userinfo/Info.vue'], resolve) },
                { path: 'emailverify', component: resolve => require(['@/components/user/EmailVerify.vue'], resolve) },
                { path: 'newActivity', component: resolve => require(['@/components/user/PostActivity.vue'], resolve) }
            ]
        },

        // test區塊
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['@/components/test/test.vue'], resolve),
        },

        {
            path: '/test3',
            name: 'test',
            component: resolve => require(['@/components/test/test3.vue'], resolve),
        },

        {
            path: '/testPhoto',
            name: 'test',
            component: resolve => require(['@/components/test/testPhotoCroppie.vue'], resolve),
        },
        // test區塊

        {
            path: '/chat',
            name: 'chat',
            component: resolve => require(['@/pages/Chat.vue'], resolve),
        },

        {
            path: '/findEvent',
            name: 'fevent',
            component: resolve => require(['@/pages/TestFindEvent.vue'], resolve),
        },

        //必須置底
        {
            path: '/*',
            name: 'page404',
            component: resolve => require(['@/pages/Page404.vue'], resolve),
        },
    ]
})