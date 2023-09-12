import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import { WikiWriteContainer, WikiWriteContentContainer } from '../../styled/wiki/Container';
import { SubmitButton } from '../../styled/wiki/Button';
import { TitleInput } from '../../styled/wiki/Input';
import CategorySelect from '../../styled/wiki/Select';

export default function WikiWrite() {
    const [value, setValue] = React.useState<string | undefined>("");
    return (
        <WikiWriteContainer >
            <WikiWriteContentContainer>
            <TitleInput type='text' placeholder='제목을 입력하세요' />
        <CategorySelect>
            <option value="주요 기능">주요 기능</option>
            <option value="사용법">사용법</option>
            <option value="회사">회사</option>
        </CategorySelect>
        <MDEditor height={800}
          value={value}
          onChange={setValue}
          style={{width : '100%' }}
        />

        </WikiWriteContentContainer>
        
        <SubmitButton type='button'>Submit</SubmitButton>
      </WikiWriteContainer>

      
    );
}

