import { Link } from 'react-router-dom';
import { UploadedImage } from '@components/Gallery/types';
import useMainGalleryList from '@hooks/gallery/query/useMainGalleryList';

import '@scss/components/mainGallery.scss';

const MainGalleryContents = () => {
  const { data: mainGalleryList } = useMainGalleryList();
  return (
    <Link to="/gallery">
      <div className="mainPage__content__gallery">
        {mainGalleryList.map((item: UploadedImage) => {
          return (
            <figure key={item.id} style={{ backgroundImage: `url(${item.url})` }} onClick={() => {}}>
              <figcaption>
                <h3>{item.title}</h3>
                {/* <p>{item.timestamp}</p> */}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Link>
  );
};

export default MainGalleryContents;
