import { NavLink, useNavigate } from "react-router-dom"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { db, projectCollection } from "../firebase"
import { deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { AiFillDelete } from 'react-icons/ai';
import firebase from "firebase/compat/app";
import '../scss/projectList.scss'
const ProjectList = ():JSX.Element => {
  const navigate = useNavigate();
  const ref = query(projectCollection, orderBy('writeDate','desc'));
  const queryResult = useFirestoreQuery(['project'],ref,{
    subscribe: true,
  });
  const snapshot = queryResult.data;

  const deleteHandle = async (id:string) => {
    const projectDoc = doc(db, 'project', id);
    await deleteDoc(projectDoc);
  }
  
  return (
    <section className="section container">
        <article className="section__filter">
            <input className="section__project-search-input" type='text' />
            <button className="section__project-write-btn btn" onClick={()=>navigate('/project/write')}>글쓰기</button>
        </article>
        <article className="section__project-container">
          {queryResult.isLoading && <div>Loading...</div>}
          {queryResult.isSuccess && snapshot?.docs.map((docSnapshot,index) => {
          
              const {title , status , writeDate}: MyDocumentData = docSnapshot.data() as MyDocumentData;
              const id = docSnapshot.id; 
              const date = writeDate?.toDate().toLocaleString();
              
              return  <div className="section__project-item-box" key={index}>
                          <NavLink to={`/project/${id}`}>{title}</NavLink>
                          <div className="section__project-date">{date}</div>
                            <div className={`section__project-status ${status}`}>{status}</div>
                          <button className="section__project-delete-btn" onClick={() => deleteHandle(id)}><AiFillDelete /></button>
                      </div>;
          })}
        </article>
    </section>
  )
}

export default ProjectList

export interface MyDocumentData {
  title: string;
  status: string;
  writeDate: firebase.firestore.Timestamp;  // 또는 Date 형태로 변환한 후 사용
}