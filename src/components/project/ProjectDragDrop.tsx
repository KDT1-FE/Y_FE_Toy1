import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ProjectDroppable from "./ProjectDroppable";
import { updateOrder } from "../../hooks/project/updateOrder";
import useQueryProjectList from "../../hooks/project/useQueryProjectList";

export interface ProjectInfo {
  id: string;
  title: string;
  status: "progress" | "completed" | "plus";
  order: number;
  assignees: string[];
  duration: string[];
}

const ProjectDragDrop = ({ teamName }: { teamName?: string }) => {
  const [teamProj, setTeamProj, isLoaded] = useQueryProjectList(teamName);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || teamProj === undefined) return;
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드 내에서 이동
      const diff: ProjectInfo[] = [];
      const origProj = [...teamProj[source.droppableId]];
      const projCopy = [...teamProj[source.droppableId]];
      const movedItem = projCopy.splice(source.index, 1);
      projCopy.splice(destination.index, 0, movedItem[0]);

      const min = projCopy.reduce(
        (acc, item) => Math.min(acc, item.order),
        1000000000,
      );

      // state를 변경합니다.
      const newProjArr = projCopy.map((item, index) => {
        const newItem = { ...item, order: min + index };
        return newItem;
      });
      // order를 비교해서 다른 요소가 있으면 넣기
      projCopy.forEach((item, index) => {
        if (item.id !== origProj[index].id) {
          // 다르다면 변경
          const proj = { ...item, order: min + index };
          diff.push(proj);
        }
      });

      setTeamProj((allProjects) => {
        return {
          ...allProjects,
          [source.droppableId]: newProjArr,
        };
      });
      // 실제 firebase에 적용하기
      const updatePromises = diff.map((item) =>
        updateOrder(item.id, item.order),
      );
      Promise.all(updatePromises);
    } else {
      // 다른 보드로 이동
      const sourceDiff: ProjectInfo[] = [];
      // 드래그한 요소가 원래 속해있던 배열
      const sourceBoard = [...teamProj[source.droppableId]];
      // 드래그한 요소가 놓인 배열
      const targetBoard = [...teamProj[destination.droppableId]];
      // 이동한 아이템을 잘라냅니다.
      const movedItem = sourceBoard.splice(source.index, 1);
      targetBoard.splice(destination.index, 0, movedItem[0]);

      // order 변경하기
      const min = targetBoard.reduce(
        (acc, item) => Math.min(acc, item.order),
        1000000000,
      );
      // state를 변경합니다.
      const newProjArr = targetBoard.map((item, index) => {
        const newItem = { ...item, order: min + index };
        return newItem;
      });

      newProjArr.forEach((item, index) => {
        if (item.order !== targetBoard[index].order) {
          // 다르다면 변경
          const proj = { ...item, order: min + index };
          sourceDiff.push(proj);
        }
      });

      console.log(sourceDiff);

      setTeamProj((allProjects) => {
        return {
          ...allProjects,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: newProjArr,
        };
      });

      // 실제 firebase에 적용하기
      (async () => {
        await updateOrder(
          movedItem[0].id,
          movedItem[0].order,
          true,
          destination.droppableId,
        );
      })();
      // 순서 바뀌는 요소는 모두 order값을 변경
      const updatePromises = sourceDiff.map((item) =>
        updateOrder(item.id, item.order, true, destination.droppableId),
      );
      Promise.all(updatePromises);
    }
  };

  return (
    <>
      {!isLoaded ? null : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="drag-drop-wrap">
            {teamProj !== undefined &&
              Object.keys(teamProj).map((key) => (
                <ProjectDroppable
                  key={key}
                  id={key}
                  projectList={teamProj[key]}
                />
              ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default ProjectDragDrop;
