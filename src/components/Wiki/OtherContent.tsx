import React from "react";
import "../../styles/Wiki.css";
import "../../styles/ReactMarkdown.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {OtherContentProps} from "../../types/Wiki";
import TextEditor from "./TextEditor";

function OtherContent({
  isEditorOpen,
  dataKey,
  content,
  setIsEditorOpen,
}: OtherContentProps) {
  return (
    <div id="mainContent">
      {isEditorOpen ? (
        <TextEditor
          dataKey={dataKey}
          content={content}
          setIsEditorOpen={setIsEditorOpen}
        />
      ) : (
        <ReactMarkdown
          className="markdown-body"
          remarkPlugins={[remarkGfm]}
          rawSourcePos
          rehypePlugins={[rehypeRaw as any]}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default OtherContent;
