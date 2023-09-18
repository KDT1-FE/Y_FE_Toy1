import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { doc, collection, getDocs, deleteDoc } from  "firebase/firestore"
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "authentication/authContext";

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
    timestamp: string,
    writer: string,
    desc: string
  }

const GalleryDetail: React.FC<GalleryDetailProps> = ({setOnEdit}) => {

  // 현재 url의 id값 구하기
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "gallery");

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
  }, []);
  
  // 데이터 삭제하기
  const deleteGallery = async (id: string) => {
    if(user){
    const userToDelete = users.find(user => user.id === id);
    if(userToDelete && user.uid === userToDelete.uid){
    // 삭제 여부 확인
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?")
      if(confirmDelete){
        // 삭제할 id의 데이터 지우기
        const userDoc = doc(db, "gallery", id);
        await deleteDoc(userDoc)
        alert('삭제 완료했습니다')
        // 삭제 후 리스트페이지로 이동
        navigate('/Gallery')
      } else{
        return;
      }
    } else {
      alert('해당 작성자만 삭제 가능합니다')
      return;
    }
    } else {
      const confirmed = window.confirm("로그인해야 이용할 수 있습니다. 로그인 하시겠습니까?")
      if (confirmed) {
        navigate('/login')
      } else {
        return;
      }
    }
  }

  // 데이터 수정하기
  const editGallery = async (id: string) => {
    if(user){
    const userToEdit = users.find(user => user.id === id);
    if(userToEdit && user.uid === userToEdit.uid){
      setOnEdit(true)
      navigate(`/Gallery/edit/${id}`)
    } else {
      alert('해당 작성자만 수정 가능합니다')
      return;
    }
    } else {
      const confirmed = window.confirm("로그인해야 이용할 수 있습니다. 로그인 하시겠습니까?")
      if (confirmed) {
        navigate('/login')
      } else {
        return;
      }
    }
  }

  return (
    <>
    {
      users.map((user: userData) => {
        return (
          <div key={user.id} style={{margin: '30px'}}>
            <GalleryHeader>
              <div className="Gallery__title"> {user.title} 
              </div>
              <div className="Gallery__btn-wrap">
              <button onClick={() => {deleteGallery(user.id)}} className="Gallery__btn delete">삭제</button>
              <button onClick={() => {editGallery(user.id)}} className="Gallery__btn">수정</button>
              </div>
            </GalleryHeader>
            <GalleryDesc>
              <span>{user.date}</span>
              <span>{user.writer}</span>
            </GalleryDesc>
            <GalleryEditor>
              <div dangerouslySetInnerHTML={{  __html: user.desc}}></div>
            </GalleryEditor>
          </div>
        )
      })
    }
        <GalleryBtn>
        <Link to="/Gallery">
          <button>목록으로</button>
        </Link>
        </GalleryBtn>
    </>
  )
}

const GalleryHeader = styled.div`
  margin-top: 40px; 
  display:flex;
  justify-content: space-between;
  .Gallery__title{
    font-size: 1.4rem;
    font-weight: 700;
  }
  .Gallery__btn-wrap{
    display:flex;
    gap:10px;
  }
  .Gallery__btn{
    background-color: var(--main-color);
    width: 95px;
    height: 35px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
    &.delete{
      background-color: white;
      color: var(--main-color);
      border: 1px solid var(--main-color);
    }
  }
`

const GalleryDesc = styled.div`
    font-size: 14px;
    font-weight:400;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    left: -0.5em;
    > span{
      position: relative;
      display: inline-block;
      padding: 0 0.5em;
      color: #666;
      font-weight: 400;
      &:before{
        content: "";
        left: -1px;
        height: 0.8em;
        top: 50%;
        margin-top: -0.4em;
        position: absolute;
        border-left: 1px solid #b3b3b3;
      }
    }
`

const GalleryEditor = styled.div`
  border-top: 1px solid #ddd;
  margin-top:20px;
  padding-top:10px;
`

const GalleryBtn = styled.div`
margin-top: 20px;
text-align:center;
  button{
    background-color: var(--main-color);
    width: 95px;
    height: 35px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`

export default GalleryDetail
