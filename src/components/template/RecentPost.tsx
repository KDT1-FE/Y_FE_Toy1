import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";

import { Link } from "react-router-dom";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";

interface postData {
  id: string;
  category: string;
  title: string;
  date: string;
  timestamp: Timestamp;
  writer: string;
  desc: string;
  thumbnail: string;
}

const RecentPost: React.FC = () => {
  const [posts, setPost] = useState<postData[]>([]);

  const q = query(
    collection(db, "gallery"),
    orderBy("timestamp", "desc"), // timestamp의 내림차순으로 정렬해서
    limit(6) // 6개만 불러오기
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postSnap = await getDocs(q);
        const data = postSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            // 다양한 falsy값으로 누락되면 ||로 바꿔야함
            id: doc.id,
            category: docData.category ?? "",
            title: docData.title ?? "",
            date: docData.date ?? "",
            timestamp: docData.timestamp ?? null,
            writer: docData.writer ?? "",
            desc: docData.desc ?? "",
            thumbnail: docData.thumbnail ?? "",
          };
        });
        setPost(data);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <h1>최근 게시글</h1>
      <ListWrapper>
        {posts.map((post: postData) => {
          return (
            <div key={post.id}>
              <Link to={`/Gallery/detail/${post.id}`}>
                <div className="Gallery__link">
                  <p className="img-bx">
                    <img src={post.thumbnail} alt="썸네일" />
                  </p>
                  <p className="Gallery__title">{post.title}</p>
                  <p className="Gallery__desc">
                    <span>{post.date}</span>
                    <span>{post.writer}</span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  > div {
    display: block;
    flex: 1 0 33.3%;
    max-width: 33.3%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.3s;
    @media screen and (max-width: 1200px) {
      flex: 1 0 50%;
      max-width: 50%;
    }
    @media screen and (max-width: 600px) {
      flex: 1 0 100%;
      max-width: 100%;
    }
    a {
      width: 100%;
      display: block;
    }
    @media screen and (min-width: 601px) {
      &:hover {
        transform: translateY(-10px);
      }
    }
  }
  .Gallery__link {
    padding: 0 10px;
  }
  .img-bx {
    width: 100%;
    text-align: center;
    border-radius: 20px;
    background-color: #ddd;
    display: block;
    position: relative;
    overflow: hidden;
    border: 1px solid #dfdfdf;
  }
  img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    max-height: none;
    transform: translate(-50%, -50%) scale(0.1);
  }
  .img-bx:after {
    content: "";
    display: block;
    padding-bottom: 62.5%;
  }
  .Gallery__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Gallery__desc {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    position: relative;
    overflow: hidden;
    left: -0.5em;
    > span {
      position: relative;
      display: inline-block;
      padding: 0 0.5em;
      color: #666;
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

export default RecentPost;
