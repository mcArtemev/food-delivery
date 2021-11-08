import Swiper, { Autoplay, Navigation } from "swiper";

Swiper.use([Autoplay, Navigation]);

const slider = () => {
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
           delay: 2500,
           disableOnInteraction: false, 
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });
}

export default slider;