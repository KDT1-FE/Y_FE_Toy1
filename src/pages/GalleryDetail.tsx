import Sidebar from 'components/Sidebar'
import { useState, useEffect } from "react"
import { db } from "../firebase"
import { doc, collection, getDocs, deleteDoc } from  "firebase/firestore"
import { Link, useParams, useNavigate } from "react-router-dom";

  // 함수 인자 타입 선언
  interface GalleryDetailProps {
    onEdit: boolean;
    setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface userData {
    id: string,
    category: string,
    title: string,
    date: string,
    writer: string,
    desc: string
  }

const GalleryDetail: React.FC<GalleryDetailProps> = ({setOnEdit}) => {

  // 현재 url의 id값 구하기
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "user");

  // 데이터 가져오기
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const user = data.docs.find(doc => doc.id === id);
      if (user) {
        setUsers([ {...user.data(), id: user.id} ])
      }
    };
    getUsers();
    console.log('테스트')
  }, []);
  
  // 데이터 삭제하기
  const deleteGallery = async (id: string) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc)
    alert('삭제 완료했습니다')
    // 삭제 후 리스트페이지로 이동
    navigate('/Gallery')
  }

  return (
    <>
    <Sidebar />
    {
      users.map((user: userData) => {
        return (
          <div key={user.id}>
            <div style={{borderBottom: '1px solid #ddd'}}>
              <p>카테고리 : {user.category}</p>
              <p>제목 : {user.title}</p>
              <p>날짜 : {user.date}</p>
              <p>글쓴이 : {user.writer}</p>
              <div dangerouslySetInnerHTML={{  __html: user.desc}}></div>
            </div>
            <Link to={`/gallery/edit/${user.id}`}>
              <button onClick={() => setOnEdit(true)}>수정</button>
            </Link>
            <button onClick={() => {deleteGallery(user.id)}}>삭제</button>
            </div>
        )
      })
    }
    </>
  )
}

export default GalleryDetail
