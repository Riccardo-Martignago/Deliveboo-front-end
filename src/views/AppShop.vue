<script>
export default {
  data() {
    return {
      cart: [],
      cartTotal: 0,
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
      alert(`Pagamento completato per un totale di € ${this.cartTotal}`);
      this.clearCart();
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
      this.calculateCartTotal();
    }
  },
  created() {
    this.loadCartFromLocalStorage();
    this.calculateCartTotal();
  },
};
</script>

<template>
  <div>
    <h1>Riepilogo Acquisti</h1>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - Quantità: {{ item.quantity }} - Prezzo: €
        {{ item.price * item.quantity }}
      </li>
    </ul>

    <h3>Totale: € {{ cartTotal }}</h3>

    <button class="btn btn-primary" @click="simulatePayment">
      Procedi al pagamento
    </button>
  </div>
</template>

<style scoped>

</style>

