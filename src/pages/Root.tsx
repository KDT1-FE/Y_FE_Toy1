import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CreatePostModal from '../components/PostModal';
import 'firebase/auth'; // 'compat' 제거
import { useAuth } from '../data/firebaseAuth';
import { FirestorePostData } from '../redux/types';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';

export default function Root() {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<FirestorePostData[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const location = useLocation();

  const handleSavePost = async (title: string, content: string) => {
    if (auth.currentUser) {
      const postsRef = collection(db, 'posts');
      try {
        // Firebase Firestore에 데이터 추가
        await addDoc(postsRef, {
          title,
          content,
          userId: auth.currentUser.uid,
          username: auth.currentUser.displayName,
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
    }
  };

  // 포스트 목록 가져오기 함수
  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'));
    try {
      const querySnapshot = await getDocs(q);
      const newPosts: FirestorePostData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirestorePostData; // Firestore 데이터를 FirestorePostData로 형변환
        newPosts.push({ ...data, username: '' }); // username을 빈 문자열로 초기화
      });
      setPosts(newPosts);
    } catch (error) {
      console.error('포스트 목록을 불러오는 중 오류 발생:', error);
    }
  };
  

  useEffect(() => {
    // 페이지 로드 시 포스트 목록 가져오기
    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <section>
        <div className="main-container">
          {/* ImageSlider를 메인 페이지에서만 렌더링 */}
          {location.pathname === '/' && <ImageSlider />}
          <Outlet />
        </div>
      </section>
      <button onClick={() => setIsModalOpen(true)}>새 포스트 작성</button>
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
      <div className="post-list">
        <h2>포스트 목록</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>작성자: {post.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
