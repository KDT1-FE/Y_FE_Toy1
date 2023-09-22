import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { updateData } from '../../../utils/util';
import * as S from '../Layout/WikiLayout.styled';

const MarkdownEditor = ({
  wiki,
  onChange,
  collection,
  dataID,
  content,
  status,
}: {
  wiki: string;
  onChange: () => void;
  collection: string;
  dataID: string;
  content: string;
  status: string;
}) => {
  const editorRef = useRef<Editor>(null);
  const handleUpdateData = async () => {
    const html = editorRef.current?.getInstance().getHTML() || '';
    const markdown = editorRef.current?.getInstance().getMarkdown() || '';
    await updateData(collection, dataID, {
      html,
      markdown,
    });
    onChange();
  };

  return (
    <S.WikiContainer>
      <S.WikiHeader>
        <S.Title>
          <S.Primary className="primary">SWAL</S.Primary> {wiki}
        </S.Title>
        <S.WikiButton
          className="markdown-button"
          type="button"
          onClick={handleUpdateData}
        >
          {status}
        </S.WikiButton>
      </S.WikiHeader>
      <S.Contents>
        <Editor
          ref={editorRef}
          initialValue={content}
          previewStyle="tab"
          height="100%"
          initialEditType="markdown"
          useCommandShortcut
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol'],
            ['table', 'link'],
          ]}
        />
      </S.Contents>
    </S.WikiContainer>
  );
};

export default MarkdownEditor;
