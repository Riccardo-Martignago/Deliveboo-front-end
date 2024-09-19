<script>
export default {
    data() {
        return {
            menuItems: [
                "Investors",
                "About us",
                "Restaurants",
                "Other",
                "Pressroom",
                "Programming",
                "Design",
                "Work with us",
                "Become our partner"
            ],
            legalItems: [
                "Terms & Conditions",
                "Privacy Policy",
                "Cookies",
                "Partner Rating",
                "Requests from Public Authorities"
            ],
            infoItems: [
                "Contacts",
                "FAQ",
                "Types of Cuisine"
            ]
        };
    }
}
</script>


<template>
    <footer class="d-flex justify-content-center">
        <div class="menu">
            <h1>
                Discover Deliveboo
            </h1>
            <ul>
                <li v-for="(item, index) in menuItems" :key="'menu-' + index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="lega">
            <h1>
                Legal notes
            </h1>
            <ul>
                <li v-for="(item, index) in legalItems" :key="'legal-' + index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="info">
            <h1>
                Help
            </h1>
            <ul>
                <li v-for="(item, index) in infoItems" :key="'info-' + index">
                    {{ item }}
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss">
    footer{
        background-color: #2e3333;
        color: white;
        padding: 5rem 0rem;

        div{
            margin: 2rem;
            width: 25%;
            background-color: #434848;

            h1{
                padding-left: 2rem;
                padding-top: 2rem;
            }

            ul{
                padding-left: 2rem;
                padding-top: 0.7rem;

                li{
                    padding-top: 0.3rem;
                }

                li:hover{
                    color: rgb(72, 248, 248);
                }
            }
        }
        
        h1{
            font-size: 30px;
            font-weight: bold;
        }

        ul{
            list-style-type: none;
            padding: 0;
        }
    }

</style>
