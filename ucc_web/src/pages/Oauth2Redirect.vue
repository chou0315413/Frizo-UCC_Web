<template>
    <div>
        <h6>登入成功，2 秒後進行跳轉...</h6>
        <div>your token type: {{tokenType}}</div>
        <div>your access token: {{accessToken}}</div>
        <div>userInfo: {{userInfo}}</div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Oauth2Redirect",

        data(){
            return{
                timer: '',
                tokenType: '',
                accessToken: '',
            }
        },

        methods: {
            redirectToHome(){
                this.$router.replace({ path: '/' })
            },

            ...mapActions({
                login: 'auth/login'
            })
        },

        computed: {
          ...mapGetters({
              userInfo: 'auth/userInfo'
          })
        },

        created() {
            this.tokenType = this.$route.query.tokenType;
            this.accessToken = this.$route.query.accessToken;
        },

        mounted() {
            const tokenType = this.tokenType;
            const accessToken = this.accessToken;
            this.login({tokenType, accessToken});
            this.timer = setTimeout(this.redirectToHome, 2000);
        },

        beforeDestroy() {
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped>

</style>