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
            cartItemCount: 0,
        };
    },
    methods:{
        goToDashboard(){
            window.location.href = 'http://127.0.0.1:8000/login';
        },
        updateCartItemCount() {
        // Recupera il carrello dal localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Somma tutte le quantità dei piatti
        this.cartItemCount = cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    },
    },
    mounted() {
            console.log('Header montato, controllo il carrello...');// Aggiornamento del numero di articoli nel carrello quando il componente viene montato
            this.updateCartItemCount();
            this.$forceUpdate();
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
                            <span v-if="link.name === 'shop' && cartItemCount > 0">
                                    ({{ cartItemCount }})
                            </span>
                        </router-link>
                    </li>
                </ul>
                <ul class="col-sm-6">
                    <li>
                        <button class="btn my_button" @click="goToDashboard"> Account </button>
                    </li>
                </ul>
            </nav>
        </header>
</template>

<style scoped>
    .my_button{
        border-radius: 5rem;
        background-color: rgb(134, 181, 222);
        color: white;
        text-align: center;
    }

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
            li a span{
                font-weight: bold;
                color: red;
            }

        }
    }




    }

</style>