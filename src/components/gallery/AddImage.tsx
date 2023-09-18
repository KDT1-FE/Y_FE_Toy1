import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImage } from '../../data/galleryImage';

export function AddImageDragDrop() {
  const [files, setFiles] = useState([]);
  const selectList = ['StudyTipsGallery', 'EventsGallery', 'HumorsGallery'];
  const [selected, setSelected] = useState('StudyTipsGallery');

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
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <button
          onClick={async () => {
            await UploadImage(selected, file);
            alert('저장에 성공했습니다.');
          }}
        >
          저장
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
    <section className="container">
      <label htmlFor="select-id">Category </label>
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
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside>{handleUploadImage}</aside>
    </section>
  );
}
