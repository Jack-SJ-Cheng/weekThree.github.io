const app = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io",
            apiPath: "randomno",
            products: []
        }
    },
    methods: {
        getData(page = 1) {
            axios.get(`${this.url}/api/${this.apiPath}/admin/products?page=${page}`)
                .then(res => {
                    if (res.data.success) {
                        const { products } = res.data;
                        this.products = [];
                        products.forEach(item => {
                            this.products.push(item);
                        })
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(err => console.log(err))
        },
        verify() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    if (res.data.success) {
                        console.log("驗證成功", res);
                    }
                    else {
                        alert("登入時效已過期，請重新登入");
                        console.log(res);
                        location.assign('index.html');
                    }
                })
                .catch(err => console.log(err))
        },
        deleteOne(id, e) {
            axios.delete(`${this.url}/api/${this.apiPath}/admin/product/${id}`)
                .then(res => {
                    if (res.data.success) {
                        console.log(res);
                        this.getData();
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => console.log(err))
        }
    },
    created() {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = cookie;
        this.verify();
        this.getData();
    }
}

Vue.createApp(app).mount('#app');