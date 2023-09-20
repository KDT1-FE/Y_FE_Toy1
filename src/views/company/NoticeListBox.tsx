import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

import '../../scss/listbox.scss';

interface ListBoxProps {
  title: string[];
  itemId: string[];
}

const ListBox: React.FC<ListBoxProps> = ({ title, itemId }): JSX.Element => {
  const [deleteItem, setDeleteItem] = useState(false);
  const handleDelete = async (index: number) => {
    setDeleteItem(!deleteItem);
    await deleteDoc(doc(db, 'notice', itemId[index]));
  };
  return (
    <>
      {title.map((title: string, index: number) => (
        <div className="listbox" key={index} data-id={itemId[index]}>
          <span className="listbox__title">{title}</span>
          <button className="listbox__modify-btn btn">수정</button>
          <button className="listbox__delete-btn btn" onClick={() => handleDelete(index)}>
            삭제
          </button>
        </div>
      ))}
    </>
  );
};

export default ListBox;
