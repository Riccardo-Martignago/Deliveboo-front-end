<script>

    export default{
            name: 'Header',
        data(){
            return{
                linksName : [
                    {
                        label: "Home",
                        name: "home"
                    },
                    {
                        label: "About us",
                        name: "about"
                    },
                    {
                        label: "Restaurants",
                        name: "restaurants"
                    },
                    
                    {
                        label: "Search",
                        name: "search"
                    }
                ],
                user: null
            };
        },
        /* created(){
            this.checkAuth();
        },
        methods:{
            checkAuth(){
                axios.get('http://localhost:8000/api/user',{withCredentials: true})
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.error('User not authenticated', error);
                })
            }
        }*/
    }
</script>

<template>
    <header>
        <nav>
            <div class="logo">
                <router-link to="/">
                    Deliveboo
                </router-link>
            </div>
            <ul>
                <li v-for="link in linksName" :key="link.name">
                    <router-link :to="{ name: link.name }">
                        {{ link.label }}
                    </router-link>
                </li>
                <li>
                    <a href="http://localhost:8000/login">
                        Account
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    background-color: #333;
    padding: 10px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
}

nav ul li {
    margin: 0 10px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

nav ul li a:hover {
    text-decoration: underline;
}
</style>
