import swal from "sweetalert";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {WIKI, UPDATE_DOC_NOTICE, UPDATE_DOC_NOTICE_PLZ} from "../../constant";

async function SaveContents(categories: string[]): Promise<any> {
  let callSnapshot = 0;

  categories.forEach(category => {
    onSnapshot(doc(db, WIKI, category), wiki => {
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
        swal(UPDATE_DOC_NOTICE, UPDATE_DOC_NOTICE_PLZ);
      }
    });
  });
}

export default SaveContents;
