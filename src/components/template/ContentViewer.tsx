import React, { useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface ContentsViewerProps {
  content: string;
}

function ContentsViewer({ content }: ContentsViewerProps) {
  useEffect(() => {}, [content]);

  return <Viewer key={content} initialValue={content || ""} />;
}

export default ContentsViewer;
