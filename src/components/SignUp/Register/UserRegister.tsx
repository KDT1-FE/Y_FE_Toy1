import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// firebase
import { collection, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../../../libs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// style
import { styled } from "styled-components";
import { Button, Input, Select, Upload } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import swal from "sweetalert";
import { motion } from "framer-motion";
// state 및 data
import { useRecoilState } from "recoil";
import { Team, teamState } from "../../../store/sign";
import { SELECT_OPTIONS } from "../../../constant/member";
// custom hooks
import { userRegister } from "../../../hooks/SignIn/userRegister";
import { SlideCounter, Dot, ActiveDot } from "../Pagination";
import { useNavigation } from "../../../hooks/SignIn/useNavigation";
import { MainTitle } from "../Title";
import { Logo } from "./StartRegister";

// 부서 가져오기
const departmentKey = Object.keys(SELECT_OPTIONS.department);
const positionKey = Object.keys(SELECT_OPTIONS.position);

// Teams 컬렉션에서 팀 가져오기
async function getTeams() {
  const teamRef = collection(db, "Teams");
  const querySnapshot = await getDocs(teamRef);
  const teams: Team[] = [];
  querySnapshot.forEach((doc) => {
    teams.push({ id: doc.id, ...doc.data() } as Team);
  });
  return teams;
}
export default function UserRegister() {
  const {
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
  } = userRegister();

  // 선택한 팀 저장할 값
  const [teamOptions, setTeamOptions] = useRecoilState(teamState);
  const { moveStartRegister } = useNavigation();
  useEffect(() => {
    async function fetchTeams() {
      const teams = await getTeams();
      setTeamOptions(teams);
    }
    fetchTeams();
  }, []);

  // upload 컴포넌트 props 값 => 이미지 업로드
  const props: UploadProps = {
    name: "file",
    customRequest: async ({ file }) => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userUid = user.uid;
          const uploadFile = file as File;
          const storageRef = ref(
            storage,
            `images/${userUid}/${uploadFile.name}`,
          );
          const snapshot = await uploadBytes(storageRef, uploadFile);
          swal("사진 업로드 완료");
          const downloadURL: string | undefined =
            await getDownloadURL(storageRef);
          setInput((prevInput) => ({
            ...prevInput,
            photo: downloadURL,
          }));
        } else {
          console.error("로그아웃 상태");
          swal("Fail", "로그인부터 해주세요!", "error");
        }
      } catch (error) {
        console.error("업로드 오류: ", error);
      }
    },
    showUploadList: false,
  };

  // 내 정보 수정시 기존 유저 정보 보이게 하기
  useEffect(() => {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setInput((prevInput) => ({
        ...prevInput,
        ...userData.newUser,
      }));
      setSelectedPart(userData.newUser.department);
      setSelectedTeam(userData.newUser.team);
      setSelectedPosition(userData.newUser.position);
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/">
        <Logo src="/fe3-wiki-logo.png"></Logo>
      </Link>
      <Container>
        <MainTitle>회원님의 정보를 입력해주세요!</MainTitle>
        <UserInfoContainer>
          <UserNameCategory>
            <span>이름</span>
            <Input
              name="name"
              style={{ width: "320px" }}
              placeholder="사용하실 이름을 입력해주세요"
              onChange={handleInputChange}
              value={input.name}
            />
          </UserNameCategory>
          <UserEmailCategory>
            <span>이메일</span>
            <Input
              name="email"
              style={{ width: "320px" }}
              placeholder="이메일을 입력해주세요"
              onChange={handleInputChange}
              value={input.email}
            />
          </UserEmailCategory>
          <UserPhoneCategory>
            <span>휴대폰 번호</span>
            <Input
              name="phone"
              style={{ width: "320px" }}
              placeholder="휴대폰 번호를 입력해주세요"
              onChange={handleInputChange}
              value={input.phone}
            />
          </UserPhoneCategory>
          <UserDepartmentCategory>
            <span>소속 부서</span>
            <Select
              showSearch
              style={{ width: 320 }}
              placeholder="소속 부서를 골라주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={departmentKey.map((key) => ({
                label: key,
                value:
                  SELECT_OPTIONS.department[
                    key as keyof typeof SELECT_OPTIONS.department
                  ],
              }))}
              onChange={handleSelectChange("part")}
              value={selectedPart}
            />
          </UserDepartmentCategory>
          <UserTeamCategory>
            <span>소속 팀</span>
            <Select
              showSearch
              style={{ width: 320 }}
              placeholder="소속팀을 골라주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={teamOptions.map((team) => ({
                value: team.teamName,
                label: team.teamName,
              }))}
              onChange={handleSelectChange("team")}
              value={selectedTeam}
            />
          </UserTeamCategory>
          <UserPositionCategory>
            <span>직급</span>
            <Select
              showSearch
              style={{ width: 320 }}
              placeholder="직급을 골라주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={positionKey.map((key) => ({
                label: key,
                value:
                  SELECT_OPTIONS.position[
                    key as keyof typeof SELECT_OPTIONS.position
                  ],
              }))}
              onChange={handleSelectChange("position")}
              value={selectedPosition}
            />
          </UserPositionCategory>
          <UserImageCategory>
            <span>프로필 사진</span>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>프로필 사진 업로드</Button>
            </Upload>
          </UserImageCategory>
          <BtnContainer>
            <BackBtn onClick={moveStartRegister}>
              <ArrowLeftOutlined />
            </BackBtn>
            <SubmitBtn onClick={handleUpload}>완료</SubmitBtn>
          </BtnContainer>
        </UserInfoContainer>
        <SlideCounter>
          <Dot />
          <ActiveDot />
          <Dot />
        </SlideCounter>
      </Container>
    </motion.div>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
`;
const UserInfoContainer = styled.div`
  border: none;
  border-radius: 20px;
  box-shadow: 3px 4px 16px rgba(0, 0, 0, 0.15);
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  span {
    font-weight: 500;
  }
`;
const UserNameCategory = styled.div`
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
`;
const UserEmailCategory = styled(UserNameCategory)``;
const UserPhoneCategory = styled(UserNameCategory)``;
const UserTeamCategory = styled(UserNameCategory)``;
const UserPositionCategory = styled(UserNameCategory)``;
const UserImageCategory = styled(UserNameCategory)``;
const UserDepartmentCategory = styled(UserNameCategory)``;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
  height: 30px;
`;
const BackBtn = styled.button`
  border: none;
  width: 60px;
  background-color: #6c63ff;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    background-color: #000;
    color: #fff;
    transform: translateX(-5px);
  }
`;
const SubmitBtn = styled.button`
  border: none;
  width: 240px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  background-color: #6c63ff;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
