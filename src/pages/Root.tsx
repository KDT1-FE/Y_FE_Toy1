import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CreatePostModal from '../components/MainPost/PostModal';
import 'firebase/auth'; // 'compat' 제거
import { useAuth } from '../data/firebaseAuth';
import { FirestorePostData } from '../redux/types';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { RootState } from '../redux/types'; // RootState 타입 추가
import { useSelector, useDispatch } from 'react-redux';

export default function Root() {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<FirestorePostData[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const location = useLocation();

  const user = useSelector((state: RootState) => state);
  console.log('유저정보', user);

  const handleSavePost = async (title: string, content: string) => {
    if (user && user.uid) {
      const postsRef = collection(db, 'posts');
      try {
        await addDoc(postsRef, {
          title,
          content,
          userId: user.uid,
          username: user.nickname,
          timestamp: new Date(),
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
      // 사용자가 로그인하지 않았을 때 경고창 표시
      alert('로그인 후에 포스트를 작성할 수 있습니다.');
    }
  };

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'));
    try {
      const querySnapshot = await getDocs(q);
      const newPosts: FirestorePostData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirestorePostData;
        newPosts.push({ ...data, username: '' });
      });
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
      {location.pathname === '/' && (
        <div className="post-container">
          <div className="post-list">
            <div className="posted-text">포스트 목록</div>
            <div className="newPostBtn">
              {user && user.uid ? (
                <button onClick={() => setIsModalOpen(true)}>
                  새 포스트 작성
                </button>
              ) : (
                <button
                  onClick={() =>
                    alert('로그인 후에 포스트를 작성할 수 있습니다.')
                  }
                >
                  새 포스트 작성
                </button>
              )}
            </div>
            {isModalOpen && (
              <CreatePostModal
                onSave={handleSavePost}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
              />
            )}
            <Outlet />
            <ul className="post-grid">
              {posts.map((post) => (
                <li className="post-item" key={post.id}>
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>작성자: {user.nickname}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
