import { deleteGalleryData } from 'apis/Gallery';

async function DeleteGallery(
  id: string,
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (confirm('사진을 삭제하시겠습니까?')) {
    await deleteGalleryData(id);
    setIsDeleting(true);
    alert('삭제 완료');
  } else {
    alert('삭제 취소');
  }
}

export default DeleteGallery;
