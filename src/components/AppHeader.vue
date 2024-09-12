<script>

    export default{
            name: 'Header',
        data(){
            return{
                linksName : [
                    {
                        label: "Home",
                        name: "home"
                    },
                    {
                        label: "Restaurants",
                        name: "restaurants"
                    }
                ]
            }
        },
    }
</script>

<template>
    <header>
        <nav>
            <ul>
                <li v-for="link in linksName" :key="link.name">
                    <router-link :to="{ name: link.name }">
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    background-color: #333;
    padding: 10px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
}

nav ul li {
    margin: 0 10px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

nav ul li a:hover {
    text-decoration: underline;
}
</style>
