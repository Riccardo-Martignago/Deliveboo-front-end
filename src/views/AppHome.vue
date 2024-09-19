<script>
export default {
  data() {
    return {
      primaFilaImages: [
        { src: './src/img/img1.jpg', alt: 'Immagine 1' },
        { src: './src/img/img2.png', alt: 'Immagine 2' },
        { src: './src/img/img3.png', alt: 'Immagine 3' },
        { src: './src/img/img4.jpg', alt: 'Immagine 4' },
        { src: './src/img/img5.png', alt: 'Immagine 5' },
        { src: './src/img/img6.jpg', alt: 'Immagine 6' },
        { src: './src/img/img7.png', alt: 'Immagine 7' },
        { src: './src/img/img8.png', alt: 'Immagine 8' }
      ],
      secondaFilaImages: [
        { src: './src/img/img9.jpg', alt: 'Immagine 9' },
        { src: './src/img/img10.jpg', alt: 'Immagine 10' },
        { src: './src/img/img11.jpg', alt: 'Immagine 11' },
        { src: './src/img/img12.jpg', alt: 'Immagine 12' },
        { src: './src/img/img13.jpg', alt: 'Immagine 13' },
        { src: './src/img/img14.jpg', alt: 'Immagine 14' },
        { src: './src/img/img15.jpg', alt: 'Immagine 15' },
        { src: './src/img/img16.jpg', alt: 'Immagine 16' }
      ],
      cards: [
        { 
            src: './src/img/1.jpg',
            title:'Diventa nostro partner',
            description:'Raggiungi più clienti con Deliveroo. Gestiamo noi la consegna, così tu puoi dedicarti a offrire i migliori piatti e prodotti.',
        },
        { 
            src: './src/img/2.jpg',
            title: 'Consegna con noi',
            description:'La libertà di consegnare dove e quando vuoi, con ottimi guadagni, convenzioni e sconti riservati a te.'
        },
        { 
            src: './src/img/3.jpg',
            title:'Deliveboo for Work',
            description:'Da pranzi aziendali a budget personalizzati per i dipendenti, possiamo offrire la soluzione giusta per qualsiasi esigenza.'
        },
        
      ],
    };
  }
}
</script>


<template>
  <main>
    <div class="row d-flex container">
      <div class="col-sm-10 description">
        <h1>
          Ordina i tuoi piatti preferiti, dove vuoi, quando vuoi
        </h1>
        <p>
          Scopri il nostro servizio di consegna a domicilio che ti porta il meglio della cucina direttamente a casa tua o in ufficio. Scegli tra una vasta selezione di ristoranti e gusti, dal comfort food ai piatti gourmet, e ricevi il tuo ordine in modo rapido e sicuro. Con pochi clic, il tuo pasto è già in arrivo!
        </p>
      </div>
      <div class="col-sm-2 img">
        <img src="../img/file.png" alt="">
      </div>
    </div>

    <div class="ristoranti">
    <div class="scroll-container flex-wrap">
      <div class="scroll-content col-sm-12">
        <img v-for="(image, index) in primaFilaImages" :key="index" :src="image.src" :alt="image.alt" class="img-scroll">
        <img v-for="(image, index) in primaFilaImages" :key="index" :src="image.src" :alt="image.alt" class="img-scroll">
        </div>
        <div class="scroll-content col-sm-12">
          <img v-for="(image, index) in secondaFilaImages" :key="index" :src="image.src" :alt="image.alt" class="img-scroll">
          <img v-for="(image, index) in secondaFilaImages" :key="index" :src="image.src" :alt="image.alt" class="img-scroll">
        </div>
    </div>
  </div>

  <div class="row d-flex container pt-5 pb-5">
      <div class="col-sm-10 posizione">
        <h1>
          Segui gli ordini passo passo
        </h1>
        <p>
          I piatti e i prodotti che ami, consegnati in pochissimo tempo. Vedrai quando il rider ha ritirato l'ordine, che potrai seguire passo passo, e riceverai una notifica quando sarà quasi da te.
        </p>
      </div>
      <div class="col-sm-2 img">
        <img src="../img/mappa.jpg" alt="">
      </div>
    </div>

    <div class="d-flex justify-content-center work">
        <div class="cards d-flex justify-content-center">
            <div v-for="(card, index) in cards" :key="index">
                <img :src="card.src" alt="">
                <h1> {{ card.title }}</h1>
                <p> {{ card.description }}</p>
            </div>
        </div>
      </div>

      
  </main>
</template>

<style>

.description{
    margin-top: 130px;
    padding: 2rem 10rem 5rem 5rem;
    

    h1{
      font-size: 70px;
      color: rgb(134, 181, 222);
      font-weight: bold;
    }

    p{
      font-size: 22px;
      padding: 2rem 10rem 0rem 0rem;
    }

    
  }

  .posizione{
    padding: 2rem 20rem 5rem 8rem;

    h1{
      font-size: 70px;
      color: rgb(134, 181, 222);
      font-weight: bold;
    }

    p{
      font-size: 22px;
      padding: 2rem 10rem 0rem 0rem;
    }
  }
  div.img{

    img{
      width: 600px;
      margin-top: 5rem;
      background-color: white;
      margin-left: 6rem;
    }

  
    
    
  }
  
  .ristoranti {
  overflow: hidden; 
  position: relative;
  max-width: 100%;
}

.scroll-container {      
  display: flex;
  overflow: hidden;

  .scroll-content {
    display: flex;
    flex-direction: row;
    animation: scroll 40s linear infinite;

    .img-scroll {
      border-radius: 25px;
      width: 250px;
      height: 250px;
      margin-right: 10px;
      padding: 0.5rem;
    }
  }
}



@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.work{
  img{
      width: 480px;
      height: 450px;
      border-radius: 30px;
  }
  
  
  
  .cards>div{
      width: 30%;
      padding: 3rem;
  
      h1{
          font-size: 35px;
          color:  rgb(134, 181, 222);
          font-weight: bold;
          padding-top: 1rem;
      }
  
      p{
          font-size: 20px;
          padding-top: 1rem;
      }
  }

}





  
</style>