import { DocumentData, deleteDoc, doc } from 'firebase/firestore';
import { MyDocumentData } from '@/pages/project/ProjectListPage';
import { NavLink } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { db } from '../firebase/index';

const Project = ({ posts }: DocumentData) => {
  const deleteHandle = async (id: string) => {
    const projectDoc = doc(db, 'project', id);
    await deleteDoc(projectDoc);
  };

  return (
    <>
      {posts?.map((docSnapshot: DocumentData, index: number) => {
        const { title, status, writeDate }: MyDocumentData = docSnapshot.data() as MyDocumentData;
        const id = docSnapshot.id;
        const date = writeDate?.toDate().toLocaleString();

        return (
          <div className="section__project-item-box" key={index}>
            <NavLink className="section__project-title" to={`/project/${id}`}>
              {title}
            </NavLink>
            <div className="section__project-date">{date}</div>
            <div className={`section__project-status ${status}`}>{status}</div>
            <button className="section__project-delete-btn" onClick={() => deleteHandle(id)}>
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Project;
