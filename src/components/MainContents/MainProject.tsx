import { useEffect, useState } from 'react';
import { projectCollection } from '../../firebase';
import { DocumentData, orderBy, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { MyDocumentData } from '../../pages/project/ProjectListPage';

import '@scss/components/_mainProject.scss';

const MainProject = () => {
  const [posts, setPosts] = useState<DocumentData | undefined>([]);
  const ref = query(projectCollection, orderBy('writeDate', 'desc'));
  const queryResult = useFirestoreQuery(['project'], ref, {
    subscribe: true,
  });
  const snapshot = queryResult.data;

  useEffect(() => {
    if (queryResult.isSuccess) {
      setPosts(snapshot?.docs);
    }
  }, [queryResult.status]);

  return (
    <div className="mainP-container">
      <ul>
        {posts?.map((docSnapshot: DocumentData, index: number) => {
          const { title, status } = docSnapshot?.data() as MyDocumentData;
          if (index < 7) {
            return (
              <li className="mainP-item" key={index}>
                <div className="mainP-item__title">{title}</div>
                <div className={`mainP-item__status ${status}`}>{status}</div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default MainProject;
