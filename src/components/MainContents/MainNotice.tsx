import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import '@scss/components/carousel.scss';

const Carousel = () => {
  const [data, setData] = useState<NoticeData[]>();

  const settings = {
    dots: true,
    infinity: true,
    speed: 500,
    autoplay: true,
  };

  const getData = async () => {
    const querySnapshot = await getDocs(query(collection(db, 'notice'), where('url', '!=', null), limit(5)));
    const firebaseData: NoticeData[] = querySnapshot.docs.map(doc => ({ ...(doc.data() as NoticeData) }));

    setData(firebaseData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="carousel">
      <Slider {...settings}>
        {data?.map(doc => {
          return <img className="carousel-img" src={doc.url} alt={doc.title} key={doc.id} onClick={() => {}}></img>;
        })}
      </Slider>
    </div>
  );
};

export default Carousel;

interface NoticeData {
  content: string;
  id: string;
  number: number;
  time: string;
  title: string;
  url: string;
  userEmail: string;
}
