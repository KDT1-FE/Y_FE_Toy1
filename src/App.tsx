import React from "react";
// import {Routes, Route} from "react-router-dom";
import "./styles/App.css";
import "./styles/reset.css";
import {collection, addDoc} from "firebase/firestore";
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
        snapshot => {
          console.log(`1. snapshot:${snapshot}`);
        },
        err => {
          console.log(`2. upload test Img err:${err}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log(`3. downloadURL:${downloadURL}`);
          });
        },
      );
    } catch (err) {
      console.log(`0. createTestImg err: ${err}`);
    }
  }
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
