import { BsPlusSquareFill } from 'react-icons/bs';

const GalleryTitle = ({ setFormModalOpen }: Props) => {
  return (
    <div className="gallery__top">
      {' '}
      <h1>갤러리</h1>
      <span className="gallery__top__add-btn">
        <BsPlusSquareFill
          onClick={() => {
            setFormModalOpen(true);
          }}
        />
      </span>
    </div>
  );
};

export default GalleryTitle;

interface Props {
  setFormModalOpen: (isOpen: boolean) => void;
}
