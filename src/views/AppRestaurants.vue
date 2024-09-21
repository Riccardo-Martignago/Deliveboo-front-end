<script >
import axios from 'axios';

export default {
  data() {
    return {
      restaurantsWithTypology: [],
      typologies: [],
      selectedTypologies: [],
      dropdownActive: false,
    };
  },
  computed: {
    filteredRestaurants() {
  if (this.selectedTypologies.length === 0) {
    return this.restaurantsWithTypology;
  }
  return this.restaurantsWithTypology.filter((restaurant) =>
    this.selectedTypologies.every((typologyId) =>
      restaurant.typologyId.includes(typologyId)
    )
  );
},
  },
  methods: {
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
      console.log('Dropdown status:', this.dropdownActive);
    },
    getRestaurants() {
      axios.get('http://127.0.0.1:8000/api/typologies')

      .then((response) => {
        console.log(response.data); // Controlla se le tipologie vengono caricate
        this.typologies = response.data; // Aggiorna le tipologie
        const restaurantMap = new Map();

        response.data.forEach((typology) => {
          if (typology.restaurants && typology.restaurants.length > 0) {
            typology.restaurants.forEach((restaurant) => {
              if (restaurantMap.has(restaurant.id)) {
                restaurantMap.get(restaurant.id).typologyId.push(typology.id);
                restaurantMap.get(restaurant.id).typologyName.push(typology.name);
              } else {
                restaurantMap.set(restaurant.id, {
                  ...restaurant,
                  typologyId: [typology.id],
                  typologyName: [typology.name],
                });
              }
            });
          }
      });

      this.restaurantsWithTypology = Array.from(restaurantMap.values());
    })
    .catch((error) => {
      console.log(error);
    });
  },
        getImageUrl(photoPath) {
          
          return `http://127.0.0.1:8000/uploads/${photoPath}`;
        },
        getImageStore(photoPath){
          return `http://127.0.0.1:8000/storage/${photoPath}`;
        },  
        selectRestaurant(restaurant) {
        localStorage.setItem('userId', restaurant.id);
        localStorage.setItem('name', restaurant.name);
        localStorage.setItem('email', restaurant.email);
        localStorage.setItem('photo', restaurant.photo);
        localStorage.setItem('piva', restaurant.piva);
        localStorage.setItem('adress', restaurant.adress);
        
        console.log('Data saved to localStorage:', {
          name: restaurant.name,
          email: restaurant.email,
          photo: restaurant.photo,
          piva: restaurant.piva,
          adress: restaurant.adress
        });

        window.location.href = 'dish';
      },
      },
      created(){

        this.getRestaurants();
      }
    }
</script>

<template>
  <main>
    <div class="col-sm-12 d-flex justify-content-center align-items-center">
      <div class="dropdown" :class="{ active: dropdownActive }">
        <div class="dropdown-header" @click="toggleDropdown">
          <span class="dropdown-title">Choose your restaurant based on your preferences!</span>
          <i :class="dropdownActive ? 'arrow-up' : 'arrow-down'"></i>
        </div>
        <div class="dropdown-content">
          <label v-for="typology in typologies" :key="typology.id" class="dropdown-label">
            <input 
              type="checkbox" 
              :value="typology.id" 
              v-model="selectedTypologies"
              @change="console.log(selectedTypologies)" 
            />
            {{ typology.name }}
          </label>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-sm-12 d-flex flex-wrap justify-content-center">
        <div class="card col-sm-2 p-1 m-3 border" @click="selectRestaurant(restaurant)" v-for="restaurant in filteredRestaurants" :key="`${restaurant.id}-${restaurant.typologyId}`">
          <img v-if="!restaurant.photo.includes('uploads/')" :src="getImageUrl(restaurant.photo)" alt="Restaurant Photo" class="card-img-top"/>
          <img v-else :src="getImageStore(restaurant.photo)" alt="Restaurant Photo" class="card-img-top"/>
          <RouterLink :to="{ name: 'dish'}">            
            <h3 class="card-title">{{ restaurant.name }}</h3>
          </RouterLink>
          <div>
            <span class="fs">Typologies:</span>
            <p class="typology" v-for="typology in restaurant.typologyName">
              <span>{{ typology }}</span>
            </p>
          </div>
          <p>
            <span>Address:</span> {{ restaurant.adress }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dropdown {
  display: inline-block;
  width: 100%;
  max-width: 800px;
  padding: 25px;
  margin-top: 130px;

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 1rem 2rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;

    .dropdown-title {
      font-size: 25px;
      font-weight: bold;
    }

    .arrow-down::before {
      content: "▼";
      font-size: 20px;
      color: #00bfa6;
    }

    .arrow-up::before {
      content: "▲";
      font-size: 20px;
      color: #00bfa6;
    }
  }

  .dropdown-content {
    display: none;
    background-color: white;
    padding: 15px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;

    .dropdown-label {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .dropdown-label input {
      margin-right: 10px;
      transform: scale(1.3);
    }
  }

  &.active .dropdown-content {
    display: block;
  }
}

.card {
  width: 100%;
  max-width: 280px;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 1rem;
    text-transform: capitalize;
    text-align: center;
  }

  .typology {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 0.2rem 0;
    text-align: center;
  }

  p {
    font-size: 16px;
    margin: 0.5rem 0;
    text-align: center;

    span {
      font-weight: 600;
      padding-right: 0.5rem;
    }
  }

  span.fs {
    font-size: 16px;
  }
}

/* Responsiveness */
@media (max-width: 768px) {
  .dropdown {
    width: 100%;
    padding: 15px;
    .dropdown-header {
      padding: 0.8rem 1.5rem;
      .dropdown-title {
        font-size: 20px;
      }
    }

    .dropdown-content .dropdown-label {
      font-size: 18px;
    }
  }

  .card {
    max-width: 220px;
    .card-img-top {
      height: 180px;
    }

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
}

@media (max-width: 576px) {
  .dropdown {
    width: 100%;
    padding: 10px;

    .dropdown-header {
      padding: 0.5rem 1rem;
      .dropdown-title {
        font-size: 18px;
      }
    }

    .dropdown-content .dropdown-label {
      font-size: 16px;
    }
  }

  .card {
    max-width: 200px;
    .card-img-top {
      height: 160px;
    }

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
    }
  }
}
</style>

