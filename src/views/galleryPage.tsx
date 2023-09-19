import app from '../firebase/config';
import { db, storage, galleryCollection } from '../firebase';
import { doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GalleryQueryKeyEnum } from '../hooks/gallery/query/common';
import useDocList from '../hooks/gallery/query/useDocList';
import useImgList from '../hooks/gallery/query/useImgList';

import { GalleryTitle, ImageList, ImageUploadModal, ImageViewModal } from '../components/Gallery';

import '../scss/components/gallery/gallery.scss';

const GalleryPage = () => {
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [imgModalOpen, setImgModalOpen] = useState<boolean>(false);
  const [imageFileToUpload, setImageFileToUpload] = useState<File | null>(null);
  const [imageUploadPayload, setImageUploadPayload] = useState<ImageUploadPayload>({} as ImageUploadPayload);
  const [like, setLike] = useState<number>(0);

  // use query
  const queryClient = useQueryClient();
  const { data: docList } = useDocList();
  const { data: imageList } = useImgList();

  //upload image
  //image upload
  const uploadImg = async () => {
    if (imageFileToUpload === null) {
      return;
    }
    const imgRef = ref(storage, `images/gallery/${imageFileToUpload.name + new Date().getTime()}`);
    const snapshot = await uploadBytes(imgRef, imageFileToUpload);
    const url = await getDownloadURL(snapshot.ref);
    alert('이미지가 업로드 되었습니다!');
    const payload: ImageUploadPayload = {
      ...imageUploadPayload,
      url,
      timestamp: new Date(),
      like: 0,
    };
    await addDoc(galleryCollection, payload);
    setImageFileToUpload(null);
    console.log(payload);
  };

  const handleImageUploadClick = () => {
    uploadImg();
    setFormModalOpen(false);
  };

  const likeImage = async (id, like) => {
    const myDoc = doc(db, 'gallery', id);
    const newFields = { like: like + 1 };
    await updateDoc(myDoc, newFields);
    queryClient.invalidateQueries([GalleryQueryKeyEnum.DocList]);
  };

  const deleteData = async id => {
    const myDoc = doc(db, 'gallery', id);
    await deleteDoc(myDoc);
    queryClient.invalidateQueries([GalleryQueryKeyEnum.DocList]);
  };

  // todo  :: props, onClick, view modal,

  return (
    <section id="gallery" className="gallery container">
      <GalleryTitle setFormModalOpen={setFormModalOpen} />
      {formModalOpen && (
        <ImageUploadModal
          setFormModalOpen={setFormModalOpen}
          closeFormModal={() => setFormModalOpen(false)}
          setImageFileToUpload={setImageFileToUpload}
          imageUploadPayload={imageUploadPayload}
          setImageUploadPayload={setImageUploadPayload}
          handleImageUploadClick={handleImageUploadClick}
        />
      )}
      {imgModalOpen && <ImageViewModal />}
      <article className="gallery__list">
        <ImageList
          docList={docList}
          likeImage={likeImage}
          deleteData={deleteData}
          onImageClick={(index: number) => {}}
        />
      </article>
    </section>
  );
};

export default GalleryPage;
