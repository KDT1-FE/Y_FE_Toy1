import React from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

interface EditData {
  value: string,
  onChange: (value: string) => void,
  quillRef: React.RefObject<any>
}

const Editor = ({value, onChange, quillRef}: EditData) => {
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        ['link', 'image'],
        ['clean']
      ]
      // handlers: {
      //   'image' : imageHandler
      // }
    },
  };

  return (
      <ReactQuill modules={modules} value={value || ''} onChange={(content, delta, source, editor) => onChange(editor.getHTML()) } ref={quillRef} /> 
  )
}

export default Editor
