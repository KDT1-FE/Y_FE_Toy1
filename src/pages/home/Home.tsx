import * as style from "./homeStyle";
import styled from 'styled-components';
import Carousel from './components/Carousel';
import GalleryPreview from './components/GalleryPreview';


export default function Home() {
  return (
    <>
      <style.Temp>
          <div className="item1">
            <h3>공지사항</h3>
          </div>

          <div className="item2">
            <img style={{width: '55.63rem', height: '44.75rem'}} src="/images/modal_health_care.svg" alt="" />
          </div>

          <div className="item3">
            <h3>최근 업데이트 된 WIKI</h3>
          </div>

          <div className="item4">
            <img style={{width: '22.5rem', height: '12.5rem'}} src="/images/modal_workshop.svg" alt="" />
          </div>

          <div className="item5">
            <img style={{width: '22.5rem', height: '12.5rem'}} src="/images/modal_reminder.svg" alt="" />
          </div>

          <div className="item6">
            <h3>최근 업데이트 된 GALLERY</h3>
          </div>

          <div className="item7">
            <GalleryPreview />
          </div>
          
      </style.Temp>
      <Carousel />
    </>
  );
}
