const app = {
    data(){
        return {
            url: 'https://vue3-course-api.hexschool.io',
            email: '',
            password: '',
            cookie: '',
            token: '',
            expired: ''
        }
    },
    methods:{
        logIn(){
            const user = {
                username: this.email,
                password: this.password
            }
            axios.post(`${this.url}/admin/signin`,user)
            .then(res=>{
                if(res.data.success == true){
                    console.log(res);
                    this.token = res.data.token;
                    this.expired = new Date(res.data.expired);
                    document.cookie = `hexCookie=${this.token}; expires=${this.expired}`;
                    location.assign('product.html');
                }
            })
            .catch(err=>console.dir(err))
        }
    },
    created(){
        axios.post(`${this.url}/api/user/check`)
        .then(res=>{
            console.log(res);
        })
    }
}
Vue.createApp(app).mount('#app');