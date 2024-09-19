<script>
import axios from 'axios';
      export default {
        
        data() {
            return{
                dishes: [],
                cart:[],
                cartTotal: 0,
                quantity: {},
                currentRestaurantId: null,  
                showModal: false,           
                selectedDish: null,
                restaurantInfo: {
                    name: '',
                    photo: '',
                    adress: '',
                    piva: '',
                    email: '',
                },  
            }
        },
        methods:{
                getRestaurantInfo() {
                this.restaurantInfo.name = localStorage.getItem('name');
                this.restaurantInfo.photo = localStorage.getItem('photo');
                this.restaurantInfo.adress = localStorage.getItem('adress');
                this.restaurantInfo.piva = localStorage.getItem('piva');
                this.restaurantInfo.email = localStorage.getItem('email');
                
                console.log('Restaurant Info Loaded:', {
                    name: this.name,
                    photo: this.photo,
                    adress: this.adress,
                    piva: this.piva,
                    email: this.email
                });
                },
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
                const quant = this.quantity[dish.id];  
                if (this.cart.length > 0 && this.currentRestaurantId !== dish.user_id) {
                    this.selectedDish = { ...dish, quantity: quant };
                    this.showModal = true;
                } else {
                    this.addDishToCart(dish, quant);
                }
            },  
            addDishToCart(dish) {
                const quant = this.quantity[dish.id];
                const existingDish = this.cart.find(item => item.id === dish.id);

                if (existingDish) {
                    existingDish.quantity += quant;
                } else {
                    this.cart.push({
                        id: dish.id,
                        name: dish.name,
                        price: dish.price,
                        quantity: quant
                    });
                }
                    if (!this.currentRestaurantId) {
                    this.currentRestaurantId = dish.user_id;
                }

                this.showModal = false;  
                this.saveCartToLocalStorage();
                this.calculateCartTotal();
            },
            saveCartToLocalStorage() {
                console.log("Cart: ", this.cart);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            loadCartFromLocalStorage() {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    this.cart = JSON.parse(savedCart);
                    console.log("Carrello caricato: ", this.cart);
                }
                else{
                    console.log("Nessun carrello trovato nel localStorage.");
                }
                this.calculateCartTotal();
            },
            calculateCartTotal() {
                this.cartTotal = this.cart.reduce((total, item) => {
                    return total + item.price * item.quantity;
                }, 0);
            },
            clearCartAndAddDish() {
                this.cart = [];
                this.addDishToCart(this.selectedDish, this.selectedDish.quantity);
                this.selectedDish = null;
                this.currentRestaurantId = this.selectedDish.user_id;
                this.saveCartToLocalStorage();
            },

        },
        created() {
            this.getDishes();
            this.loadCartFromLocalStorage();
            this.calculateCartTotal();
            this.getRestaurantInfo();
        },
        watch: {
            cart: {
            handler() {
                this.calculateCartTotal();
            },
            deep: true
            }
        },
    }

</script>

<template>
    <div class="row ristorante d-flex justify-content-center">
        <img :src="getImageUrl(restaurantInfo.photo)" alt="Restaurant Photo" class="card-img-top cl-sm-3"/>
        <div class="row col-sm-8 ps-5">
            <h1>
                {{ restaurantInfo.name }}
            </h1>
            <p>
                {{ restaurantInfo.adress }}
            </p>
            <p>
                {{ restaurantInfo.email }}
            </p>
            <p>
                {{ restaurantInfo.piva }}
            </p>

        </div>
    </div>
    <h1>Menù del Ristorante</h1>    
    <div class="row">
        <div class="col-sm-9 d-flex flex-wrap zeroauto">
            <div class="card col-sm-12 p-1 m-3 border d-flex flex-row align-items-start" v-for="(dish) in dishes" :key="dish.id">
                <img :src="getImageUrl(dish.photo)" alt="Dish Photo" class="col-sm-3 mb-3 card-img-top"/>
                <div class="col-sm-9 mb-3 d-flex flex-column">
                    <h3 class="card-title">{{ dish.name }}</h3>
                    <p>
                        <span>Descrizione:</span> {{ dish.description }}
                    </p>
                    <p class="price">
                        € {{ dish.price }}
                    </p>
                    <form>
                        <label for="quantity" class="form-label">Select quantity:</label>
                        <input type="number" v-model="quantity[dish.id]" min="1" value="1">
                        <button type="button" class="btn btn-success" @click="selectDish(dish)">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal-backdrop">
        <div class="modal-content">
            <h4>Attenzione</h4>
            <p>Hai già piatti del ristorante A nel carrello. Vuoi cancellare il carrello e aggiungere piatti del ristorante B?</p>
            <button @click="showModal = false" class="btn btn-secondary">Mantieni il carrello</button>
            <button @click="clearCartAndAddDish" class="btn btn-danger">Cancella e aggiungi</button>
        </div>
    </div>
</template>

<style>
.ristorante{
    padding-top: 150px;

    img{
        width: 350px;
        border-radius: 50px;
    }

    h1{
        text-transform: capitalize;
        font-weight: bold;
        font-size: 40px;
    }
}

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
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }
</style>