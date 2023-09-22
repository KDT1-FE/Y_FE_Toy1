import '../scss/mainPage.scss';
import Carousel from '../components/Carousel';
import MainGalleryContents from './MainGalleryContent';

const MainPage = (): JSX.Element => {
  return (
    <div id="mainPage">
      <div className="mainPage__content-wrap">
        <div className="mainPage__content-box main-notice">
          <div className="mainPage__content__title notice__title">공지사항</div>
          <div className="mainPage__content notice-container">
            <Carousel />
          </div>
        </div>
        <div className="mainPage__content-box main-project">
          <div className="mainPage__content__title">프로젝트</div>
          <div className="mainPage__content"></div>
        </div>
        <div className="mainPage__content-box main-gallery">
          <div className="mainPage__content__title">갤러리</div>
          <div className="mainPage__content">
            <MainGalleryContents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
