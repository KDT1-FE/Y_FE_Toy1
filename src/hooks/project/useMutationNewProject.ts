/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Editor } from "@toast-ui/react-editor";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { RefObject } from "react";
import { db } from "../../libs/firebase";
import { ProjectDetail, projectDetailConverter } from "../../libs/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

type formValues = Pick<
  ProjectDetail,
  "title" | "status" | "assignees" | "teams" | "duration"
>;

export const useMutationNewProject = ({
  editorRef,
  isEdit,
}: {
  editorRef: RefObject<Editor>;
  isEdit: boolean;
}): {
  onFinish: (values: formValues) => Promise<void>;
} => {
  const location = useLocation();
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  const navigate = useNavigate();

  const onFinish = async (values: formValues): Promise<void> => {
    if (isEdit) void onClickUpdate(values);
    else void onClickWrite(values);
  };

  const onClickWrite = async (values: formValues): Promise<void> => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    const day1 = dayjs(values.duration[0]).format(dateFormat);
    const day2 = dayjs(values.duration[1]).format(dateFormat);
    let count = 0;

    const q = query(
      collection(db, "Project"),
      where("status", "==", values.status),
      orderBy("order", "desc"),
      limit(1),
    );
    const snapshot = await getDocs(q);
    const snData = snapshot.docs;
    snData.forEach((result) => {
      const data = result.data();
      count = data.order + 1;
    });

    await setDoc(
      doc(collection(db, "Project")).withConverter(projectDetailConverter),
      {
        ...values,
        duration: [day1, day2],
        order: count!,
        data: markdown!,
        createdAt: serverTimestamp(),
      },
    );
    navigate("/project/all");
  };
  const onClickUpdate = async (values: formValues): Promise<void> => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    // TODO: 변한 값만 setDoc 하는 작업 고려해보기
    const day1 = dayjs(values.duration[0]).format(dateFormat);
    const day2 = dayjs(values.duration[1]).format(dateFormat);

    const projectId = location.pathname.split("/")[2];
    if (projectId) {
      await updateDoc(doc(db, "Project", projectId), {
        ...values,
        duration: [day1, day2],
        data: markdown!,
      });
      navigate(`/project/${projectId}`);
    }
  };

  return {
    onFinish,
  };
};
