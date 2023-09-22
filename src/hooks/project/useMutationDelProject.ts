import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { useSetRecoilState } from "recoil";
import { projectListState } from "../../store/project";

const useMutationDelProject = () => {
  const setProjectList = useSetRecoilState(projectListState);
  const onClickProjDelete = async (
    clickedId: string,
    status: string,
  ): Promise<void> => {
    // 클릭한 요소의 ID값을 가진 문서를 삭제
    await deleteDoc(doc(db, "Project", clickedId));
    // 삭제가 된 후에는 projects state도 변경합니다.(삭제된 버전을 다시 보여주기 위해서)
    setProjectList((oldProjs) => {
      const removedList = [...oldProjs[status]];
      const removeItemIdx = removedList.findIndex(
        (item) => item.id === clickedId,
      );
      removedList.splice(removeItemIdx, 1);
      return {
        ...oldProjs,
        [status]: removedList,
      };
    });
  };
  return onClickProjDelete;
};

export default useMutationDelProject;
