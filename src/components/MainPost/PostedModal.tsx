import React, { useEffect, useState } from 'react';
import { FirestorePostData } from '../../redux/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../data/firebase';

interface IPostedModalProps {
  postId: string;
  onClose: () => void;
}

const PostedModal: React.FC<IPostedModalProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<FirestorePostData | null>(null);

  useEffect(() => {
    // postId를 사용하여 해당 포스트의 데이터를 가져오기
    const fetchPost = async () => {
      const postRef = doc(db, 'posts', postId);
      try {
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const postData = postDoc.data() as FirestorePostData;
          setPost(postData);
        } else {
          console.error('포스트를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('포스트 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="modal open modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedModal;
