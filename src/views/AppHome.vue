<script >
import axios from 'axios';
export default {
    data() {
        return{
          restaurantsWithTypology: [],
        }
    },
    methods:{
        getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/typologies', {
                params:{
                }
            })
            .then((response) => {
                console.log(response.data);
                this.restaurantsWithTypology = response.data.filter((typology) => typology.restaurants && typology.restaurants.length > 0) .map((typology) => {
                  return typology.restaurants.map((restaurant) => {
                  return {
                    ...restaurant,
                    typologyName: typology.name,
                  };
              });
            })
            .flat(); // Appiattire l'array per evitare array annidati;
            })
            .catch(function (error){
                console.log(error);
            })
        },
        getImageUrl(photoPath) {
        return `http://127.0.0.1:8000/uploads/${photoPath}`;
    }
    },
    created(){

      this.getRestaurants();
    }
}
</script>

<template>
  <main>
    <div class="row">
      <div class="col-sm-12 d-flex flex-wrap justify-content-center">
          <div class="card col-sm-2 pt-3 ps-1 pe-1 pb-3 m-3 border" v-for="restaurant in restaurantsWithTypology" :key="restaurant.id">
            <h3 class="card-title">
              {{ restaurant.name }}
            </h3>
            <img :src="getImageUrl(restaurant.photo)" alt="Restaurant Photo" class="card-img-top"/>
            <p class="typology">
              <span class="fs">Tipologia:</span> {{ restaurant.typologyName }}
            </p>
            <p>
              <span>Indirizzo:</span> {{ restaurant.adress }}
            </p>
            <p>
              <span>Partita Iva:</span> {{ restaurant.piva }}
            </p>
         </div>
      </div>
    </div>
  </main>
</template>


<style>

div.card{
  box-shadow: 5px 5px 5px #757171;
  border-radius: 20px;

  img{
    width: 100%;
    height: 200px;
    margin: 0 auto;
    padding-top: 1rem;
    border-radius: 20px;
  }

  p.typology{
    font-size: 20px;
    font-weight: bold;
    padding-top: 1rem;
  }

  h3{
    text-transform: capitalize;
    font-size: 25px;
    font-weight: revert;
    text-shadow:  5px 5px 5px rgb(79, 76, 76);
    color: rgb(81, 61, 61);
    text-align: center;
  }
  
  p{
    font-size: 20px;
    font-weight: revert;
    padding: 0;
    margin: 0;
  
    span{
      font-weight: 600;
      color: rgb(81, 61, 61);
      padding-right: 0.5rem;
    }

    span.fs{
      font-size: 20px;
    }
  }
}

</style>