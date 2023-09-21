import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function SaveContents(categories: string[]): Promise<any> {
  let callSnapshot = 0;

  categories.forEach(category => {
    onSnapshot(doc(db, "wiki", category), wiki => {
      sessionStorage.setItem(category, JSON.stringify(wiki.data()));

      const isChange = wiki.metadata.hasPendingWrites;
      callSnapshot += 1;

      const sameLocation = decodeURI(window.location.pathname).indexOf(
        category,
      );

      if (
        !isChange &&
        callSnapshot > categories.length &&
        sameLocation !== -1
      ) {
        /* eslint-disable */
        alert(
          "⚠️ 문서가 업데이트되었습니다! \n\n 🙏🏻 변경 사항 불러오기 버튼을 누른 후 계속 작업해주세요. 🙏🏻",
        );

        /* eslint-enable */
      }
    });
  });
}

export default SaveContents;
