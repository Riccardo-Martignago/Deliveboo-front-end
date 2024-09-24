<script>
export default {
    data() {
        return {
            menuItems: [
                "Investitori",
                "Chi siamo",
                "Ristoranti",
                "Altro",
                "Pressroom",
                "Programmazione",
                "Design",
                "Lavora con noi",
                "Diventa nostro partner"
            ],
            legalItems: [
                "Termini & Condizioni",
                "Informativa sulla privacy",
                "Cookies",
                "Classificazione dei partner",
                "Richieste da parte delle Autorità Pubbliche"
            ],
            infoItems: [
                "Contatti",
                "FAQ",
                "Tipi di cucina"
            ]
        };
    }
}
</script>


<template>
    <footer class="d-flex justify-content-center flex-wrap">
        <div class="menu section">
            <h1>
                Discover Deliveboo
            </h1>
            <ul>
                <li v-for="(item, index) in menuItems" :key="'menu-' + index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="lega section">
            <h1>
                Legal notes
            </h1>
            <ul>
                <li v-for="(item, index) in legalItems" :key="'legal-' + index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="info section">
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
    footer {
        background-color: #2e3333;
        color: white;
        padding: 5rem 0;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .section {
            margin: 2rem;
            width: 100%; 
            background-color: #434848;

            h1 {
                padding-left: 2rem;
                padding-top: 2rem;
                font-size: 1.5rem;
            }

            ul {
                padding-left: 2rem;
                padding-top: 0.7rem;

                li {
                    padding-top: 0.3rem;
                }

                li:hover {
                    color: rgb(72, 248, 248);
                }
            }
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

       
        @media (min-width: 768px) {
            .section {
                width: 45%; 
            }
        }

        
        @media (min-width: 1024px) {
            .section {
                width: 25%;
            }

            h1 {
                font-size: 30px; 
            }
        }
    }

</style>
