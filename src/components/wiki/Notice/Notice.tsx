import React, { useState, useEffect } from 'react';
import MarkdownViewer from '../Markdown/MarkdownViewer';
import MarkdownEditor from '../Markdown/MarkdownEditor';
import { getData } from '../../../utils/util';
import SkeletonMarkdown from '../../skeleton/SkeletonMarkdown';

const Notice = () => {
  const wiki = '공지사항';
  const collection = 'notice-collection';
  const dataID = 'notice';
  const [status, setStatus] = useState('edit');
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const docs = await getData(collection);
    setHtml(docs[0].html as string);
    setMarkdown(docs[0].markdown as string);
    setLoading(false);
  };

  const handleStatus = () => {
    if (status === 'edit') {
      setStatus('save');
    } else {
      setStatus('edit');
    }
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  if (loading) {
    return <SkeletonMarkdown />;
  }
  if (status === 'edit') {
    return (
      <MarkdownViewer
        wiki={wiki}
        onChange={handleStatus}
        content={html}
        status={status}
      />
    );
  }
  return (
    <MarkdownEditor
      wiki={wiki}
      onChange={handleStatus}
      collection={collection}
      dataID={dataID}
      content={markdown}
      status={status}
    />
  );
};

export default Notice;
