import { deleteDoc, doc, DocumentData, Unsubscribe } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import '@scss/components/listbox.scss';

const ListBox = ({ unsubscribe, itemId, currentItems }: ListBoxProps): JSX.Element => {
  const navigate = useNavigate();
  const handleDelete = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteDoc(doc(db, 'notice', itemId[index]));
    unsubscribe();
  };
  const handleModify = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    navigate(`/notice/content/update/${itemId}`, { state: itemId });
  };

  return (
    <>
      {currentItems?.map((title: string, index: number) => (
        <div
          className="listbox"
          key={title + index}
          data-id={itemId[index]}
          onClick={() => navigate(`/notice/content/${itemId[index]}`, { state: itemId[index] })}>
          <span className="listbox__title">{currentItems[index].title}</span>
          <button className="listbox__modify-btn btn" onClick={e => handleModify(e, itemId[index])}>
            수정
          </button>
          <button className="listbox__delete-btn btn" onClick={e => handleDelete(index, e)}>
            삭제
          </button>
        </div>
      ))}
    </>
  );
};

export default ListBox;

interface ListBoxProps {
  itemId: string[];
  currentItems: DocumentData | undefined;
  unsubscribe: Unsubscribe;
}
