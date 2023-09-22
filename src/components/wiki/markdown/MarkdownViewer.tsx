import { Viewer } from "@toast-ui/react-editor";

type MarkdownViewerProps = {
  content?: string;
};

export const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  return (
    <Viewer
      initialValue={content}
      height="auto"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};
