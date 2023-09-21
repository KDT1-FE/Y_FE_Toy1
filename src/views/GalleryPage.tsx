// import app from '../firebase/config';
import { db, storage, galleryCollection } from '../firebase';
import { doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GalleryQueryKeyEnum } from '../hooks/gallery/query/common';
import useDocList from '../hooks/gallery/query/useDocList';
import useImgList from '../hooks/gallery/query/useImgList';

import { GalleryTitle, ImageList, ImageUploadModal, ImageViewModal } from '../components/Gallery';
import { ImageUploadPayload, UploadedImage } from '../components/Gallery/types';

import '../scss/components/gallery/gallery.scss';

const GalleryPage = () => {
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [imgModalOpen, setImgModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageDetail, setImageDetail] = useState<UploadedImage>({} as UploadedImage);
  const [imageFileToUpload, setImageFileToUpload] = useState<File | null>(null);
  const [imageUploadPayload, setImageUploadPayload] = useState<ImageUploadPayload>({} as ImageUploadPayload);

  // use query
  const queryClient = useQueryClient();
  const { data: docList } = useDocList();
  const { data: imageList } = useImgList();

  //upload image
  const uploadImg = async () => {
    if (imageFileToUpload === null) {
      alert('이미지를 첨부해 주세요');
      return;
    }
    const imgRef = ref(storage, `images/gallery/${imageFileToUpload.name + new Date().getTime()}`);
    const snapshot = await uploadBytes(imgRef, imageFileToUpload);
    const url = await getDownloadURL(snapshot.ref);
    alert('이미지가 업로드 되었습니다!');
    const payload: ImageUploadPayload = {
      ...imageUploadPayload,
      url,
      // timestamp: new Date(),
      timestamp: new Date().toLocaleString(),
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

  const likeImage = async (id: string, like: number) => {
    const myDoc = doc(db, 'gallery', id);
    const newFields = { like: like + 1 };
    await updateDoc(myDoc, newFields);
    queryClient.invalidateQueries([GalleryQueryKeyEnum.DocList]);
  };

  const deleteData = async (id: string) => {
    const myDoc = doc(db, 'gallery', id);
    await deleteDoc(myDoc);
    queryClient.invalidateQueries([GalleryQueryKeyEnum.DocList]);
  };

  const handleClick = (url: string) => {
    setImgModalOpen(true);
    setSelectedImage(url);
    // console.log(url);
  };

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
      {imgModalOpen && (
        <ImageViewModal
          setImgModalOpen={setImgModalOpen}
          selectedImage={selectedImage}
          imageDetail={imageDetail}
          likeImage={likeImage}
        />
      )}
      <article className="gallery__list">
        <ImageList
          docList={docList}
          likeImage={likeImage}
          deleteData={deleteData}
          onImageClick={(index: number) => {
            handleClick(imageList[index]);
            setImageDetail(docList[index]);
          }}
        />
      </article>
    </section>
  );
};

export default GalleryPage;
