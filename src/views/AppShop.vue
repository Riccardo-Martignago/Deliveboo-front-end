<script>
import braintree from 'braintree-web';
import axios from 'axios';
export default {
  data() {
    return {
      cart: [],      // Array per i dati del carrello
      cartTotal: 0,  // Totale del carrello
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      isLoading: false, 
      email: '',
      phone: '',
      address: '',
    };
  },
  methods: {
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
      window.dispatchEvent(new Event('cart-updated'));
    },

    calculateCartTotal() {
      this.cartTotal = this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    // simulatePayment() {
    //   alert(`Payment completed for a total of € ${this.cartTotal}`);
    //   this.clearCart();
    //   window.dispatchEvent(new Event('cart-updated'));
    // },

    clearCart() {
      if (confirm("Are you sure you want to clear the cart?")) {
        this.cart = [];
        localStorage.removeItem('cart');
        this.calculateCartTotal();
        localStorage.removeItem('currentRestaurantId');
        window.dispatchEvent(new Event('cart-updated'));
      }
    },

    updateItemQuantity(itemId, increment) {
      const item = this.cart.find(item => item.id === itemId);
      if (item) {
        item.quantity += increment;
        if (item.quantity <= 0) {
          this.removeItemFromCart(itemId);
        } else {
          localStorage.setItem('cart', JSON.stringify(this.cart));
          this.calculateCartTotal();
          this.$emit('cartUpdated', this.cart);  // Emissione evento
        }
      }
      window.dispatchEvent(new Event('cart-updated'));
    },

    removeItemFromCart(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.calculateCartTotal();
      this.$emit('cartUpdated', this.cart);  // Emissione evento
      window.dispatchEvent(new Event('cart-updated'));
    },

    // Metodo per mandare i dati della carta a Braintree
      payWithCreditCard() {
    if (this.cartTotal === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (this.hostedFieldInstance) {
      this.hostedFieldInstance.tokenize().then(payload => {
        this.nonce = payload.nonce;

        const orderData = {
          paymentMethodNonce: this.nonce,
          totalAmount: this.cartTotal,
          email: this.email,
          phone: this.phone,
          address: this.address,
          restaurantId: localStorage.getItem('currentRestaurantId'),
          dishes: this.cart.map(item => ({
            dish_id: item.id,
            quantity: item.quantity
          }))
        };
        
        console.log('Dati inviati per il pagamento:', orderData);

        // Invia il nonce e i dettagli del pagamento al server
        axios.post('http://localhost:8000/api/payment/process', orderData)
          .then(response => {
            const result = response.data;
            if (result.success) {
              alert('Payment completed successfully');
              this.clearCart();
            } else {
              alert('Error in payment: ' + result.message);
            }
          })
          .catch(err => {
            console.error('Errore nel processo di pagamento:', err);
            this.error = err.message;
            this.isLoading = false;  // Ferma caricamento
          });
      })
      .catch(err => {
        console.error('Errore nella tokenizzazione della carta:', err);
        this.error = err.message;
        this.isLoading = false;  // Ferma caricamento
      });
    }
  }
  },
  created() {
    this.loadCartFromLocalStorage();
    this.calculateCartTotal();
  },
  mounted() {
      axios.get('/api/payment/token')
        .then(response => {
          // Usa il token ricevuto dalla API per l'autorizzazione di Braintree
          return braintree.client.create({
            authorization: "sandbox_csd6tvwy_44nxng54m6y3sxbp" // Usa il token dalla risposta
          });
        })
        .then(clientInstance => {
          return braintree.hostedFields.create({
            client: clientInstance,
            styles: {
              input: {
                'font-size': '14px',
                'font-family': 'Open Sans'
              }
            },
            fields: {
              number: {
                selector: '#creditCardNumber',
                placeholder: 'Enter Credit Card'
              },
              cvv: {
                selector: '#cvv',
                placeholder: 'Enter CVV'
              },
              expirationDate: {
                selector: '#expireDate',
                placeholder: '00 / 0000'
              }
            }
          });
        })
        .then(hostedFieldsInstance => {
          this.hostedFieldInstance = hostedFieldsInstance;
        })
        .catch(err => {
          console.error(err);
        });
    }
}
</script>
<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    

  <h1>Your order</h1>
  
  <div class="border ps-5 pe-5 ordine">
      <div v-for="item in cart" :key="item.id">
        <div class="num-piatti border-bottom  d-flex justify-content-between">
          <p>
            {{ item.quantity }}x 
            <span class="nomepiatto">
              - {{ item.name }} 
              <button  @click="updateItemQuantity(item.id, -1)"><i class="fa-solid fa-minus"></i></button>
              <button  @click="updateItemQuantity(item.id, 1)"><i class="fa-solid fa-plus"></i></button>
            </span> 
          </p>
          <p>
            € {{ item.price * item.quantity }}          
            <button class="border border-secondary delete ms-5" @click="removeItemFromCart(item.id)"><i class="fa-regular fa-trash-can "></i></button>
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-5">
        <p class="nomepiatto">Order Total</p>
        <p>€ {{ cartTotal }}</p>
      </div>
      <!-- <div class="d-flex mb-5 justify-content-end">
        <button class="btn btn-primary pagamento" @click="simulatePayment">
          Proceed to payment
        </button>
      </div> -->
    </div>
  
    <form class="mt-5" @submit.prevent="payWithCreditCard">
      <h2>Information</h2>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <input v-model="phone" type="text" id="phone" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <input v-model="address" type="text" id="address" class="form-control" required>
      </div>


      <!-- Campi per la carta di credito -->
      <div class="form-group d-flex">
        <label for="creditCardNumber">Credit Card Number</label>
        <div id="creditCardNumber" class="form-control input-field"></div>
      </div>
      
      <div class="form-group row ">
        <div class="col-6 d-flex">
          <label for="expireDate">Expire Date</label>
          <div id="expireDate" class="form-control input-field"></div>
        </div>
        <div class="col-6 d-flex">
          <label for="cvv">CVV</label>
          <div id="cvv" class="form-control input-field"></div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        Pay with Credit Card
      </button>
    </form>

</template>

<style scoped>

h1{
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  padding-top: 180px;
  color: rgb(134, 181, 222);
}
div.ordine{
  width: 40%;
  margin: 0 auto;

    p{
          font-size: 22px;
    }   


    div{
      border: 1;
      border-color: black;
    }

  button.delete{
    background-color: white;
    font-size: 20px;

  }

  button:hover{
    color:rgb(134, 181, 222);
  }

  
      .nomepiatto{
        font-weight: 500;
      }
      
      
      button{
        padding: 0.2rem 0.5rem;
      margin-top: 0.8rem;
      background-color: white;
      border: 0;
    }

    button.pagamento{
      padding: 0.4rem 1rem;
      border-radius: 20px;
      background-color: rgb(134, 181, 222);
      color: black;
    }

    button.pagamento:hover{
      background-color: rgb(178, 208, 234);
      color: black;
    }
  }

  form{

    width: 40%;
    margin: 0 auto;
    margin-top: 6rem;
  }
  .form-group{
    margin-bottom: 2rem;
  }

  label{
    width: 40%;
  }

 div> #expireDate, #cvv {
    height: 40px;
    padding-right: 1.2rem;
  }

  label#cvv{
    text-align: end;
  }

  div>#creditCardNumber{
    height: 40px;
    padding-right: 1.2rem;
  }

  .loading-spinner {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: blue;
}
</style>

