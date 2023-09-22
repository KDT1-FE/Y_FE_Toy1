import { useNavigate } from 'react-router-dom';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { projectCollection } from '../../firebase';
import { DocumentData, orderBy, query } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from '@components/Pagenation';
import Project from '@components/Project';

import '@scss/projectListPage.scss';

const ProjectList = (): JSX.Element => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<DocumentData | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 19;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const ref = query(projectCollection, orderBy('writeDate', 'desc'));
  const loginState = useSelector((state: State) => state.loginUpdate);

  const queryResult = useFirestoreQuery(['project'], ref, {
    subscribe: true,
  });
  const snapshot = queryResult.data;

  useEffect(() => {
    if (queryResult.isSuccess) {
      setPosts(snapshot?.docs);
    }
  }, [queryResult.status]);

  const currentPosts = (posts: DocumentData) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <section className="section container">
      <div className="project-top">
        <h1>프로젝트</h1>
      </div>
      <article className="section__filter">
        <button
          className={`section__project-write-btn ${!loginState.isLogin ? ' ' : 'btn'}`}
          onClick={() => navigate('/project/write')}
          disabled={!loginState.isLogin}>
          글쓰기
        </button>
      </article>
      <article className="section__project-container">
        {queryResult.isLoading && <div>Loading...</div>}
        {queryResult.isSuccess && <Project posts={posts && currentPosts(posts)} />}
      </article>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts?.length}
        paginate={setCurrentPage}
        currentPage={currentPage}></Pagination>
    </section>
  );
};

export default ProjectList;

interface StateValue {
  isLogin: boolean;
  name: string;
  email: string;
}
interface State {
  loginUpdate: StateValue;
}

export interface MyDocumentData {
  title: string;
  status: string;
  writeDate: firebase.firestore.Timestamp; // 또는 Date 형태로 변환한 후 사용
}
