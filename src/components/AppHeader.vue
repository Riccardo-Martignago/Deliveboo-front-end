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
    <header class="d-flex justify-content-between align-items-center">
        <div class="logo col-3 col-md-3">
            <router-link to="/">
                <img src="../img/logo.png" alt="Logo" class="img-logo"> <span id="logo-none">DeliveBoo</span>
            </router-link>
        </div>
        <nav class="col-9 col-md-9">
            <ul class="nav-links col-9 col-md-6">
                <li v-for="link in linksName" :key="link.name">
                    <router-link :to="{ name: link.name }">
                        {{ link.label }}
                        <span v-if="link.name === 'shop' && cartItemCount > 0">
                                ({{ cartItemCount }})
                        </span>
                    </router-link>
                </li>
            </ul>
            <div class="col-3 col-md-4 d-flex">
                <button class="btn my_button" @click="goToDashboard"> Account </button>
            </div>
        </nav>
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
    .my_button {
        border-radius: 5rem;
        background-color: rgb(134, 181, 222);
        color: white;
        text-align: center;
        padding: 0.5rem 1.5rem;
        font-size: 1rem;
        font-weight: bold;
    }

    .logo > a {
        font-size: 1.5rem;
        color: rgb(134, 181, 222);
        font-weight: bold;
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    .img-logo {
        width: 50px;
        margin-right: 0.5rem;
    }

    header {
        padding: 1rem;
        background-color: white;
        width: 100%;
        display: flex;
        align-items: center;
        box-shadow: 0px 5px 5px #dedede;
        z-index: 1;
        position: fixed;
        top: 0;

        nav {
            display: flex;
            justify-content: space-between;

            .nav-links {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-center;
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    margin: 0 10px;
                }

                li a {
                    text-decoration: none;
                    color: rgb(134, 181, 222);
                    font-weight: 600;
                    font-size: 1rem;
                }

                li a:hover {
                    text-decoration: underline;
                }

                li a span {
                    font-weight: bold;
                    color: red;
                }
            }
        }
    }

    @media (max-width: 767px) {
        header {
            padding: 0.5rem 1rem;
        }

        #logo-none{
            display: none;
        }

        .img-logo {
            width: 60px; 
        }

        .nav-links {
            display: none; 
        }

        nav {
            justify-content: flex-end;
            align-items: center;

            .my_button {
                font-size: 0.875rem;
                padding: 0.4rem 1rem;
            }
        }
    }

    @media (min-width: 768px) {
        .img-logo {
            width: 100px;
            margin-left: 1rem;
        }
        .nav-links {
            display: flex;
            justify-content: end;
        }
        div{
            justify-content: center;

            .my_button {
                font-size: 1rem;
                padding: 0.5rem 1.5rem;
            }
        }
    }

    @media (min-width: 1024px) {
        .img-logo {
            width: 120px;
        }

        .nav-links {
            justify-content: space-between;
        }

        div{
            justify-content: center;
            .my_button {
                font-size: 1.125rem;
            }
        }
    }
</style>

