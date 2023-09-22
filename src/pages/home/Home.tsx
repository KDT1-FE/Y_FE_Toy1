import * as style from "./homeStyle";
import Carousel from "../../components/home/Carousel";
import GalleryPreview from "../../components/home/GalleryPreview";
import WikiPreview from "@/components/home/WikiPreview";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Wiki } from "@/components/wiki/WikiCommonType";

export default function Home() {
  const [lastestWikis, setLastestWikis] = useState<Wiki[]>();
  useEffect(() => {
    const aa = async () => {
      const q = query(
        collection(db, "Wiki"),
        orderBy("createdAt", "desc"),
        limit(2),
      );

      onSnapshot(q, (snapshot) => {
        setLastestWikis(snapshot.docs.map((doc) => doc.data() as Wiki));
      });
    };
    aa();
  }, []);

  return (
    <>
      <style.Temp>
        <style.Item1>
          <style.MainTitle>공지사항</style.MainTitle>
        </style.Item1>
        <style.Item2>
          <Carousel />
        </style.Item2>
        <style.MainTitleWrapper>
          <style.MainTitle>최근 업데이트 된 WIKI</style.MainTitle>
          <style.MoreBtn to={"/wiki"}>더보기 &gt;</style.MoreBtn>
        </style.MainTitleWrapper>
        {lastestWikis ? (
          <>
            {lastestWikis?.map((lastestWiki) => {
              return (
                <div key={lastestWiki.wikiID}>
                  <WikiPreview wikiData={lastestWiki} />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <style.SideSkeleton />
            <style.SideSkeleton />
          </>
        )}

        <style.Item6>
          <style.MainTitleWrapper>
            <style.MainTitle>최근 업데이트 된 GALLERY</style.MainTitle>
            <style.MoreBtn to={"/gallery"}>더보기 &gt;</style.MoreBtn>
          </style.MainTitleWrapper>
        </style.Item6>
        <style.Item7>
          <GalleryPreview />
        </style.Item7>
      </style.Temp>
    </>
  );
}
