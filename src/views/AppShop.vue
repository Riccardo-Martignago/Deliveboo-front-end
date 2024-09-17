<script>
export default {
  data() {
    return {
      cart: [],      // Array per i dati del carrello
      cartTotal: 0,  // Totale del carrello
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
    }
  },
  created() {
    // Caricare il carrello dal localStorage e calcolare il totale quando il componente viene creato
    this.loadCartFromLocalStorage();
    this.calculateCartTotal();
  },
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
</template>

<style scoped>
/* Aggiungi qui il tuo CSS */
</style>

