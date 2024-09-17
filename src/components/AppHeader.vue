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
            ],
        };
    },
    methods:{
        goToDashboard(){
            window.location.href = 'http://127.0.0.1:8000/login';
        }
    },
};
</script>

<template>
    <header>
        <nav>
            <div class="logo">
                <router-link to="/">
                    Deliveboo Icon
                </router-link>
            </div>
            <ul>
                <li v-for="link in linksName" :key="link.name">
                    <router-link :to="{ name: link.name }">
                        {{ link.label }}
                    </router-link>
                </li>
                <li>
                    <button @click="goToDashboard">Dashboard</button>
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
