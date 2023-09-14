import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImage } from '../../data/galleryImage';

//https://react-dropzone.js.org/#!/Previews

export function ImageDragDrop() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: Blob) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            UploadImage(file); // 여기서 firebase에 업로드
          }}
        />
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
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );
}
