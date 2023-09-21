import * as style from "./homeStyle";
import styled from 'styled-components';
import Carousel from '../../components/home/Carousel';
import GalleryPreview from '../../components/home/GalleryPreview';


export default function Home() {


  return (
    <>
      <style.Temp>
        <style.MainTitle>
          <h3>공지사항</h3>
        </style.MainTitle>
        <style.MainCarousel>
          <Carousel />
        </style.MainCarousel>
        <style.WikiTitle>
          <h3>최근 업데이트 된 WIKI</h3>
        </style.WikiTitle>
        <style.Item4>
        </style.Item4>
        <style.Item5>
        </style.Item5>
        <style.GalleryTitle>
          <h3>최근 업데이트 된 GALLERY</h3>
        </style.GalleryTitle>
        <style.GalleryPreview>
          <GalleryPreview />
        </style.GalleryPreview>
      </style.Temp>
    </>
  );
}
