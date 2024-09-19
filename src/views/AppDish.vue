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

<style lang="scss" scoped>
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