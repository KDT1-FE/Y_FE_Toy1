import * as style from "./homeStyle";
import styled from 'styled-components';
import Carousel from '../../components/home/Carousel';
import GalleryPreview from '../../components/home/GalleryPreview';


export default function Home() {


  return (
    <>
      <style.Temp>
        <style.Item1>
          <h3>공지사항</h3>
        </style.Item1>
        <style.Item2>
          <Carousel />
        </style.Item2>
        <style.Item3>
          <h3>최근 업데이트 된 WIKI</h3>
        </style.Item3>
        <style.Item4>
        </style.Item4>
        <style.Item5>
        </style.Item5>
        <style.Item6>
          <h3>최근 업데이트 된 GALLERY</h3>
        </style.Item6>
        <style.Item7>
          <GalleryPreview />
        </style.Item7>
      </style.Temp>
    </>
  );
}
