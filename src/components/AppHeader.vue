<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
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
                },
                {
                    label: "Shop",
                    name: "shop"
                },
            ],
            user: null
        };
    },
    methods:{
        async checkAuth(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

            const loggedInUserId = localStorage.getItem('userId');
            if(loggedInUserId){
                this.user = response.data.data.find(user => user.id === parseInt(loggedInUserId));
            }else{
                this.user= null;
            }
            } catch (error) {
                console.error('User not authenticated', error);
            }
            },
        async handleLogout(){
            try {
                localStorage.removeItem('token');
                this.user = null;
                this.$router.push({ name: 'login' });
            } catch (error){
                console.error('Error logging out', error);
            }
        },
        goToDashboard(){
            window.location.href = 'http://127.0.0.1:8000/home';
        }
    },
    mounted(){
        this.checkAuth();
    }
};

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
                <li v-if="user">
                    <span>Welcome, {{ user.name }}</span>
                </li>
                <li v-else>
                    <router-link :to="{ name: 'login' }">
                        Login
                    </router-link>
                </li>
                <li v-if="user">
                    <!-- Bottone per il Dashboard -->
                    <button @click="goToDashboard">Dashboard</button>
                </li>
                <li v-if="user">
                    <button @click="handleLogout">Logout</button>
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
