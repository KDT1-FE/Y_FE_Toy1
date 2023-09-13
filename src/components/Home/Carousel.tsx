import React, {useState, useEffect} from "react";
import "../../styles/Carousel.css";
import img1 from "../../assets/slide1.jpg";
import img2 from "../../assets/slide2.jpg";

function Carousel() {
  const images = [img1, img2];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow">
      <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
    </div>
  );
}

export default Carousel;
