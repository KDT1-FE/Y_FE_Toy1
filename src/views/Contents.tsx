import React from 'react';
import ContentTitle from '../components/contents/ContentTitle';
import ContentUtil from '../components/contents/ContentUtil';
import ContentItem from '../components/contents/ContentItem';

import '../scss/components/contents/contentsPage.scss';

const Contents = () => {
  return (
    <div className="contents">
      <ContentUtil />
      <ContentTitle />
      <ContentItem />
    </div>
  );
};

export default Contents;
