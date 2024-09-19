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
            title:'Become our partner',
            description:'Reach more customers with Deliveroo. We handle the delivery, so you can focus on offering the best dishes and products.',
        },
        { 
            src: './src/img/2.jpg',
            title: 'Delivery with us',
            description:'The freedom to deliver where and when you want, with excellent earnings, agreements and discounts reserved for you.'
        },
        { 
            src: './src/img/3.jpg',
            title:'Deliveboo for Work',
            description:'From corporate lunches to personalized employee budgets, we can offer the right solution for any need.'
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
          Order your favorite dishes, wherever you want, whenever you want!
        </h1>
        <p>
          Discover our home delivery service that brings you the best of cuisine directly to your home or office. Choose from a wide selection of restaurants and flavors, from comfort food to gourmet dishes, and receive your order quickly and safely. With just a few clicks, your meal is already on its way!
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
          Follow orders step by step
        </h1>
        <p>
          The dishes and products you love, delivered in no time. You'll see when the rider has picked up the order, which you can follow step by step, and you'll receive a notification when it's almost there.
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