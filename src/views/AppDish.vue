<script>
import axios from 'axios';
      export default {
        
        data() {
          return{
            dishes: [],
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
        },
        created(){
        this.getDishes();
      },
    }

</script>

<template>
    <h1>Menù del Ristorante</h1>    
    <div class="row">
      <div class="col-sm-12 d-flex flex-wrap justify-content-center">
        <div class="card col-sm-2 p-1 m-3 border" v-for="dish in dishes" :key="dish.id">
            <img :src="getImageUrl(dish.photo)" alt="Dish Photo" class="card-img-top"/>         
            <h3 class="card-title">{{ dish.name }}</h3>
          
            <p class="typology">
                <span class="fs">Descrizione:</span> {{ dish.description }}
            </p>
            <p>
                <span>Prezzo:</span> {{dish.price}}
            </p>
            </div>
        </div>
    </div>
</template>

<style>

</style>