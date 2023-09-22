import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { ProjectProps } from './Project';
import EditModal from './EditModal';
import statusIcon from '../../assets/status-icon.svg';
import memberIcon from '../../assets/member-icon.png';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../common/config';
import { useUser } from '../../common/UserContext';

interface ModalProps extends ProjectProps {
  closeOnClick: () => void;
}

const ProjectDetailModal = ({
  state,
  projectId,
  imageUrl,
  name,
  description,
  participants,
  closeOnClick,
}: ModalProps) => {
  const { user } = useUser();
  const [projectInfo, setProjectInfo] = useState<ProjectProps>({
    imageUrl: imageUrl,
    projectId: projectId,
    state: state,
    name: name,
    description: description,
    participants: participants,
  });
  let projectState: string =
    state === 'ongoing'
      ? '진행 중'
      : state === 'scheduled'
      ? '예정'
      : state === 'completed'
      ? '종료'
      : '';

  const [showEditModal, setShowEditModal] = useState(false);

  const showEditModalHandler = () => {
    setShowEditModal(true);
  };

  const participateClickHandler = async () => {
    try {
      if (!user) {
        alert('로그인 후 프로젝트를 생성할 수 있습니다.');
        return;
      }
      if (projectInfo.participants?.includes(user.name)) {
        alert('이미 참여 중인 프로젝트입니다.');
        return;
      }
      const docRef = doc(db, 'projectData', projectInfo.projectId);
      const newParticipants =
        projectInfo.participants?.length > 0
          ? [...projectInfo.participants, user.name]
          : [user.name];
      await setDoc(docRef, { participants: newParticipants });
      alert('프로젝트에 정상적으로 참가되었습니다.');
      window.location.reload();
      closeOnClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!showEditModal && (
        <DetailModalBg onClick={closeOnClick}>
          <DetailModalContainer onClick={(e) => e.stopPropagation()}>
            <XBtnDiv>
              <CloseBtn onClick={closeOnClick} />
            </XBtnDiv>
            <MainDiv>
              <MainLeftDiv>
                <ImageDiv style={{ backgroundImage: `url(${projectInfo.imageUrl})` }}></ImageDiv>
              </MainLeftDiv>
              <MainRightDiv>
                <NameDiv>{name}</NameDiv>
                <StateDiv>
                  <img src={statusIcon} alt="" />
                  {projectState}
                </StateDiv>
                <ParticipantDiv>
                  <img width="24px" height="24px" src={memberIcon} alt="" />
                  <ParticipantRightDiv>
                    {participants?.map((item: any, index: number) => {
                      return <ParticipantBlock key={index}>{item}</ParticipantBlock>;
                    })}
                  </ParticipantRightDiv>
                </ParticipantDiv>
                <DescriptionDiv>{description}</DescriptionDiv>
              </MainRightDiv>
            </MainDiv>
            <ButtonSection>
              <Button onClick={participateClickHandler} style={{ backgroundColor: '#021856' }}>
                프로젝트 참가
              </Button>
              <Button onClick={showEditModalHandler} style={{ backgroundColor: '#3267B1' }}>
                수정하기
              </Button>
            </ButtonSection>
          </DetailModalContainer>
        </DetailModalBg>
      )}
      {showEditModal && (
        <EditModal
          imageUrl={imageUrl}
          projectId={projectId}
          state={state}
          name={name}
          description={description}
          participants={participants}
          closeOnClick={() => setShowEditModal(false)}
        ></EditModal>
      )}
    </>
  );
};

export default ProjectDetailModal;

const DetailModalBg = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DetailModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 582px;
  padding: 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 400px;
    height: 70vh;
    overflow: scroll;
    padding: 20px;
  }
`;

export const XBtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CloseBtn = styled(AiOutlineClose)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MainDiv = styled.div`
  display: flex;
  height: 420px;
  margin-bottom: 64px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 64px;
    gap: 20px;
  }
`;

const MainLeftDiv = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
const ImageDiv = styled.div`
  flex-shrink: 0;
  width: 240px;
  height: 240px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 0.1px solid #9d9c9c30;
`;

const MainRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
`;
const NameDiv = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: #0b0b0b;
`;
const StateDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;
const ParticipantDiv = styled.div`
  display: flex;
  gap: 7px;
  width: 273px;
  margin-bottom: 18px;
`;
const ParticipantRightDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 7px;
`;
const ParticipantBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 4px;
  color: white;
  width: 55px;
  height: 24px;
  font-size: 14px;
  font-weight: 500;
`;
const DescriptionDiv = styled.div`
  color: #0b0b0b;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.6;
  max-height: 108px;
  overflow: scroll;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR';
  width: 240px;
  cursor: pointer;
  height: 47px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgb(252, 252, 252);
  text-align: center;
  line-height: 47px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
