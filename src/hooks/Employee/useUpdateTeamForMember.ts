import { db } from "../../libs/firebase";
import {
  runTransaction,
  doc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

export const useUpdateTeamForMember = () => {
  const updateTeamForMember = async (
    memberId: string,
    currentTeamId: string,
    newTeamId: string,
  ) => {
    await runTransaction(db, async (transaction) => {
      const memberRef = doc(db, "Users", memberId);

      if (!currentTeamId) {
        throw new Error("The member doesn't belong to any team.");
      }

      try {
        await transaction.update(memberRef, { teamId: newTeamId });

        const oldTeamRef = doc(db, "Teams", currentTeamId);
        await transaction.update(oldTeamRef, { userId: arrayRemove(memberId) });

        const newTeamRef = doc(db, "Teams", newTeamId);
        await transaction.update(newTeamRef, { userId: arrayUnion(memberId) });
      } catch (error) {
        console.error("Transaction failed: ", error);
      }
    });
  };

  return { updateTeamForMember };
};
