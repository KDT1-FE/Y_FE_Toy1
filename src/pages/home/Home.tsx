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
          <img style={{width: '55.63rem', height: '44.75rem'}} src="/images/modal_health_care.svg" alt="" />
        </style.Item2>
        <style.Item3>
          <h3>최근 업데이트 된 WIKI</h3>
        </style.Item3>
        <style.Item4>
          <img style={{width: '22.5rem', height: '12.5rem'}} src="/images/modal_workshop.svg" alt="" />
        </style.Item4>
        <style.Item5>
          <img style={{width: '22.5rem', height: '12.5rem'}} src="/images/modal_reminder.svg" alt="" />
        </style.Item5>
        <style.Item6>
          <h3>최근 업데이트 된 GALLERY</h3>
        </style.Item6>
        <style.Item7>
          <GalleryPreview />
        </style.Item7>
      </style.Temp>
      <Carousel />
    </>
  );
}
