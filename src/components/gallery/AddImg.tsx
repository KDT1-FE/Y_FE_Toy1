import * as style from "./AddImgStyle";
import { useState } from "react";
import Button from "../common/Button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase";

interface AddImgProps {
  albumId: string;
  imagePaths: string[];
  setAddImg: React.Dispatch<React.SetStateAction<boolean>>;
  setImgLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setImagePaths: React.Dispatch<React.SetStateAction<string[]>>;
}

interface FileInfoProps {
  uploadedInfo: {
    name: string;
    size: string;
    type: string;
    imageUrl?: string;
  };
}

function FileInfo({ uploadedInfo }: FileInfoProps) {
  // console.log(uploadedInfo.imageUrl);
  return (
    <style.FileInfoContainer background={uploadedInfo.imageUrl}>
      <div className="img_preview"></div>
      <style.FileInfoWrap>
        {Object.entries(uploadedInfo).map(([key, value]) => (
          <li key={key}>
            <div className="info_key">{key}</div>
            <div className="info_value">{value}</div>
          </li>
        ))}
      </style.FileInfoWrap>
    </style.FileInfoContainer>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="upload-image"
      style={{ width: "90px", height: "90px" }}
    >
      <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
    </svg>
  );
}

export function AddImg({
  albumId,
  imagePaths,
  setAddImg,
  setImgLoad,
  setImagePaths,
}: AddImgProps) {
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<{
    name: string;
    size: string;
    type: string;
    imageUrl?: string;
  } | null>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const setFileInfo = (file: File) => {
    const { name, type } = file;
    const isImage = type.includes("image");
    const size = (file.size / (1024 * 1024)).toFixed(2) + "mb";

    if (!isImage) {
      setUploadedInfo({ name, size, type });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedInfo({ name, size, type, imageUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setActive(false);

    const file = e.dataTransfer.files[0];
    setFileInfo(file);
    setUploadedFile(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileInfo(file);
      setUploadedFile(file);
    }
  };

  const clickSaveBtn = async () => {
    setImgLoad(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, `Gallery/${albumId}/${uploadedInfo?.name}`);

    try {
      const metadata = {
        customMetadata: {
          timestamp: new Date().toString(),
        },
      };

      await uploadBytes(storageRef, uploadedFile as File, metadata);

      const downloadURL = await getDownloadURL(storageRef);

      const copy = [...imagePaths];
      copy.push(downloadURL);
      setImagePaths(copy);

      setAddImg(false);
      console.log("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
    setImgLoad(false);
  };

  return (
    <style.Container>
      <style.Form>
        <style.InputWrap>
          <style.ImgLabel
            htmlFor="img-file"
            className={`preview${isActive ? " active" : ""}`}
            onDragEnter={handleDragStart}
            onDragOver={handleDragStart}
            onDragLeave={handleDragEnd}
            onDrop={handleDrop}
          >
            <style.ImgFile type="file" id="img-file" onChange={handleUpload} />
            {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
            {!uploadedInfo && (
              <>
                <Logo />
                <p className="preview_msg">
                  클릭 혹은 파일을 이곳에 드롭하세요.
                </p>
                <p className="preview_desc">파일당 최대 3MB</p>
              </>
            )}
          </style.ImgLabel>
        </style.InputWrap>
        <div>
          <Button
            text="저장"
            padding=".4rem 1.2rem"
            margin=".7rem"
            onClick={clickSaveBtn}
          />
          <Button
            text="취소"
            padding=".4rem 1.2rem"
            normal="reverse"
            onClick={() => {
              setAddImg(false);
            }}
          />
        </div>
      </style.Form>
    </style.Container>
  );
}
