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
                    label: "Restaurants",
                    name: "restaurants"
                },
                {
                    label: "About us",
                    name: "about"
                },
                {
                    label: "Shop",
                    name: "shop"
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
        <header class="d-flex">
            <div class="logo col-sm-3">
                <router-link to="/">
                    <img src="../img/logo.png" alt="Logo" class="img-logo"> DeliveBoo
                </router-link>
            </div>
            <nav class="col-sm-9 d-flex align-items-center justify-content-end">
                <ul class="col-sm-4">
                    <li v-for="link in linksName" :key="link.name">
                        <router-link :to="{ name: link.name }">
                            {{ link.label }}
                        </router-link>
                    </li>
                </ul>
                <ul class="col-sm-6">
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

    .logo > a:nth-child(1){
        font-size: 35px;
        color:  rgb(134, 181, 222);
        font-weight: bold;
        text-decoration: none;
        }


        .img-logo{
            width: 110px;
            color:  rgb(134, 181, 222);
        }
        header {
            padding: 1rem 0rem 1rem 4rem;
            box-shadow: 0px 5px 5px #dedede;
            z-index: 1;
            position: fixed;
            height: 130px;
            background-color:white;
            width: 100%;

        nav{

            ul {
            list-style: none;
            display: flex;
            justify-content: space-around;

            li {
                margin: 0 10px;
            }
            
            li a {
                text-decoration: none;
                color:  rgb(134, 181, 222);
                font-weight: 600;
                font-size: 18px;
                margin-left: 0%;
            }
            li a:hover {
                text-decoration: underline;
            }

        }
    }




    }










</style>
