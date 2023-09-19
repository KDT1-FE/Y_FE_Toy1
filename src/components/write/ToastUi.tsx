import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import '../../scss/components/writePage/toastUi.scss';

const ToastUi = () => {
  return (
    <>
      <div className="toast-ui">
        <Editor initialEditType="markdown" height="400px" initialValue=" "></Editor>
      </div>
    </>
  );
};

export default ToastUi;
