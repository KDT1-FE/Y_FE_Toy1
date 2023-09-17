import { useEffect, useState } from "react";
import * as style from "./CurrentImgStyle";

interface CurrentImgProps {
  curImg: string;
  imagePaths: string[];
  setViewImg: React.Dispatch<React.SetStateAction<boolean>>;
  setCurImg: React.Dispatch<React.SetStateAction<string>>;
}

export default function CurrentImg({
  setViewImg,
  setCurImg,
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

  // console.log(curIndex);
  // console.log(imagePaths.length - 1);

  const nextImg = () => {
    if (curIndex >= imagePaths.length - 2) {
      const cur = imagePaths[curIndex + 1];
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImg();
      } else if (e.key === "ArrowLeft") {
        prevtImg();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [curIndex]);

  return (
    <style.CurrentImgBg scale={imgScale}>
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
      {prevBtn ? <style.Prev onClick={prevtImg}></style.Prev> : null}
      {nextBtn ? <style.Next onClick={nextImg}></style.Next> : null}
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
