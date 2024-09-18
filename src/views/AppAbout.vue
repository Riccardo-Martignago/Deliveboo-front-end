<template>
    <main>
        <div class="container">
            <div class="chisiamo">
                <div>
                    <h1>
                        Chi Siamo
                    </h1>
                    <p>
                        Benvenuti su Deliveboo, la tua destinazione preferita per gustare piatti deliziosi e prodotti freschi direttamente a casa tua. La nostra missione è semplice: portare qualità e sapori autentici alla tua porta, senza compromessi sulla freschezza o il servizio.
    
                        Collaboriamo con i migliori ristoranti locali e fornitori di prodotti alimentari per offrirti una selezione che spazia dalla cucina tradizionale ai piatti più innovativi, soddisfacendo ogni palato. Che tu stia cercando un pasto veloce o ingredienti di qualità per le tue ricette, siamo qui per rendere la tua esperienza facile, veloce e piacevole.
                    </p>
                </div>
                <img src="../img/chi siamo.webp" alt="">
            </div>
            <div class="lanostravisione flex-row-reverse">
                <div>
                    <h1>
                        La nostra visione
                    </h1>
                    <p>
                        Crediamo che il cibo sia molto più di semplice nutrimento: è cultura, comunità e creatività. La nostra visione è quella di creare un'esperienza che connetta le persone ai sapori unici della loro città, promuovendo la sostenibilità e valorizzando i produttori locali. Vogliamo essere il ponte tra te e la tua passione per il cibo, offrendo sempre il meglio, dal primo clic fino alla consegna.
                    </p>
                </div>
                <img src="../img/visione.jpg" alt="">
            </div>
            <div class="inostrivalori">
                <div>
                    <h1>
                        I nostri valori
                    </h1>
                    <p>
                        Qualità, freschezza e trasparenza sono al centro di tutto ciò che facciamo. Ci impegniamo a selezionare solo i migliori ingredienti e partner, garantendo che ogni ordine soddisfi gli standard più elevati. La tua soddisfazione è la nostra priorità, e ci sforziamo di rendere ogni interazione con noi positiva, con un servizio clienti attento e consegne puntuali, ovunque tu sia.
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
    div.container{
        padding-top: 150px;

        div{
            display: flex;
            margin: 5rem 0rem;
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
</style>
