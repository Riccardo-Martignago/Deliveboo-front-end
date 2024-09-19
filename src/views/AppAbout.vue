<template>
    <main>
        <div class="container">
            <div class="chisiamo">
                <div>
                    <h1>
                        Who we are
                    </h1>
                    <p>
                        We collaborate with the best local restaurants and food suppliers to offer you a selection that ranges from traditional cuisine to the most innovative dishes, satisfying every palate. Whether you're looking for a quick meal or quality ingredients for your recipes, we're here to make your experience easy, fast and enjoyable.
                    </p>
                </div>
                <img src="../img/chi siamo.webp" alt="">
            </div>
            <div class="lanostravisione flex-row-reverse">
                <div>
                    <h1>
                        Our vision
                    </h1>
                    <p>
                        We believe that food is much more than just nourishment: it is culture, community and creativity. Our vision is to create an experience that connects people to the unique flavors of their city, promoting sustainability and valorizing local producers. We want to be the bridge between you and your passion for food, always offering the best, from the first click to delivery.
                    </p>
                </div>
                <img src="../img/visione.jpg" alt="">
            </div>
            <div class="inostrivalori">
                <div>
                    <h1>
                        Our values
                    </h1>
                    <p>
                        Quality, freshness and transparency are at the heart of everything we do. We are committed to selecting only the best ingredients and partners, ensuring that every order meets the highest standards. Your satisfaction is our priority, and we strive to make every interaction with us positive, with attentive customer service and on-time deliveries, wherever you are.
                    </p>
                </div>
                <img src="../img/valori.png" alt="">
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'AppAbout'
    };
</script>

<style scoped>
   main{
        padding-top: 150px;
        
        div.container{

            div{
                display: flex;
                margin: 3rem 0rem;
                justify-content: space-between;
                align-items: center;
    
    
    
                div{
                    display: flex;
                    flex-direction: column;
                    width: 50%;
    
                    h1{
                        color:  rgb(134, 181, 222);
                        font-weight: bold;
                        font-size: 35px;
                        padding-bottom: 2rem;
                    }
    
                    p{
                        font-size: 18px;
                    }
                }
    
                img{
                    width: 40%;
                    height: 40%;
                }
            }
        }
    }
</style>
