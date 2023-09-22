import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImage } from '../../data/galleryImage';
import { RootState } from 'redux/types';
import { useSelector } from 'react-redux';
import './ModalAddImage.scss';

export function AddImageDragDrop(): JSX.Element {
  const [files, setFiles] = useState<any>([]);
  const selectList = ['공부꿀팁', '이벤트', '유머'];
  const [selected, setSelected] = useState('공부꿀팁');
  const [isChange, setChange] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const handleUploadImage = files.map((file: any) => (
    <div key={file.name}>
      <div className="preview-container">
        <img
          className="preview-image"
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <button
          className="btn btn-secondary main-btn"
          onClick={async () => {
            await UploadImage(
              selected,
              file,
              user.uid,
              user.nickname,
              user.image,
            );
            await setChange((prev: boolean) => !prev);
            alert('저장에 성공했습니다.');
          }}
        >
          upload
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
  }, [isChange]);

  return (
    <section className="addImage-container">
      <label htmlFor="select-id"> 카테고리 </label>
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
        <p>
          이곳에 파일을 드래그 & 드랍으로 추가할 수 있어요. <br />
          또는 이곳을 클릭해서 이미지를 추가해보세요!
        </p>
      </div>
      <aside className="preview-zone">{handleUploadImage}</aside>
    </section>
  );
}
