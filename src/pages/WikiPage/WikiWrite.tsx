import React, { useEffect } from "react";
import { getFirestore , collection, getDocs } from "firebase/firestore";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import {categoryNameState} from "../../recoil/atoms/wiki/CategoryAtom";
import {
  WikiWriteContainer,
  WikiWriteContentContainer,
} from "../../styled/wiki/Container";
import { SubmitButton } from "../../styled/wiki/Button";
import { TitleInput } from "../../styled/wiki/Input";
import CategorySelect from "../../styled/wiki/Select";
import app from '../../firebaseSDK';


export default function WikiWrite() {
  const [value, setValue] = React.useState<string | undefined>("");
  const db = getFirestore(app);
  const [categoryNames, setCategoryNames] = useRecoilState(categoryNameState);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryCollection = collection(db, "/category");
        const querySnapshot = await getDocs(categoryCollection);

        const names : string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.name;
          names.push(categoryName);
        });

        setCategoryNames(names);

      }
      catch(error) {
        console.error("Error fetching category names : " ,error);
      }
    };
    fetchCategoryName();
  },[setCategoryNames]);

  return (
    <WikiWriteContainer>
      <WikiWriteContentContainer>
        <TitleInput type="text" placeholder="제목을 입력하세요" />
        <CategorySelect>
          {categoryNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
          
        </CategorySelect>
        <MDEditor
          height={600}
          value={value}
          onChange={setValue}
          style={{ width: "100%" }}
        />
      </WikiWriteContentContainer>

      <SubmitButton type="button">Submit</SubmitButton>
    </WikiWriteContainer>
  );
}
