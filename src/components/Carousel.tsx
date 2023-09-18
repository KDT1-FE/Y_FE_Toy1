import { useEffect, useState } from 'react';
import styled from 'styled-components'; 
import slideImg1 from '../assets/slideImage1.png'; 
import slideImg2 from '../assets/slideImage2.png'; 
import slideImg3 from '../assets/slideImage3.png'; 
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';

export default function Carousel() {
  const imagesUrl = [slideImg1, slideImg2, slideImg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesUrl.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesUrl.length) % imagesUrl.length);
  };

  useEffect(() => {
    const intervalId = setInterval(showNextImage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <CarouselWrap>
        <ImageWrap>
          <ArrowButtonLeft onClick={showPreviousImage} >
            <GrFormPrevious size='40px'/>
          </ArrowButtonLeft>
          {
            imagesUrl &&
            imagesUrl.map((image, index) => (
              <Image
                key={index}
                src={image}
                style={{display: index === currentImageIndex ? 'block' : 'none'}}
              />
            ))
          }
          <ArrowButtonRight onClick={showNextImage} > 
            <GrFormNext size='40px'/>
          </ArrowButtonRight>
        </ImageWrap>
        <ImageButtonWrap>
          {
            imagesUrl &&
            imagesUrl.map((_, index) => (
              <ImageButton 
                key={index} 
                onClick={() => showImage(index)}
              >
                {
                  currentImageIndex === index ? 
                    <GoDotFill size='16px'/>
                    :
                    <GoDot size='16px'/>
                }
              </ImageButton>
          ))}
        </ImageButtonWrap>
      </CarouselWrap>
    </>
  );
};

const CarouselWrap = styled.div`
  margin-top: 1.5rem;
`;

const ArrowButton = styled.button`
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%); 
  z-index: 1;
  background-color: transparent;
  display: flex;
  border: none;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s; 
    background-color: rgba(255, 255, 255, 0.5); 
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5); 
  }
`;

const ArrowButtonLeft = styled(ArrowButton)`
  left: 12px;
`;

const ArrowButtonRight = styled(ArrowButton)`
  right: 12px; 
`;

const ImageWrap = styled.div`
  position: relative;
`;

const Image = styled.img`
  border: 1px solid #C2C2C2;
  width: 100%;
  height: 100%;
  /* height: 18rem; */
  object-fit: cover;
  position: relative;
`;

const ImageButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 3px;

  &:hover {
    cursor: pointer;
  }
`;