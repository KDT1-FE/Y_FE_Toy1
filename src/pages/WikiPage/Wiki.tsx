import React , { useEffect }from "react";
import { useNavigate } from 'react-router-dom';
import { collection,getDocs} from "firebase/firestore";
import {useRecoilState } from "recoil";
import { categoryNameState } from "../../recoil/atoms/wiki/CategoryAtom";
import Search from "./components/Search";
import Category from "./components/Category";
import ContentHeader from "./components/ContentHeader";
import ContentList from "./components/ContentList";
import {
  Container,
  RowContainer,
  ColumnContainer,
  ContentContainer
} from "../../styled/WikiPage/Container";
import { AddBtn } from "../../styled/WikiPage/Button";
import GlobalStyle from "../../styled/WikiPage/GlobalStyle";
import {db} from '../../firebaseSDK';


export default function Wiki() {
  const [, setCategoryNames] = useRecoilState(categoryNameState);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryCollection = collection(db, "/category");
        const querySnapshot = await getDocs(categoryCollection);

        const names: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.name;
          names.push(categoryName);
        });

        setCategoryNames(names);

      }
      catch (error) {
        console.error("Error fetching category names : ", error);
      }
    };
    fetchCategoryName();
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/wiki/write');
    }
  return (
    <Container>
      <GlobalStyle />
      <RowContainer>
        <ColumnContainer>
          <Search />
          <Category />
        </ColumnContainer>
        <ContentContainer>
          <AddBtn type="button" onClick={handleButtonClick}>
            추가하기
          </AddBtn>
          <ContentHeader />
          <ContentList />
        </ContentContainer>
      </RowContainer>
    </Container>
  );
}
