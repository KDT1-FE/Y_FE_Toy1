import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, getDocs } from 'firebase/firestore';
import { ContentListItemContainer } from '../../../styled/WikiPage/Container';
import ContentListItem from './ContentListItem';
import { wikiListState } from '../../../recoil/atoms/wiki/wikiListAtom';
import {db} from '../../../firebaseSDK';
import { filteredWikiListSelector } from '../../../recoil/atoms/wiki/CategoryAtom';
import searchKeywordState from '../../../recoil/atoms/wiki/SearchAtom';

interface WikiListItem {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function ContentList() {
  const [, setWikiList] = useRecoilState(wikiListState);
  const filteredWikiList = useRecoilValue(filteredWikiListSelector);
  const searchKeyword = useRecoilValue(searchKeywordState);
  const fetchWikiList = async () => {
    try {
      const wikiCollection = collection(db, '/wiki');
      const querySnapshot = await getDocs(wikiCollection);
      const fetchedWikiList: WikiListItem[] = [];

      querySnapshot.forEach((d) => {
        const data = d.data();
        const date = new Date(data.createdAt.seconds * 1000);
        const formattedCreatedAt = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

        fetchedWikiList.push({
          id: d.id,
          category: data.category,
          title: data.title,
          content: data.content,
          createdAt: formattedCreatedAt,
        });
      });
      return fetchedWikiList;
    } catch (error) {
      console.error('Error fetching wiki list', error);
      return [];
    }
  };

  // wikiListState Recoil 상태를 사용하여 상태를 컴포넌트에 주입

  useEffect(() => {
    const fetchedList = async () => {
      const fetchedWikiList = await fetchWikiList();
      setWikiList(fetchedWikiList);
    };
    fetchedList();
  }, [setWikiList]); // wikiListState가 변경될 때만 useEffect가 실행됩니다.
  const searchItem = filteredWikiList.filter((item) =>
    item.title.includes(searchKeyword)
  );
  return (
    <ContentListItemContainer>
      {searchItem.map((wikiItem) => (
        <ContentListItem key={wikiItem.id} item={wikiItem} />
      ))}
    </ContentListItemContainer>
  );
}
