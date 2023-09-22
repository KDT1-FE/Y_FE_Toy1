import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TEAM3 } from "../../constant/main";

const MainTeam = () => {
  const [selectedId, setSelectedId] = useState<string | null>();
  const [member, setMember] = useState(TEAM3[0]);

  return (
    <MainSect>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={20} xl={18}>
          <div className="title">
            <h2>💪 이정도면 껌이조! 우리 팀을 소개 합니다. </h2>
            <p>멤버를 클릭하시면 더 상세한 정보를 볼 수 있습니다.</p>
          </div>
          <MainWrapper>
            {TEAM3.map((item, index) => (
              <motion.div
                className="team-member"
                key={item.id}
                layoutId={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setMember(TEAM3[index]);
                }}
              >
                <motion.div className="profile-img-wrap">
                  <img src={item.profile} alt={item.name} />
                </motion.div>
                <motion.h2>
                  {item.name} / {item.mbti}
                </motion.h2>
                <motion.h3>{item.part}</motion.h3>
              </motion.div>
            ))}
          </MainWrapper>
          <AnimatePresence>
            {selectedId && (
              <MainTeamModalWrapper>
                <motion.div layoutId={selectedId} className="team-member">
                  <motion.div className="profile-img-wrap">
                    <img src={member.profile} alt={member.name} />
                  </motion.div>
                  <div className="team-member-desc">
                    <motion.h2>
                      {member.name} / {member.mbti}
                    </motion.h2>
                    <motion.h3>{member.part}</motion.h3>
                    <motion.h4>{member.desc}</motion.h4>
                    <Button onClick={() => setSelectedId(null)}>닫기</Button>
                  </div>
                </motion.div>
              </MainTeamModalWrapper>
            )}
          </AnimatePresence>
        </Col>
      </Row>
    </MainSect>
  );
};

export default MainTeam;

export const MainSect = styled.section`
  padding: 60px 0 0 0;
  position: relative;
`;

export const MainWrapper = styled.div`
  display: flex;
  gap: 16px;
  .team-member {
    flex: 1;
    background-color: #fff;
    .profile-img-wrap {
      height: 240px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const MainTeamModalWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 90px;
  width: 100%;
  max-width: 600px;
  z-index: 2;
  transform: translateX(-50%);
  .team-member {
    box-shadow: 3px 5px 20px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    padding: 10px;
    height: calc(100% - 20px);
    background-color: #fff;
    display: flex;
  }
  .profile-img-wrap {
    overflow: hidden;
    border-radius: 8px;
    width: 280px;
    height: 280px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .team-member-desc {
    padding-left: 20px;
  }
`;
