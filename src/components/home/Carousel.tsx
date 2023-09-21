import * as style from './CarouselStyle';
import { useState, useEffect, useRef, useCallback } from 'react';
import carouselData from '../../db/wiki/CarouselData';

const Carousel = () => {
  const vw = window.innerWidth;
  const initialCarouselWidth = vw * 62 / 100;

  const [currentindex, setCurrentindex] = useState<number>(0);
  const [carouselwidth, setCarouselwidth] = useState<number>(initialCarouselWidth);

  const docRef = useRef<number | null>(null);
  const carouselRef = useRef(null);

  window.addEventListener('resize', () => {
    const vw = window.innerWidth;
    const vw67 = (vw * 62) / 100;
    const parentWidth = carouselRef.current ? vw67 : 938;
    setCarouselwidth(parentWidth);
  });

  const goToNext = useCallback (() => {
    const isLastSlide = currentindex === carouselData.length - 1;
    const newIndex = isLastSlide ? 0 : currentindex + 1;
    setCurrentindex(newIndex);
  }, [currentindex]);

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

  const goToCarousel = (pageindex: number) => {
    setCurrentindex(pageindex);
  };

  return (
    <>
      <div style={{width: '62vw', height: '100%'}}> {/*  추후 스타일드 컴포넌트로 수정 예정 => height: "100%"  */}
        <style.CarouselWrapper>

          <style.CarouselLeftBackDrop />

          <style.CarouselTitle href={"/wiki"}>
            {carouselData[currentindex].title}
          </style.CarouselTitle>
          <style.CarouselText href={"/wiki"}>
            {carouselData[currentindex].text}
          </style.CarouselText>


          <style.CarouselContainer 
            currentindex={currentindex}
            carouselwidth={carouselwidth}>

            {carouselData.map((_, pageindex) => (
              <>
                <style.CarouselContent
                  ref={carouselRef}
                  currentindex={currentindex}
                  pageindex={pageindex}
                  carouselwidth={carouselwidth}>
                  <style.CarouselPageButton href={`${carouselData[pageindex].link}`}>자세히 보기</style.CarouselPageButton>
                </style.CarouselContent>
              </>
            ))}

          </style.CarouselContainer>

          <style.CarouselDotContainer>
            {carouselData.map((_, pageindex) => (
              <style.CarouselDot 
                onClick={() => goToCarousel(pageindex)} />
            ))}
          </style.CarouselDotContainer>

        </style.CarouselWrapper>  
      </div>    
    </>
  );
};

export default Carousel;