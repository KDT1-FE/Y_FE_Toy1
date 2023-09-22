import Carousel from '@components/MainContents/MainNotice';
import MainGalleryContents from '@components/MainContents/MainGalleryContent';
import MainProject from '@components/MainContents/MainProject';

import '@scss/mainPage.scss';

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
        <div className="wrap-depth2">
          <div className="mainPage__content-box main-project">
            <div className="mainPage__content__title">프로젝트</div>
            <div className="mainPage__content">
              <MainProject />
            </div>
          </div>
          <div className="mainPage__content-box main-gallery">
            <div className="mainPage__content__title">갤러리</div>
            <div className="mainPage__content">
              <MainGalleryContents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
