import * as style from "./GalleryMainStyle";
import Button from "../common/Button";
import { useEffect } from "react";

interface GalleryMainProps {
  album: string;
  imagePaths: string[];
  viewImg: boolean;
  imgLoad: boolean;
  setViewImg: React.Dispatch<React.SetStateAction<boolean>>;
  setCurImg: React.Dispatch<React.SetStateAction<string>>;
  setAddImg: React.Dispatch<React.SetStateAction<boolean>>;
  setImgLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GalleryMain({
  album,
  imagePaths,
  imgLoad,
  setViewImg,
  setCurImg,
  setAddImg,
  setImgLoad,
}: GalleryMainProps) {
  useEffect(() => {
    setImgLoad(true);
  }, []);

  const clickImgHandle = (e: React.MouseEvent<HTMLImageElement>) => {
    const backgroundStyle = window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue("background-image");
    const curImg = backgroundStyle.match(/url\("([^"]+)"\)/);
    if (curImg) {
      // console.log(curImg[1]);
      setCurImg(curImg[1]);
    }
    setViewImg(true);
  };
  return (
    <>
      <style.GalleryMain>
        <style.Container>
          <style.Title>{album}</style.Title>
          <Button
            text="등록"
            padding="0.2rem .4rem"
            normal="reverse"
            onClick={() => {
              console.log(album);
              setAddImg(true);
            }}
          />
        </style.Container>

        {imgLoad ? (
          <style.Loading></style.Loading>
        ) : (
          <style.ImgContainer>
            {imagePaths.map((img, i) => {
              return (
                <style.ImgWrap key={i}>
                  <style.Img
                    img="#efefef"
                    background={img}
                    onClick={clickImgHandle}
                  ></style.Img>
                </style.ImgWrap>
              );
            })}
          </style.ImgContainer>
        )}
      </style.GalleryMain>
    </>
  );
}
