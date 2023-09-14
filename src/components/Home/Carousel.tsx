import React, {useState, useEffect} from "react";
import "../../styles/Carousel.css";
import img1 from "../../assets/slide01.jpg";
import img2 from "../../assets/slide02.jpg";
import img3 from "../../assets/slide03.jpg";
import img4 from "../../assets/slide04.jpg";
import img5 from "../../assets/slide05.jpg";
import img6 from "../../assets/slide06.jpg";
import img7 from "../../assets/slide07.jpg";
import img8 from "../../assets/slide08.jpg";
import img9 from "../../assets/slide09.jpg";
import img10 from "../../assets/slide10.jpg";

function Carousel() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow">
      <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
    </div>
  );
}

export default Carousel;
