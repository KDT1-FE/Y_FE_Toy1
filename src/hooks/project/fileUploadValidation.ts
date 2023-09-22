import { MessageInstance } from "antd/es/message/interface";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

export const checkImageValidation = (
  api: MessageInstance,
  file?: File,
): boolean => {
  if (file?.size === undefined) {
    api.open({ type: "error", content: "파일이 없습니다." });
    return false;
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    api.open({ type: "error", content: "파일이 너무 큽니다.(제한: 5MB)" });
    return false;
  }
  if (
    !file.type.includes("png") &&
    !file.type.includes("jpeg") &&
    !file.type.includes("gif")
  ) {
    api.open({
      type: "error",
      content: "파일 확장자가 올바르지 않습니다.(png, jpeg, gif만 가능)",
    });
    return false;
  }

  return true;
};
