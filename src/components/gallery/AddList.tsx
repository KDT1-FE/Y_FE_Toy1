import * as style from "./AddListStyle";
import Input from "../common/Input";
import Button from "../common/Button";
import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../../../firebase";

const firestore = getFirestore(app);

interface Folders {
  createdAt: Date;
  id: string;
  sub: string[];
  title: string;
}

interface GallerySideProps {
  closeAddListModal: () => void;
  galleryData: Folders[];
  setGalleryData: React.Dispatch<React.SetStateAction<Folders[]>>;
}

export default function Addlist({
  closeAddListModal,
  galleryData,
  setGalleryData,
}: GallerySideProps) {
  const [inputValue, setInputValue] = useState("");

  const createGallery = async () => {
    try {
      const timestamp = new Date().getTime();
      const randomValue = Math.random();
      const uniqueId = `${timestamp}-${randomValue}`;

      const newData = {
        title: inputValue,
        createdAt: new Date(),
        sub: [],
        id: uniqueId,
      };

      const docRef = await addDoc(collection(firestore, "Gallery"), newData);

      const copy = [...galleryData];
      copy.push(newData);
      setGalleryData(copy);
      closeAddListModal();
      console.log("새로운 Gallery 문서가 생성되었습니다. 문서 ID:", docRef.id);
    } catch (error) {
      console.error("Gallery 생성 중 오류 발생:", error);
    }
  };

  const setValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const saveTitle = () => {
    console.log(inputValue);
    createGallery();
  };

  return (
    <style.Container>
      <style.Form>
        <div>
          <label htmlFor="title" style={{ marginRight: "1rem" }}>
            이름
          </label>
          <Input type="text" id="title" onChange={(e) => setValue(e)} />
        </div>
        <div>
          <Button
            text="저장"
            padding=".3rem .6rem"
            margin=".7rem"
            onClick={saveTitle}
          />
          <Button
            text="취소"
            padding=".3rem .6rem"
            normal="reverse"
            onClick={closeAddListModal}
          />
        </div>
      </style.Form>
    </style.Container>
  );
}
