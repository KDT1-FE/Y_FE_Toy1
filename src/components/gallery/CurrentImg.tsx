import { useEffect, useState } from "react";
import * as style from "./CurrentImgStyle";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "@/firebase/firebase";

const storage = getStorage(app);

interface CurrentImgProps {
  curImg: string;
  imagePaths: string[];
  setViewImg: React.Dispatch<React.SetStateAction<boolean>>;
  setCurImg: React.Dispatch<React.SetStateAction<string>>;
  setImagePaths: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CurrentImg({
  setViewImg,
  setCurImg,
  setImagePaths,
  curImg,
  imagePaths,
}: CurrentImgProps) {
  const [prevBtn, setPrevBtn] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);
  const [curIndex, setCurIndex] = useState(0);
  const [imgScale, setImgScale] = useState(1);

  useEffect(() => {
    const index = imagePaths.findIndex((imagePath) => imagePath === curImg);
    setCurIndex(index);
  }, [curIndex]);

  const nextImg = () => {
    if (curIndex >= imagePaths.length - 2) {
      const cur = imagePaths[curIndex + 1];
      let num = curIndex;
      num++;
      setCurIndex(num);
      setCurImg(cur);
      setNextBtn(false);
    } else {
      setNextBtn(true);
      let num = curIndex;
      num++;
      setCurIndex(num);
      const cur = imagePaths[curIndex + 1];
      setCurImg(cur);
    }

    if (curIndex >= 0) {
      setPrevBtn(true);
    }
  };

  const prevtImg = () => {
    if (curIndex <= 1) {
      let num = curIndex;
      num--;
      setCurIndex(num);
      const cur = imagePaths[curIndex - 1];
      setCurImg(cur);
      setPrevBtn(false);
    } else {
      let num = curIndex;
      num--;
      setCurIndex(num);
      const cur = imagePaths[curIndex - 1];
      setCurImg(cur);
    }

    if (curIndex <= imagePaths.length - 2) {
      setNextBtn(true);
    }
  };

  const imgPlus = () => {
    if (imgScale <= 1.8) {
      let scale = imgScale;
      scale += 0.2;
      setImgScale(scale);
    }
  };

  const imgMinus = () => {
    if (imgScale >= 1.2) {
      let scale = imgScale;
      scale -= 0.2;
      setImgScale(scale);
    }
  };

  const deleteBtn = () => {
    const startIndex = curImg.indexOf("/o/") + 3; // '/o/' 다음 인덱스
    const endIndex = curImg.indexOf("?alt=media&token="); // '?alt=media&token=' 이전 인덱스

    const storagePath = decodeURIComponent(
      curImg.substring(startIndex, endIndex),
    );

    const imageRef = ref(storage, storagePath);

    deleteObject(imageRef)
      .then(() => {
        console.log("이미지 삭제 성공");
      })
      .catch((error) => {
        console.error("이미지 삭제 실패", error);
      });
    const copy = [...imagePaths];
    const index = copy.indexOf(curImg);
    copy.splice(index, 1);

    setImagePaths(copy);
    setViewImg(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (curIndex !== imagePaths.length - 1) nextImg();
      } else if (e.key === "ArrowLeft") {
        if (curIndex !== 0) prevtImg();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [curIndex]);

  return (
    <style.CurrentImgBg scale={imgScale}>
      <style.DeleteBtn onClick={deleteBtn}>삭제하기</style.DeleteBtn>
      <style.Exit
        onClick={() => {
          setViewImg(false);
        }}
      >
        X
      </style.Exit>
      <style.ImgWrap>
        <img src={curImg} />
      </style.ImgWrap>
      {prevBtn && curIndex !== 0 ? (
        <style.Prev onClick={prevtImg}></style.Prev>
      ) : null}
      {nextBtn && curIndex !== imagePaths.length - 1 ? (
        <style.Next onClick={nextImg}></style.Next>
      ) : null}
      <style.Size>
        <div className="minus" onClick={imgMinus}>
          -
        </div>
        <div className="plus" onClick={imgPlus}>
          +
        </div>
      </style.Size>
    </style.CurrentImgBg>
  );
}
