import React, {useEffect} from "react";
// import {Routes, Route} from "react-router-dom";
import "./styles/App.css";
import "./styles/reset.css";
import {collection, addDoc, getDocs} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {db, storage} from "./utils/firebaseConfig";

function App() {
  async function createTestDoc() {
    await addDoc(collection(db, "tests"), {
      hello: "hello~",
    });
  }

  function createTestImg(e: any) {
    try {
      const file = e.currentTarget.files?.[0];
      const fileName = file.name;
      const testImgsRef = ref(storage, `testImgs/${fileName}`);
      const uploadTask = uploadBytesResumable(testImgsRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          throw snapshot;
        },
        (err: any) => {
          throw err;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            throw downloadURL;
          });
        },
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }
  useEffect(() => {
    async function loadTest() {
      const imagesCollection = collection(db, "tests");
      try {
        const querySnapshot = await getDocs(imagesCollection);
        querySnapshot.forEach(docs => {
          const data = docs.data();
          const item = data.text;
          localStorage.setItem("data", item);
        });
      } catch (err: any) {
        throw new Error(err);
      }
    }

    loadTest();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={createTestDoc}>
          create test doc
        </button>
        <input type="file" onChange={e => createTestImg(e)} />
      </header>
    </div>
  );
}

export default App;
