import { deleteGalleryData } from 'apis/Gallery';

function DeleteGallery(id: string) {
  if (confirm('사진을 삭제하시겠습니까?')) {
    deleteGalleryData(id);
    alert('삭제 완료');
  } else {
    alert('삭제 취소');
  }
}

export default DeleteGallery;
