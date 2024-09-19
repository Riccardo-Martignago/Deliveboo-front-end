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
    };
  },
  methods: {
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },

    calculateCartTotal() {
      this.cartTotal = this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    simulatePayment() {
      alert(`Payment completed for a total of € ${this.cartTotal}`);
      this.clearCart();
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
      this.calculateCartTotal();
      localStorage.removeItem('currentRestaurantId');
    },

    // Metodo per mandare i dati della carta a Braintree
    payWithCreditCard() {
      if(this.hostedFieldInstance) {
        this.hostedFieldInstance.tokenize().then(payload => {
          this.nonce = payload.nonce;

          // Invia il nonce e l'importo al server usando axios
          axios.post('http://localhost:8000/api/payment/process', {
            paymentMethodNonce: this.nonce,
            amount: this.cartTotal
          })
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
            console.error('Error in the payment process:', err);
          });
        })
        .catch(err => {
          console.error(err);
          this.error = err.message;
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
  <div>
    <h1>Purchase Summary</h1>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - Amount: {{ item.quantity }} - Price: €
        {{ item.price * item.quantity }}
      </li>
    </ul>

    <h3>Total: € {{ cartTotal }}</h3>

    <button class="btn btn-primary" @click="simulatePayment">
      Proceed to payment
    </button>
  </div>
  
  <form>
    <div class="alert alert-success" v-if="nonce">
      Successfully generated nonce.
    </div>
    <div class="alert alert-danger" v-else-if="error">
      {{ error }}
    </div>
      <hr />
    <div class="form-group">
        <label>Credit Card Number</label>
        <div id="creditCardNumber" class="form-control"></div>
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col-6">
                <label>Expire Date</label>
                <div id="expireDate" class="form-control"></div>
            </div>
            <div class="col-6">
                <label>CVV</label>
                <div id="cvv" class="form-control"></div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Pay with Credit Card</button>
</form>
</template>

<style scoped>
  div{
    padding-top: 150px;
  }
</style>

