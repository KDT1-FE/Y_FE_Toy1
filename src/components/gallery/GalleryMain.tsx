import * as style from "./GalleryMainStyle";
import Button from "../common/Button";

interface GalleryMainProps {
  album: string;
  imagePaths: string[];
}

export default function GalleryMain({ album, imagePaths }: GalleryMainProps) {
  // console.log(imagePaths);
  return (
    <>
      <style.Temp>
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
                <style.Img img="#efefef" background={img}></style.Img>
              </style.ImgWrap>
            );
          })}
        </style.ImgContainer>
      </style.Temp>
    </>
  );
}
