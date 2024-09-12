<script>
    import axios from 'axios';

    export default {
        /* name: 'AppRestaurants',
        data() {
            return {
                restaurants: []
                };
            },
        created() {
            this.fetchRestaurants();
            },
        methods: {
            fetchRestaurants() {
                axios.get('http://localhost:8000/api/restaurants')
                    .then(response => {
                    this.restaurants = response.data;
                })
                .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
        }
    }*/
}; 
</script>

<template>
    <footer>
        <h1>restaurants</h1>
        <ul>
            <!--<li v-for="restaurant in restaurants" :key="restaurant.id">
                {{ restaurant.name }}
            </li> -->
            <li>
                <p>Restaurant 1</p>
            </li>
            <li>
                <p>Restaurant 2</p>
            </li>
            <li>
                <p>Restaurant 3</p>
            </li>
            <li>
                <p>Restaurant 4</p>
            </li>
            <li>
                <p>Restaurant 5</p>
            </li>
        </ul>
    </footer>
</template>

<style lang="scss" scoped>

</style>
