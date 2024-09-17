<script>
import braintree from 'braintree-web';
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
    // Caricare il carrello dal localStorage
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
    },

    // Simulazione del pagamento
    simulatePayment() {
      alert(`Pagamento completato per un totale di € ${this.cartTotal}`);
      // Puoi aggiungere qui logiche aggiuntive per resettare il carrello
      this.clearCart();
    },

    // Svuotare il carrello (per esempio dopo il pagamento)
    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
      this.calculateCartTotal();
    },

    // Metodo per mandare i dati della carta a Braintree
    payWithCreditCard() {
      if(this.hostedFieldInstance)
      {
          this.hostedFieldInstance.tokenize().then(payload => {
              console.log(payload);
              this.nonce = payload.nonce;
          })
          .catch(err => {
              console.error(err);
              this.error = err.message;
          })
      }
  }
  },
  created() {
    // Caricare il carrello dal localStorage e calcolare il totale quando il componente viene creato
    this.loadCartFromLocalStorage();
    this.calculateCartTotal();
  },
  mounted() {
      braintree.client.create({
          authorization: "sandbox_csd6tvwy_44nxng54m6y3sxbp"
      })
      .then(clientInstance => {
          let options = {
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
          }
          return braintree.hostedFields.create(options)
      })
      .then(hostedFieldInstance => {
          // @TODO - Use hostedFieldInstance to send data to Braintree
          this.hostedFieldInstance = hostedFieldInstance;
      })
      .catch(err => {
      });
    }
};
</script>

<template>
  <div>
    <h1>Riepilogo Acquisti</h1>
    <!-- Lista dei prodotti nel carrello -->
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - Quantità: {{ item.quantity }} - Prezzo: €
        {{ item.price * item.quantity }}
      </li>
    </ul>

    <!-- Totale del carrello -->
    <h3>Totale: € {{ cartTotal }}</h3>

    <!-- Bottone per simulare il pagamento -->
    <button class="btn btn-primary" @click="simulatePayment">
      Procedi al pagamento
    </button>
  </div>
  
  <form>
    <div class="alert alert-success" v-if="nonce">
      Successfully generated nonce.
    </div>
    <div class="alert alert-danger" v-else-if="error">
      {{ error }}
    </div>
    <div class="form-group">
        <label for="amount">Amount</label>
        <div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text">$</span></div>
            <input type="number" id="amount" class="form-control" placeholder="Enter Amount">
        </div>
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
/* Aggiungi qui il tuo CSS */
</style>

