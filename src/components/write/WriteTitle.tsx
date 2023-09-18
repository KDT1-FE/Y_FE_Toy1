import React from 'react';
import '../../scss/components/writePage/writeTitle.scss';

const FormTitle = () => {
  return (
    <div className="writeForm__title">
      <textarea className="writeForm__title__item" placeholder="제목을 입력하세요"></textarea>;
    </div>
  );
};

export default FormTitle;
