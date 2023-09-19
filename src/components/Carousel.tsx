import { useEffect, useState } from 'react';
import styled from 'styled-components'; 
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';
import { storage } from '../common/config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export default function Carousel() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const showImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const carouselFolderRef = ref(storage, 'notice/carousel');
        const listResult = await listAll(carouselFolderRef);
    
        const imageUrls = [];
    
        // 각 이미지 URL 가져오기
        for (const itemRef of listResult.items) {
          const downloadUrl = await getDownloadURL(itemRef);
          imageUrls.push(downloadUrl);
        }
    
        setImageUrls(imageUrls);
      } catch (error) {
        console.error('이미지 URL을 가져오는 동안 오류 발생:', error);
      }
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    if (imageUrls.length === 0) {
      return;
    }

    const intervalId = setInterval(showNextImage, 5000);

    return () => clearInterval(intervalId);
  }, [imageUrls, currentImageIndex]);

  return (
    <>
      <CarouselWrap>
        <ImageWrap>
          <ArrowButtonLeft onClick={showPreviousImage} >
            <GrFormPrevious size='40px'/>
          </ArrowButtonLeft>
          {
            imageUrls &&
            imageUrls.map((image, index) => (
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
            imageUrls &&
            imageUrls.map((_, index) => (
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
  
  &:hover {
    cursor: pointer;
  }
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