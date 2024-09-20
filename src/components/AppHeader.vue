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
            window.location.href = 'http://127.0.0.1:8000/';
        },
        updateCartItemCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
            this.$forceUpdate();  // Forza il rendering
        },
        addToCart(dish) {
            // Logica per aggiungere il piatto al carrello
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === dish.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...dish, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Aggiunto al carrello, emetto l\'evento cart-updated');
            // Emetti un evento personalizzato che informa del cambiamento nel carrello
            window.dispatchEvent(new Event('cart-updated')); // Alternativa per eventi globali
        },
        removeFromCart(dish) {
            // Logica per rimuovere il piatto dal carrello
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === dish.id);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity--;
                if (cart[existingItemIndex].quantity <= 0) {
                    cart.splice(existingItemIndex, 1);
                }
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Rimosso dal carrello, emetto l\'evento cart-updated');
            // Emetti l'evento di aggiornamento del carrello
            window.dispatchEvent(new Event('cart-updated')); // Alternativa per eventi globali
    }
    },
    mounted() {
            console.log('Header montato, controllo il carrello...');// Aggiornamento del numero di articoli nel carrello quando il componente viene montato
            window.addEventListener('cart-updated', () => {
                console.log('Evento cart-updated ricevuto');
                this.updateCartItemCount();
            });
            this.$forceUpdate();
            // Ascolta l'evento 'cart-updated'
            window.addEventListener('cart-updated', this.updateCartItemCount);
            window.addEventListener('storage', this.updateCartItemCount);
        },
        beforeDestroy() {
        // Rimuovi il listener quando il componente viene distrutto
        window.removeEventListener('cart-updated', this.updateCartItemCount);
        window.removeEventListener('storage', this.updateCartItemCount);
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