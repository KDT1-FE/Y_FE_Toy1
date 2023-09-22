import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { message } from "antd";
import { checkImageValidation } from "../../hooks/project/fileUploadValidation";
import { storage } from "../../libs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProjectMdEditor = ({
  editorRef,
  initialValue,
}: {
  editorRef: React.RefObject<Editor>;
  initialValue?: string;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onUploadImage = async (
    blob: Blob | File,
    callback: (url: string, text?: string) => void,
  ): Promise<void> => {
    if (blob instanceof File) {
      const isValid = checkImageValidation(messageApi, blob);
      if (!isValid) return;
      try {
        const lastIndex = blob.name.lastIndexOf(".");
        const fileName = blob.name.substring(0, lastIndex);
        const ext = blob.name.substring(lastIndex);
        const fullFileName = fileName + "-" + new Date().getTime() + ext;

        const storageRef = ref(storage, `project/${fullFileName}`);
        const uploadRef = await uploadBytes(storageRef, blob).then(
          (snapshot) => snapshot.ref,
        );
        const url = await getDownloadURL(uploadRef);
        callback(url, blob?.name);
      } catch (error) {
        if (error instanceof Error)
          messageApi.open({
            type: "error",
            content: error.message,
          });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Editor
        initialValue={initialValue ?? "프로젝트 설명을 입력 해주세요."}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        hooks={{ addImageBlobHook: onUploadImage }}
      />
    </>
  );
};

export default ProjectMdEditor;
