import { db } from "../../libs/firebase";
import { runTransaction, doc, arrayRemove } from "firebase/firestore";
import { message } from "antd";

interface DeleteDataParams {
  COLLECTION_NAME: string;
}

export function useDeleteData({ COLLECTION_NAME }: DeleteDataParams) {
  const deleteData = async (id: string, teamId?: string) => {
    try {
      await runTransaction(db, async (transaction) => {
        const userDocRef = doc(db, COLLECTION_NAME, id);

        console.log(teamId);

        if (teamId) {
          const teamDocRef = doc(db, "Teams", teamId);
          const teamDoc = await transaction.get(teamDocRef);

          if (teamDoc.exists() && teamDoc.data()?.userId?.includes(id)) {
            transaction.update(teamDocRef, {
              userId: arrayRemove(id),
            });
          }
        }

        transaction.delete(userDocRef);
      });

      message.success("작업이 성공적으로 수행되었습니다.");
    } catch (error) {
      console.error("Error in transaction:", error);
      message.error("삭제 중 오류가 발생했습니다 ");
    }
  };

  return { deleteData };
}
