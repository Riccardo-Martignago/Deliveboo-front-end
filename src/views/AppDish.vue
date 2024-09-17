<script>
import axios from 'axios';
      export default {
        
        data() {
          return{
            dishes: [],
            cart:[],
            cartTotal: 0,
          }
        },
        methods:{
          getDishes(){
            this.userId = localStorage.getItem('userId');

            if (!this.userId) {
              console.error('Restaurant not found');
              return;
            }
            axios.get('http://127.0.0.1:8000/api/dishes', {
              params:{
            }
        })
        .then((response) => {
                console.log(response.data.data);
                this.dishes = response.data.data.filter((dish) => dish.user_id === parseInt(this.userId));
            })
            .catch(function (error){
                console.log(error);
            })
        },
        getImageUrl(photoPath) {
            return `http://127.0.0.1:8000/uploads/${photoPath}`;
        },
        selectDish(dish) {
                // Cerca se il piatto è già nel carrello
            const existingDish = this.cart.find(item => item.id === dish.id);

            if (existingDish) {
                // Se il piatto è già presente, incrementa la quantità
                existingDish.quantity++;
            } else {
                // Altrimenti, aggiungi il piatto al carrello con quantità 1
                this.cart.push({
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    quantity: 1
                });
                // Aggiorna il localStorage
                this.saveCartToLocalStorage();
            }
        },
            // Salvare il carrello nel localStorage
            saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            },

            // Caricare il carrello dal localStorage quando la pagina viene creata
            loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
            },

            // Calcolare il totale del carrello
            calculateCartTotal() {
            this.cartTotal = this.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            }
        },
        created() {
            // Caricare i piatti e il carrello dal localStorage quando il componente viene creato
            this.getDishes();
            this.loadCartFromLocalStorage();
            this.calculateCartTotal();
        },
        watch: {
            // Ogni volta che il carrello cambia, ricalcola il totale
            cart: {
            handler() {
                this.calculateCartTotal();
            },
            deep: true
            }
        },
        created(){
            this.getDishes();
        },
    }

</script>

<template>
    <h1>Menù del Ristorante</h1>    
    <div class="row">
        <div class="col-sm-9 d-flex flex-wrap zeroauto">
            <div class="card col-sm-12 p-1 m-3 border d-flex flex-row align-items-start" v-for="dish in dishes" :key="dish.id">
                <img :src="getImageUrl(dish.photo)" alt="Dish Photo" class="col-sm-3 mb-3 card-img-top"/>
                <div class="col-sm-9 mb-3 d-flex flex-column">
                    <h3 class="card-title">{{ dish.name }}</h3>
                    <p>
                        <span>Descrizione:</span> {{ dish.description }}
                    </p>
                    <p class="price">
                        € {{ dish.price }}
                    </p>
                    <div>
                        <button type="button" class="btn btn-success" @click="selectDish(dish)">Add to cart</button>
                    </div>
                </div>         
            </div>
        </div>
    </div>

</template>

<style>
div.zeroauto{
    margin: 0 auto;
    font-size: 20px;
}

 div.card{

    img{
        width: 300px;
        height: 200px;
        margin-top: 1rem;
    }

    div>p>span{
        font-weight: bold;
        font-size: 18px;

    }

    .price{
        font-size:xx-large;
    }
 }
</style>