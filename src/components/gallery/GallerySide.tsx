import { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  query,
  where,
  collection,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../firebase";
import * as style from "./GallerySideStyle";
import Button from "../common/Button";
import Input from "../common/Input";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/Io";

const firestore = getFirestore(app);

interface Folders {
  createdAt: Date;
  id: string;
  sub: string[];
  title: string;
}

interface GallerySideProps {
  openAddListModal: () => void;
  galleryData: Folders[];
  addListModal: Boolean;
  configList: Boolean;
  album: string;
  setConfigList: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryData: React.Dispatch<React.SetStateAction<Folders[]>>;
  setAlbum: React.Dispatch<React.SetStateAction<string>>;
  setAlbumId: React.Dispatch<React.SetStateAction<string>>;
  setImgLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GallerySide({
  openAddListModal,
  galleryData,
  configList,
  setConfigList,
  setGalleryData,
  setAlbum,
  setAlbumId,
  setImgLoad,
}: GallerySideProps) {
  type Drop = boolean[];
  type AlbumName = string[];
  const [drop, setDrop] = useState<Drop>([]);
  const [albumName, setAlbumName] = useState<AlbumName>([]);
  const [prevAlbum, setPrevAlbum] = useState("album1");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const copy = galleryData.map(() => {
      return true;
    });
    setDrop(copy);

    const copy2 = galleryData.map(() => {
      return "";
    });
    setAlbumName(copy2);
  }, [galleryData]);

  const dropHandle = (i: number) => {
    const copy = [...drop];
    copy[i] = !copy[i];
    setDrop(copy);
  };

  const openConfigListHandle = () => {
    const copy = [...drop];
    drop.forEach((_, i) => {
      copy[i] = true;
    });
    setDrop(copy);
    setConfigList(true);
  };

  const closeConfigListHandle = () => {
    setConfigList(false);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id?: string,
    value?: string,
  ) => {
    if (e.key === "Enter") {
      const copy2 = galleryData.map(() => {
        return "";
      });
      setAlbumName(copy2);
      addAlbum(id, value);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
      const copy = [...galleryData];
      const find = copy.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            sub: [...item.sub, value],
          };
        }
        return item;
      });

      setGalleryData(find as Folders[]);
    }
  };

  const addAlbum = (id?: string, value?: string) => {
    console.log(id);
    console.log(value);
    const galleryRef = collection(firestore, "Gallery");
    const galleryQuery = query(galleryRef, where("id", "==", id));

    const fetchAndUpdateData = async () => {
      try {
        const querySnapshot = await getDocs(galleryQuery);
        querySnapshot.forEach(async (doc) => {
          const subArray: string[] = doc.data().sub || [];
          subArray.push(value as string);

          await updateDoc(doc.ref, { sub: subArray });
          console.log("문서 업데이트 성공");
        });

        const gallerySubRef = collection(firestore, "GallerySub");
        const newGallerySubDocData = {
          host: id,
          title: value,
        };

        await addDoc(gallerySubRef, newGallerySubDocData);
        console.log("GallerySub 문서 추가 성공");
      } catch (error) {
        console.error("작업 실패:", error);
      }
    };

    fetchAndUpdateData();
  };

  const fetchData = async (title: string) => {
    try {
      const q = query(
        collection(firestore, "GallerySub"),
        where("title", "==", title),
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setAlbumId(doc.id);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const albumClickHandle = async (title: string) => {
    try {
      setPrevAlbum(title);

      if (title === prevAlbum) {
        setImgLoad(false);
      }

      await fetchData(title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <style.GallerySide>
        <style.ListWrap>
          {galleryData.map((data, index) => {
            return (
              <div key={data.id}>
                <style.List
                  className={`bold`}
                  onClick={() => {
                    dropHandle(index);
                  }}
                >
                  {data.title}
                  <style.Arrow style={{ fontSize: ".5rem" }}>
                    {configList ? (
                      <style.ArrowIcon>🔧</style.ArrowIcon>
                    ) : drop[index] ? (
                      <style.ArrowIcon>
                        <IoIosArrowUp />
                      </style.ArrowIcon>
                    ) : (
                      <style.ArrowIcon>
                        <IoIosArrowDown />
                      </style.ArrowIcon>
                    )}
                  </style.Arrow>
                </style.List>

                {data.sub?.map((v, i) => {
                  return drop[index] ? (
                    <style.List
                      key={i}
                      onClick={() => {
                        setImgLoad(true);
                        setAlbum(v);
                        albumClickHandle(v);
                      }}
                    >
                      <style.icon></style.icon>
                      {v}
                    </style.List>
                  ) : null;
                })}

                {configList ? (
                  <style.List>
                    <style.icon></style.icon>
                    <Input
                      type="text"
                      id="add-sub"
                      placeholder="입력 후 엔터"
                      onChange={(e) => {
                        const copy = [...albumName];
                        copy[index] = e.target.value;
                        setAlbumName(copy);
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(e, data.id, albumName[index]);
                      }}
                      // forwardedRef={inputRef}
                      value={albumName[index]}
                      width="10rem"
                    />
                  </style.List>
                ) : null}
              </div>
            );
          })}
          {configList ? (
            <style.AddList onClick={openAddListModal}>+</style.AddList>
          ) : null}
        </style.ListWrap>
        <style.ButtonWrap>
          {configList ? (
            <Button
              text="취소"
              padding=".3rem .6rem"
              normal="reverse"
              onClick={closeConfigListHandle}
            ></Button>
          ) : (
            <Button
              text="카테고리 편집"
              padding=".3rem 2rem"
              onClick={openConfigListHandle}
            ></Button>
          )}
        </style.ButtonWrap>
      </style.GallerySide>
    </>
  );
}
