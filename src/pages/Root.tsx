import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CreatePostModal from '../components/MainPost/PostModal';
import 'firebase/auth';
import { useAuth } from '../data/firebaseAuth';
import { FirestorePostData } from '../redux/types';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { RootState } from '../redux/types';
import { useSelector } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import PostedModal from '../components/MainPost/PostedModal';

export default function Root() {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // 게시글 작성 모달
  const [selectedPost, setSelectedPost] = useState<FirestorePostData | null>(null);
  
  const [PostedModalOpen, setPostedModalOpen] = useState(false); // 작성된 게시글 모달
  const [posts, setPosts] = useState<FirestorePostData[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const location = useLocation();
  const user = useSelector((state: RootState) => state);

  // 작성된 게시글 보는 모달
  const handleOpenPostModal = (post: FirestorePostData) => {
    setSelectedPost(post); // 선택한 게시물 설정
    setPostedModalOpen(true);
  };

  const handleClosePostModal = () => {
    setPostedModalOpen(false);
  };

  // 게시글 작성하는 모달
  const handleOpenModal = () => {
    if (user && user.uid) {
      setIsModalOpen(true);
    } else {
      alert('로그인 후에 포스트를 작성할 수 있습니다.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSavePost = async (title: string, content: string, selectedDate: Date) => {
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해야 합니다.');
      return;
    }

    if (user && user.uid) {
      const postsRef = collection(db, 'posts');
      try {
        await addDoc(postsRef, {
          title,
          content,
          userId: user.uid,
          username: user.nickname,
          timestamp: selectedDate,
        });

        console.log('모집글이 성공적으로 저장되었습니다.');
        setIsModalOpen(false);
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('모집글 저장 중 오류 발생:', error);
      }
    } else {
      console.error('사용자가 로그인하지 않았습니다.');
      alert('로그인 후에 포스트를 작성할 수 있습니다.');
    }
  };

  const fetchUserNickname = async (userId: string) => {
    const userRef = doc(db, 'User', userId);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data().nickname;
      }
    } catch (error) {
      console.error('사용자 닉네임을 가져오는 중 오류 발생:', error);
    }
    return '닉네임을 가져오지 못했습니다.';
  };
  
const fetchPosts = async () => {
  const q = query(collection(db, 'posts'));
  try {
    const querySnapshot = await getDocs(q);
    const newPosts: FirestorePostData[] = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data() as FirestorePostData;
      const userData = await fetchUserNickname(data.userId); 
      newPosts.push({ ...data, id: doc.id, username: userData });
    }
    setPosts(newPosts);
  } catch (error) {
    console.error('포스트 목록을 불러오는 중 오류 발생:', error);
  }
};

  useEffect(() => {
    fetchPosts();
    console.log('auth.currentUser:', auth.currentUser);
  }, [auth.currentUser]);

  return (
    <div>
      <Header />
      <section>
        <div className="main-container">
          {location.pathname === '/' && <ImageSlider />}
          <Outlet />
        </div>
      </section>
      {location.pathname === '/' &&  <div className='post-container'>
      <div className="post-list">
        <div className='post-list-top'>
      <div className='posted-text'>스터디 모집</div>
      <button className="newPostBtn">
      {user && user.uid ? (
        <div className="open-modal-button" onClick={handleOpenModal}>
          새 포스트 작성
        </div>
      ) : (
        <div onClick={() => alert('로그인 후에 포스트를 작성할 수 있습니다.')}>
          새 포스트 작성
        </div>
      )}
      </button>
      </div>
      {isModalOpen && (
        <CreatePostModal
          onSave={handleSavePost}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onClose={handleCloseModal}
        />
      )}
      <Outlet />
      <ul className="post-grid">
        {posts.map((post,index) => (
          <li className="post-item" key={index} onClick={() => handleOpenPostModal(post)}>
            <div className="post-content-container">
            <p className='post-user'>작성자: {post.username}</p>
              <p className='post-title'>{post.title}</p>
              <p className='post-content'>{post.content}</p>
              <p className='post-due-date'>모집기간: {(post.timestamp as any).toDate().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>}
    {PostedModalOpen && (
      <div className="modal open">
        <div className="modal-content">
          <span className="close-button" onClick={handleClosePostModal}>
            &times;
          </span>
          {selectedPost && (
            <div>
              <p className='postedText'>스터디 모집글</p>
              <div className='postedInfo'>
              <p className='postedNickname'>작성자: {selectedPost.username}</p>
              <p className='postedDate'>모집기간: {(selectedPost.timestamp as any).toDate().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className='postedTitle'>{selectedPost.title}</p>
              <p className='postedContent'>{selectedPost.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </div>
  );
}
