import { useQuery } from '@tanstack/react-query';
import { listAll, getDownloadURL } from 'firebase/storage';
import { galleryStorageRef } from '../../../firebase';
import { GalleryQueryKeyEnum } from './common';

const useImgList = () => {
  return useQuery<string[]>({
    // queryKey : Query를 Unique하게 지칭할 배열
    queryKey: [GalleryQueryKeyEnum.ImageList],

    //queryFn: Promise를 리턴하는 함수
    queryFn: () => {
      const fetchImages = async () => {
        const result = await listAll(galleryStorageRef);
        const urlPromises = result.items.map(imgRef => getDownloadURL(imgRef));
        return Promise.all(urlPromises);
      };
      return fetchImages();
    },
    initialData: [],
  });
};

export default useImgList;
