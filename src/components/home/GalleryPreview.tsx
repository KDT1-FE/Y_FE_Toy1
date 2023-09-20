import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { app } from '../../../firebase';
import { getStorage, ref, list, listAll, getMetadata, getDownloadURL } from 'firebase/storage';

interface GalleryPreviewStyle {
  imagePaths: string[];
  currentIndex: number;
}

export default function GalleryPreview () {

  interface ImageInfo {
    url: string;
    metadata: {
      customMetadata?: {
        timestamp?: string;
      };
    };
  }

  // 최신 등록된 사진의 순서가 반영되는 코드(1moHSjI2ZdSS9iPoZMnp 갤러리의 사진들)
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage(app);
        const imagesRef = ref(storage, `Gallery/1moHSjI2ZdSS9iPoZMnp`);
        const imageList = await listAll(imagesRef);

        const paths = imageList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);

          return { url, metadata };
        });

        const imageInfoList: ImageInfo[] = await Promise.all(paths);
        const sortedImages = imageInfoList.sort((a, b) => {
          if (a.metadata.customMetadata) {
            console.log('metadata sorting...');
          }
          const timestampA = a.metadata.customMetadata!.timestamp;
          const timestampB = b.metadata.customMetadata!.timestamp;
          return (
          new Date(timestampA || '').getTime() - new Date(timestampB || '').getTime()
          );
        });

        const urls = sortedImages.map((item) => item.url).slice(0, 3);
        setImagePaths(urls);
      } catch (error) {
      console.error("이미지 목록을 가져오는 중 오류 발생:", error);
    }
  };

  fetchImages();
  }, []);


  // 기존 코드 
  // currentIndex state의 자동 변경으로 슬라이드가 넘어갑니다.
  // const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const galleryImagesRef = useRef<number | null>(null);

  // useEffect(() => {
  //     const storage = getStorage(app);
  //     const listRef = ref(storage, "Gallery/1moHSjI2ZdSS9iPoZMnp");

  //     async function fetchImageURLs() {
  //       try {
  //         const listResult = await list(listRef, { maxResults: 3 });

      //     const paths = listResult.items.map((item) => item.fullPath);

      //     const urlPromises = paths.map(async (path) => {
      //       return await getDownloadURL(ref(storage, path));
      //     });

      //     const urls = await Promise.all(urlPromises);

      //     setGalleryImages(urls);
      //   } catch (error) {
      //     console.error("Error fetching URLs:", error);
      //   }
      // }

  //     fetchImageURLs();
  // }, []); 






  const goToNext = useCallback (() => {
    const isLastSlide = currentIndex === imagePaths.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, imagePaths]);
  
  useEffect(() => {

    if (galleryImagesRef.current !== null) {
        clearTimeout(galleryImagesRef.current);
    }
    galleryImagesRef.current = window.setTimeout(() => {
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
      <GalleryPreviewStyle currentIndex={currentIndex} imagePaths={imagePaths}>
        <div style={{height: '20rem'}}></div>
      </GalleryPreviewStyle>
    </>
  );
}

const GalleryPreviewStyle = styled.div<GalleryPreviewStyle>`
  background-image: ${({ imagePaths, currentIndex }) => `url(${imagePaths[currentIndex]})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  min-width: 150px;
`



