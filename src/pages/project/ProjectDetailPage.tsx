import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectCollection } from '../../firebase';
import { Viewer } from '@toast-ui/react-editor';
import { MyDocumentData } from './ProjectListPage';

import '@scss/projectDetailPage.scss';

const ProjectDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = doc(projectCollection, id);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, snapshot => {
      setData(snapshot.data() as DataType);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    const { writeDate, content, title, status } = data;
    return (
      <div className="project__detail">
        <div className="project__detail-btns-box">
          <button className="btn" onClick={() => navigate('/project')}>
            목록
          </button>
          <button className="btn" onClick={() => navigate(`/project/update/${id}`)}>
            수정
          </button>
        </div>
        <div className="project__detail-date-box">
          <span>작성일</span>
          <span className="project__detail-date">{writeDate.toDate().toLocaleString()}</span>
        </div>
        <div className="project__detail-status-box">
          <div className="project__detail-statu-box">
            <input
              type="radio"
              id="expected"
              checked={status === 'expected' ? true : false}
              defaultValue={'예정'}
              name="status"
              readOnly
            />
            <label htmlFor="expected">예정</label>
          </div>
          <div className="project__detail-statu-box">
            <input
              type="radio"
              id="progress"
              checked={status === 'proceeding' ? true : false}
              defaultValue={'진행중'}
              name="status"
              readOnly
            />
            <label htmlFor="progress">진행중</label>
          </div>
          <div className="project__detail-statu-box">
            <input
              type="radio"
              id="complete"
              checked={status === 'complete' ? true : false}
              defaultValue={'완료'}
              name="status"
              readOnly
            />
            <label htmlFor="complete">완료</label>
          </div>
        </div>
        <div className="project__detail-title">{title}</div>
        <Viewer initialValue={content} />
      </div>
    );
  }

  return <></>;
};

export default ProjectDetail;

export interface DataType extends MyDocumentData {
  content: string;
}
