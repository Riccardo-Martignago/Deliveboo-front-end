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