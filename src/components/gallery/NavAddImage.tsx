import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImage } from '../../data/galleryImage';
import { RootState } from 'redux/types'; // RootState 타입 추가
import { useSelector } from 'react-redux';
import './ModalAddImage.scss';

export function AddImageDragDrop() {
  const [files, setFiles] = useState([]);
  const selectList = ['StudyTipsGallery', 'EventsGallery', 'HumorsGallery'];
  const [selected, setSelected] = useState('StudyTipsGallery');

  const user = useSelector((state: RootState) => state);

  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const handleUploadImage = files.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          className="preview-image"
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <button
          onClick={async () => {
            await UploadImage(selected, file, user.uid, user.nickname);
            alert('저장에 성공했습니다.');
          }}
        >
          upload !
        </button>
      </div>
    </div>
  ));

  // 초기화
  useEffect(() => {
    return () =>
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
  }, []);

  return (
    <section className="addImage-container">
      <label htmlFor="select-id"> 카테고리를 선택하세요! </label>
      <select
        name="category-select"
        onChange={handleSelect}
        value={selected}
        id="select-id"
      >
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <div {...getRootProps({ className: 'addImage-dropZone dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside className="preview-zone">{handleUploadImage}</aside>
    </section>
  );
}
