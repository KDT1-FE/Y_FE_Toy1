import * as style from "./GalleryMainStyle";
import Button from "../common/Button";

interface GalleryMainProps {
  album: string;
  imagePaths: string[];
  viewImg: boolean;
  setViewImg: React.Dispatch<React.SetStateAction<boolean>>;
  setCurImg: React.Dispatch<React.SetStateAction<string>>;
}

export default function GalleryMain({
  album,
  imagePaths,
  setViewImg,
  setCurImg,
}: GalleryMainProps) {
  // console.log(imagePaths);

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
            }}
          />
        </style.Container>
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
      </style.GalleryMain>
    </>
  );
}
