import React from 'react';

//todo::type, view modal

const ImageList = ({ docList, likeImage, deleteData }) => {
  return (
    <>
      {docList.map((item: UploadedImage, index: number) => {
        return (
          <div className=" gallery-list__img-box shadow" key={item.id} style={{ backgroundImage: `url(${item.url})` }}>
            {' '}
            <h1>Title: {item.title}</h1>
            <span>User Name: {item.username}</span>
            <span>content: {item.content}</span>
            <span>like: {item.like}</span>
            <button
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                likeImage(item.id, item.like);
              }}>
              {' '}
              ❤
            </button>
            <button
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                deleteData(item.id);
              }}>
              {' '}
              Delete data
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ImageList;
