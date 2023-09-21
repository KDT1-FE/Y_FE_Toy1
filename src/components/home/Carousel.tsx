import * as style from './CarouselStyle';
import { useState, useEffect, useRef, useCallback } from 'react';
import carouselData from '../../db/wiki/CarouselData';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';


const Carousel = () => {
  const vw = window.innerWidth;
  const initialCarouselWidth = vw * 62 / 100;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>(initialCarouselWidth);

  const docRef = useRef<number | null>(null);
  const carouselRef = useRef(null);

  window.addEventListener('resize', () => {
    const vw = window.innerWidth;
    const vw67 = (vw * 62) / 100;
    const parentWidth = carouselRef.current ? vw67 : 938;
    setCarouselWidth(parentWidth);
  });

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToNext = useCallback (() => {
    const isLastSlide = currentIndex === carouselData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (docRef.current !== null) {
        clearTimeout(docRef.current);
    }
    docRef.current = window.setTimeout(() => {
      goToNext();
    }, 3000);

    return () => {
      if (docRef.current !== null) {
        clearTimeout(docRef.current);
      }
    };
  }, [goToNext]);

  const goToCarousel = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  return (
    <>
      <div style={{width: '62vw', height: '100%'}}> {/*  추후 스타일드 컴포넌트로 수정 예정 => height: "100%"  */}
        <style.CarouselWrapper>

          <style.CarouselLeftBackDrop />

          <style.CarouselLeftButton onClick={goToPrevious}>
            <BsArrowLeftCircle />
          </style.CarouselLeftButton>

          <style.CarouselTitle href={"/wiki"}>
            {carouselData[currentIndex].title}
          </style.CarouselTitle>
          <style.CarouselText href={"/wiki"}>
            {carouselData[currentIndex].text}
          </style.CarouselText>


          <style.CarouselContainer 
            currentIndex={currentIndex}
            carouselWidth={carouselWidth}>

            {carouselData.map((data, pageIndex) => (
              <>
                <style.CarouselContent 
                  pageIndex={pageIndex}
                  ref={carouselRef}
                  carouselWidth={carouselWidth}>
                  <style.CarouselPageButton href={`${carouselData[pageIndex].link}`}>자세히 보기</style.CarouselPageButton>
                </style.CarouselContent>
              </>
            ))}

          </style.CarouselContainer>

          <style.CarouselRightButton onClick={goToNext}>
            <BsArrowRightCircle /> 
          </style.CarouselRightButton> 

          <style.CarouselDotContainer>
            {carouselData.map((data, pageIndex) => (
              <style.CarouselDot 
                key={pageIndex} 
                onClick={() => goToCarousel(pageIndex)} />
            ))}
          </style.CarouselDotContainer>

        </style.CarouselWrapper>  
      </div>    
    </>
  );
};

export default Carousel;