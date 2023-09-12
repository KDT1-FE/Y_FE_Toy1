import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import { WikiWriteContainer } from '../../styled/wiki/Container';
import { SubmitButton } from '../../styled/wiki/Button';

export default function WikiWrite() {
    const [value, setValue] = React.useState<string | undefined>("");
    return (
      <WikiWriteContainer >
        <MDEditor height={800}
          value={value}
          onChange={setValue}
          style={{width : '100%' }}
        />
        <SubmitButton type='button'>Submit</SubmitButton>
      </WikiWriteContainer>
    );
}

