import { useState } from 'react';
import GalleryTitle from '../components/Gallery/GalleryTitle';
import ImageList from '../components/Gallery/ImageList';
import ImageUploadModal from '../components/Gallery/ImageUploadModal';
import ImageViewModal from '../components/Gallery/ImageViewModal';

import '../scss/components/gallery/gallery.scss';

const GalleryPage = () => {
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [imgModalOpen, setImgModalOpen] = useState<boolean>(false);

  return (
    <section id="gallery" className="gallery container">
      <GalleryTitle setFormModalOpen={setFormModalOpen} />
      {formModalOpen && (
        <ImageUploadModal setFormModalOpen={setFormModalOpen} closeFormModal={() => setFormModalOpen(false)} />
      )}
      {imgModalOpen && <ImageViewModal />}
      <article className="gallery__list">
        <ImageList />
      </article>
    </section>
  );
};

export default GalleryPage;
