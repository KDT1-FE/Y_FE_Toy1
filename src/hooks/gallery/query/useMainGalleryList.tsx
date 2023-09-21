import { useQuery } from '@tanstack/react-query';
import { getDocs, query, orderBy, limit } from 'firebase/firestore';
import { UploadedImage } from '../../../components/Gallery/types';
import { galleryCollection } from '../../../firebase';
import { GalleryQueryKeyEnum } from './common';

const useMainGalleryList = () => {
  return useQuery<UploadedImage[]>({
    queryKey: [GalleryQueryKeyEnum.MainGalleryList],

    queryFn: async () => {
      const mainGalleryData = query(galleryCollection, orderBy('timestamp', 'desc'), limit(4));
      const mainGalleryList = await getDocs(mainGalleryData);
      return mainGalleryList.docs.map(doc => ({ ...doc.data(), id: doc.id }) as UploadedImage);
    },
    initialData: [] as UploadedImage[],
  });
};

export default useMainGalleryList;
