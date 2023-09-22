import { useState, useEffect } from "react";
import { db } from "../../libs/firebase";
import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
  QuerySnapshot,
} from "firebase/firestore";
import { FormDataType } from "../../type/form";
import { TABLE_TITLE } from "../../constant/member";
import { message } from "antd";

interface FetchDataParams {
  COLLECTION_NAME: string;
  ORDER?: string;
  DOCUMENT_ID?: string;
}

interface FetchDataResult {
  data: FormDataType[];
  loading: boolean;
}

export function useFetchData({
  COLLECTION_NAME,
  ORDER,
  DOCUMENT_ID,
}: FetchDataParams): FetchDataResult {
  const [data, setData] = useState<FormDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    // doc 단위
    if (DOCUMENT_ID) {
      const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            setData(docData as FormDataType[]);
            setLoading(false);
          } else {
            message.error("문서를 찾을 수 없습니다!");
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
          message.error("데이터를 불러올 수 없습니다!");
          return () => {
            unsubscribe();
          };
        },
      );
    } else {
      // collection 단위
      let q = query(collection(db, COLLECTION_NAME));
      if (ORDER) {
        q = query(q, orderBy(ORDER));
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot) => {
          const list: FormDataType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const selectedFields = {
              id: doc.id,
              ...data,
            };
            list.push(selectedFields);
          });

          const orderedData = list.map((item) => {
            const orderedItem: FormDataType = { id: item.id };
            for (const key of Object.keys(TABLE_TITLE)) {
              orderedItem[key] = item[key];
            }
            return orderedItem;
          });

          setData(orderedData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching data:", error);
          message.error("데이터를 불러올 수 없습니다!");
          setLoading(false);
          return () => {
            unsubscribe();
          };
        },
      );
    }
  }, [COLLECTION_NAME, ORDER, DOCUMENT_ID]);

  return { data, loading };
}
