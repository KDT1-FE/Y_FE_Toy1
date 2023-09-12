import React from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function WikiItem() {
  const [value, setValue] = React.useState<string | undefined>("");
  return (
    <div className="container" style={{width : '800px'}}>
      <MDEditor height={865}
        value={value}
        onChange={setValue}
        style = {{
          width : '800px'
        }}
      />
    </div>
  );
}
