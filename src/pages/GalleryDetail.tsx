import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { db } from "../firebase"
import { doc, collection, getDocs, deleteDoc } from  "firebase/firestore"
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "authentication/authContext";
import userData from './UserData'

// 함수 인자 타입 선언
interface GalleryDetailProps {
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryData: React.Dispatch<React.SetStateAction<userData[]>>;
}

const GalleryDetail: React.FC<GalleryDetailProps> = ({ setOnEdit, setGalleryData }) => {
  // 현재 url의 id값 구하기
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [users, setUsers] = useState<userData[]>([]);
  const usersCollectionRef = collection(db, "gallery");

  // 데이터 가져오기
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log('상세 데이터 가져오기')
      const user = data.docs.find((doc) => doc.id === id);
      if (user) {
        setUsers([{ ...user.data(), id: user.id }]);
      }
    };
    getUsers();
  }, []);

  // 데이터 삭제하기
  const deleteGallery = async (id: string | undefined) => {
    if(user){
    const userToDelete = users.find(user => user.id === id);
    if(userToDelete && user.uid === userToDelete.uid){
    // 삭제 여부 확인
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?")
      if(confirmDelete){
        // 삭제할 id의 데이터 지우기
        const collectionRef = collection(db, "gallery");
        const userDoc = doc(collectionRef, id);
        await deleteDoc(userDoc)

        setGalleryData(prevData => prevData.filter(item => item.id !== id));
        console.log('제거')

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
  const editGallery = async (id: string | undefined) => {
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
      {users.map((user) => {
        return (
          <div key={user.id} style={{ margin: "30px" }}>
              <GalleryHeader>
                <div className="Gallery__btn-wrap">
                <button onClick={() => {deleteGallery(user.id)}} className="Gallery__btn delete">삭제</button>
                <button onClick={() => {editGallery(user.id)}} className="Gallery__btn">수정</button>
                </div>
              </GalleryHeader>
              <GalleryThumb>
                <img src={user.thumbnail} alt="썸네일"/>
              <GalleryDesc>
                <div className="Gallery__title"> {user.title}</div>
                <div className="Gallery__desc">
                  <span>{user.date}</span>
                  <span>{user.writer}</span>
                </div>
              </GalleryDesc>
            </GalleryThumb>
            <GalleryEditor>
              { user.desc ? <div dangerouslySetInnerHTML={{ __html: user.desc }}></div> : null }
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
  );
};

const GalleryHeader = styled.div`  
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  .Gallery__btn-wrap {
    display: flex;
    gap: 10px;
  }
  .Gallery__btn {
    background-color: var(--main-color);
    width: 95px;
    height: 35px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
    &.delete {
      background-color: white;
      color: var(--main-color);
      border: 1px solid var(--main-color);
    }
  }
`;

const GalleryDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index:10;
  padding: 0 20px;
  .Gallery__title {
    font-size: 1.4rem;
    font-weight: 700;
    color:white;
  }
  .Gallery__desc{
    position: relative;
    overflow: hidden;
    left: -0.5em;
    margin-top:10px;
    > span {
    position: relative;
    display: inline-block;
    padding: 0 0.5em;
    color: rgba(255,255,255,0.6);
    font-weight: 400;
    &:before {
      content: "";
      left: -1px;
      height: 0.8em;
      top: 50%;
      margin-top: -0.4em;
      position: absolute;
      border-left: 1px solid #b3b3b3;
    }
  }
  }

`;

const GalleryEditor = styled.div`
  margin-top: 20px;
  padding-top: 10px;
`;

const GalleryBtn = styled.div`
margin-top: 60px;
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

const GalleryThumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 200px;
  position:relative;
  img{
    width:100%;
  }
  &:after{
    content:'';
    position:absolute;
    left:0;
    top:0;
    display:block;
    background-color: rgba(0,0,0,0.25);
    width:100%;
    height:100%;
  }
`

export default GalleryDetail
