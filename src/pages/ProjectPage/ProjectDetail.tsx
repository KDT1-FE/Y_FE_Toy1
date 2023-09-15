// src/ProjectDetail.tsx

import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { team, id } = useParams<{ team: string; id: string }>();

  // team과 id를 사용하여 프로젝트 세부 정보를 가져올 수 있습니다.
  // 이 부분은 실제로 데이터를 가져오는 로직으로 대체되어야 합니다.

  return (
    <div>
      <h1>프로젝트 세부 정보</h1>
      <p>팀: {team}</p>
      <p>프로젝트 ID: {id}</p>
      {/* 프로젝트의 기타 세부 정보 표시 */}
      <h2>데이터 분석을 위한 프로젝트</h2>
      <div>content</div>
      <div>
        <button>수정</button>
      </div>
      <div>
        <button>삭제</button>
      </div>
      <div>
        <button>목록으로</button>
      </div>
    </div>
  );
};

export default ProjectDetail;
