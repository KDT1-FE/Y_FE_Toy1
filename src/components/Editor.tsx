import React from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

const Editor = ({value, onChange, imageHandler, quillRef}) => {
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        'image' : imageHandler
      }
    },
  };

  return (
      <ReactQuill modules={modules} value={value || ''} onChange={(content, delta, source, editor) => onChange(editor.getHTML()) } ref={quillRef} /> 
  )
}

export default Editor
