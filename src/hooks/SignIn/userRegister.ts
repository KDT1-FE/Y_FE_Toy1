import React, { useRef } from "react";
// firebase
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../libs/firebase";
// state
import {
  selectedPartState,
  selectedPoState,
  selectedTeamState,
  userInfo,
} from "../../store/sign";
import { useRecoilState } from "recoil";
// style
import swal from "sweetalert";
// custom hooks
import { useNavigation } from "./useNavigation";

export const userRegister = () => {
  const { moveEndRegister } = useNavigation();
  const user = auth.currentUser;
  // const [teamOptions, setTeamOptions] = useRecoilState(teamState);
  const [selectedPart, setSelectedPart] = useRecoilState(selectedPartState);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamState);
  const [selectedPosition, setSelectedPosition] =
    useRecoilState(selectedPoState);
  const [input, setInput] = useRecoilState(userInfo);
  // 기존 부서 저장
  const prevPartmentRef = useRef<string | undefined>(undefined);
  const prevTeamRef = useRef<string | undefined>(selectedTeam);
  // 부서 , 팀 , 직급 선택 시 값 저장
  const handleSelectChange = (field: string) => (value: string | undefined) => {
    switch (field) {
      case "part":
        prevPartmentRef.current = selectedPart;
        setSelectedPart(value);
        break;
      case "team":
        prevTeamRef.current = selectedTeam;
        setSelectedTeam(value);
        break;
      case "position":
        setSelectedPosition(value);
        {
          const access = value === "Manager" ? "admin" : "member";
          setInput((prevInput) => ({
            ...prevInput,
            access: access,
          }));
        }
        break;
      default:
        break;
    }
  };
  // 유저 입력 값 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "phone":
        setInput((prevInput) => {
          const phone = value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
          return {
            ...prevInput,
            phone,
          };
        });
        break;
      case "department":
        setSelectedPart(value);
        break;
      case "team":
        setSelectedTeam(value);
        break;
      case "position":
        setSelectedPosition(value);
        break;
      default:
        setInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
        break;
    }
  };
  // firebase 업로드
  const handleUpload = async () => {
    try {
      if (user) {
        const userUid = user.uid;
        const userDB = doc(db, "Users", userUid);
        const newUser = {
          name: input.name,
          email: input.email,
          phone: input.phone,
          department: selectedPart,
          team: selectedTeam,
          position: selectedPosition,
          access: input.access,
          photo: input.photo,
        };
        // 기존 업로드 된 유저 정보 삭제
        const prevTeamName = prevTeamRef.current;
        console.log(prevTeamName);
        console.log(selectedTeam);
        if (prevTeamName !== selectedTeam) {
          if (prevTeamName) {
            const prevTeamQuery = query(
              collection(db, "Teams"),
              where("teamName", "==", prevTeamName),
            );
            const prevTeamQuerySnapshot = await getDocs(prevTeamQuery);
            if (!prevTeamQuerySnapshot.empty) {
              const prevTeamDoc = prevTeamQuerySnapshot.docs[0];
              const prevTeamData = prevTeamDoc.data();
              const updatedUserId = (prevTeamData.userId || []).filter(
                (userId: string) => userId !== userUid,
              );
              await updateDoc(prevTeamDoc.ref, {
                userId: updatedUserId,
              });
              // moveEndRegister();
            }
          }
        }
        await setDoc(userDB, newUser);
        // Teams 컬렉션에 선택한 팀에 맞게 유저 정보 업로드
        const teamDB = collection(db, "Teams");
        const q = query(teamDB, where("teamName", "==", selectedTeam));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const teamDoc = querySnapshot.docs[0];
          const teamData = teamDoc.data();
          const updatedUserId = [...(teamData.userId || []), userUid];
          await updateDoc(teamDoc.ref, {
            userId: updatedUserId,
          });
        } else {
          // 팀이 없으면 새로 생성
          const teamData = {
            department: selectedPart,
            teamName: selectedTeam,
            userId: [userUid],
          };
          await addDoc(teamDB, teamData);
        }
        // 업로드 한 정보 localStorage 저장
        const userData = {
          newUser: newUser,
          userUid: userUid,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        swal("Success", "업로드 성공", "success").then(() => {
          moveEndRegister();
        });
      } else {
        console.error("로그아웃 상태");
        swal("Warning", "로그아웃 상태입니다!", "warning");
      }
    } catch (error) {
      console.error("Error: ", error);
      swal("Error", "업로드 실패", "error");
    }
  };
  return {
    selectedPart,
    setSelectedPart,
    selectedTeam,
    setSelectedTeam,
    selectedPosition,
    input,
    setInput,
    setSelectedPosition,
    handleInputChange,
    handleSelectChange,
    handleUpload,
  };
};
