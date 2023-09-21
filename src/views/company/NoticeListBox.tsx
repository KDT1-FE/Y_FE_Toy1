import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import '../../scss/listbox.scss';

interface ListBoxProps {
  title: string[];
  itemId: string[];
}

const ListBox: React.FC<ListBoxProps> = ({ title, itemId }): JSX.Element => {
  const navigate = useNavigate();
  const handleDelete = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteDoc(doc(db, 'notice', itemId[index]));
  };

  const handleModify = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    navigate(`/notice/content/update/${itemId}`, { state: itemId });
  };

  return (
    <>
      {title.map((title: string, index: number) => (
        <div
          className="listbox"
          key={itemId[index]}
          data-id={itemId[index]}
          onClick={() => navigate(`/notice/content/${itemId[index]}`, { state: itemId[index] })}>
          <span className="listbox__title">{title}</span>
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
