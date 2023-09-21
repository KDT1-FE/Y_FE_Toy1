import { doc } from 'firebase/firestore';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projectCollection } from '../firebase';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { Viewer } from '@toast-ui/react-editor';
import { MyDocumentData } from './ProjectList';
import '../scss/projectDetail.scss'
const ProjectDetail = ():JSX.Element => {
  const navigate = useNavigate();
  const {id} = useParams();
  const ref = doc(projectCollection,id);
  const project = useFirestoreDocument(['project',id],ref);
  
  if(project.isLoading){
    return <div>Loading...</div>
  }
  
  if(project.isSuccess){
    const {writeDate, content, title, status}:DataType = project.data.data() as DataType;
    return (
      <div className='project__detail_container'>
        <button className='btn' onClick={() => navigate('/project')}>목록</button>
        <button className='btn' onClick={() => navigate(`/project/update/${id}`)}>수정</button>
        <div>{writeDate.toDate().toLocaleString()}</div>
        <div style={{display:'flex'}}>
                        <div>
                            <input type='radio' id='expected' checked={status === 'expected' ? true : false} defaultValue={'예정'} name='status' readOnly />
                            <label htmlFor='expected'>예정</label>
                        </div>
                        <div>
                            <input type='radio' id='progress' checked={status === 'proceeding' ? true : false} defaultValue={'진행중'} name='status' readOnly/>
                            <label htmlFor='progress'>진행중</label>
                        </div>
                        <div>
                            <input type='radio' id='complete' checked={status === 'complete' ? true : false} defaultValue={'완료'} name='status' readOnly/>
                            <label htmlFor='complete'>완료</label>
                        </div>
                    </div>
        <h2>{title}</h2>
        <Viewer initialValue={content} />
      </div>
    )
  }

  return (
    <></>
      
  )
}

export default ProjectDetail

interface DataType extends MyDocumentData{
  content: string;
}
