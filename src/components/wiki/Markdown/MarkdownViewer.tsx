import React from 'react';
import swal from 'sweetalert';
import { Viewer } from '@toast-ui/react-editor';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../../../recoil/authRecoil';
import * as S from '../Layout/WikiLayout.styled';

const MarkdownViewer = ({
  wiki,
  onChange,
  content,
  status,
}: {
  wiki: string;
  onChange: () => void;
  content: string;
  status: string;
}) => {
  const isCount = useRecoilValue(isLoginSelector);

  return (
    <S.WikiContainer>
      <S.WikiHeader>
        <S.Title>
          <S.Primary>SWAL</S.Primary> {wiki}
        </S.Title>
        <S.WikiButton
          type="button"
          onClick={() => {
            if (isCount) {
              onChange();
            } else {
              swal({
                title: '로그인이 필요합니다.',
                text: '로그인이 필요합니다. 😥',
                icon: 'warning',
              });
            }
          }}
        >
          {status}
        </S.WikiButton>
      </S.WikiHeader>
      <S.Contents>
        <Viewer initialValue={content} />
      </S.Contents>
    </S.WikiContainer>
  );
};

export default MarkdownViewer;
