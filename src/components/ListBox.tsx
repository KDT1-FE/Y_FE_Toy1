import React from 'react';
import '../scss/listbox.scss';

const ListBox = (): JSX.Element => {
  return (
    <div className="listbox">
      <input className="listbox__delete-checkbox" type="checkbox" />
      <span className="listbox__title">글제목</span>
      <button className="listbox__modify-btn btn">수정</button>
    </div>
  );
};

export default ListBox;
