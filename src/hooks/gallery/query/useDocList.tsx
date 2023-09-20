import { useQuery } from '@tanstack/react-query';
import { getDocs, query, orderBy } from 'firebase/firestore';
import { UploadedImage } from '../../../components/Gallery/types';
import { galleryCollection } from '../../../firebase';
import { GalleryQueryKeyEnum } from './common';

const useDocList = () => {
  return useQuery<UploadedImage[]>({
    // queryKey : Query를 Unique하게 지칭할 배열
    queryKey: [GalleryQueryKeyEnum.DocList],

    //queryFn: Promise를 리턴하는 함수
    queryFn: async () => {
      const data = await getDocs(query(galleryCollection, orderBy('timestamp', 'desc')));
      return data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as UploadedImage);
    },
    initialData: [] as UploadedImage[],
  });
};

export default useDocList;
