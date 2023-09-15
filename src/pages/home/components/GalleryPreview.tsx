import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import app from '../../../../firebase';
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";


export default function GalleryPreview () {
  
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const galleryImagesRef = useRef<number | null>(null);


  useEffect(() => {
    const storage = getStorage(app);
    const listRef = ref(storage, "1moHSjI2ZdSS9iPoZMnp");

    async function fetchImageURLs() {
      try {
        const listResult = await list(listRef, { maxResults: 3 });

        const paths = listResult.items.map(item => item.fullPath);

        const urlPromises = paths.map(async (path) => {
          return await getDownloadURL(ref(storage, path));
        });

        const urls = await Promise.all(urlPromises);

        setGalleryImages(urls);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    }

    fetchImageURLs();
  }, []); 

  console.log(galleryImages);


  const goToNext = useCallback (() => {
    const isLastSlide = currentIndex === galleryImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, galleryImages]);
  
  useEffect(() => {
    console.log('useEffect called');

    if (galleryImagesRef.current !== null) {
        clearTimeout(galleryImagesRef.current);
    }
    galleryImagesRef.current = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => { 
      if (galleryImagesRef.current !== null) {
        clearTimeout(galleryImagesRef.current);
        } 
      };
    }, [goToNext]);


  return (
    <>
      <GalleryPreviewStyle currentIndex={currentIndex} galleryImages={galleryImages}>
        <div style={{height: '12.5rem'}}></div>
      </GalleryPreviewStyle>
    </>
  );
}


const GalleryPreviewStyle = styled.div`
  background-image: ${({ galleryImages, currentIndex }) => `url(${galleryImages[currentIndex]})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

