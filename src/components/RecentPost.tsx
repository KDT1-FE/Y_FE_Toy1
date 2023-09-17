import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";

interface userData {
  id: string;
  category: string;
  title: string;
  date: string;
  writer: string;
  desc: string;
  thumbnail: Timestamp;
}

const RecentPost: React.FC = () => {
  // const [users, setUsers] = useState<any[]>([]);
  // const usersCollectionRef = collection(db, "gallery");

  // useEffect(() => {
  //   const fetchGalleryData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "gallery"));
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, doc.data());
  //       });
  //     } catch (error) {
  //       console.error("데이터를 불러오는데 실패했습니다.", error);
  //     }
  //   };
  
  //   fetchGalleryData();
  //   console.log("데이터정상적으로 불러옴")
  // }, []);



  // useEffect(() => {
  //   const getGallery = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers([ {...user.data()])

  //   };
  //   getGallery();
  //   console.log("정상적으로 불러왔습니다");
  //   console.log(users);
  // }, []);

  return <div>안녕하세요</div>;
};

export default RecentPost;
