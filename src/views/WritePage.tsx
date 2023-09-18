import React from 'react';
import WriteTitle from '../components/write/WriteTitle';
import WriteSubmitBtn from '../components/write/WriteSubmitBtn';

import '../scss/components/writePage/writePage.scss';
import ToastUi from '../components/write/ToastUi';

const WritePage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <WriteTitle />
      <ToastUi />
      <WriteSubmitBtn />
    </form>
  );
};

export default WritePage;
