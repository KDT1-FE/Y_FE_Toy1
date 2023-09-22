import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { app } from "@/firebase/firebase";
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

interface GalleryPreviewStyle {
  imagePaths: string[];
  currentindex: number;
}

export default function GalleryPreview() {
  const navigate = useNavigate();

  const goToGallery = () => {
    navigate("/gallery");
  };

  interface ImageInfo {
    url: string;
    metadata: {
      customMetadata?: {
        timestamp?: string;
      };
    };
  }

  const [imagepaths, setImagepaths] = useState<string[]>();
  const [currentindex, setCurrentindex] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage(app);
        const imagesRef = ref(storage, `Gallery/0jL7NLzNrPzOuqeuJSk2`);
        const imageList = await listAll(imagesRef);

        const paths = imageList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);

          return { url, metadata };
        });

        const imageInfoList: ImageInfo[] = await Promise.all(paths);
        const sortedImages = imageInfoList.sort((a, b) => {
          const timestampA = a.metadata.customMetadata?.timestamp || "";
          const timestampB = b.metadata.customMetadata?.timestamp || "";
          if (timestampA && timestampB) {
            return (
              new Date(timestampB).getTime() - new Date(timestampA).getTime()
            );
          } else {
            return 0;
          }
        });

        const urls = sortedImages.map((item) => item.url).slice(0, 3);
        setImagepaths(urls);
      } catch (error) {
        console.error("이미지 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchImages();
  }, []);

  const galleryImagesRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    const isLastSlide = currentindex === imagepaths.length - 1;
    const newIndex = isLastSlide ? 0 : currentindex + 1;
    setCurrentindex(newIndex);
  }, [currentindex, imagepaths]);

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
      {imagepaths ? (
        <>
        <GalleryPreviewStyle
        $currentIndex={currentindex}
        $imagePaths={imagepaths}
        onClick={goToGallery}>

        <div style={{ height: "15rem" }}></div>
        </GalleryPreviewStyle>
        </>

      ) : (
      <GalleryPreviewSkeleton className={"skeleton"} />
      )}
    </>
  );
}

const GalleryPreviewSkeleton = styled.div`

  &.skeleton {
    position: relative;
    width: 100%;
    height: 15rem;
    overflow: hidden;
  
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
    color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(
      100deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1)
    );
    background-size: 400% 100%;
    animation: skeleton-loading 7s linear infinite;

    @keyframes skeleton-loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  }
`;

const GalleryPreviewStyle = styled.div<{
  $imagePaths: string[];
  $currentIndex: number;
}>`
  background-image: ${({ $imagePaths, $currentIndex }) =>
    `url(${$imagePaths[$currentIndex]})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (min-height: 920px) {
    height: 30vh;
  }
`;
