import styled from 'styled-components';
import NavigationContainer from 'components/NavigationContainer';
import { useNavigate } from 'react-router-dom';

function NavigationWiki() {
  const navigate = useNavigate()

  const initialCompanyInfo = [
    { id: 1, text: '회사 내규', pathName: 'companyRule' },
    { id: 2, text: '팀 소개', pathName: 'companyTeam' },
    { id: 3, text: '조직도', pathName: 'companyOrganization' },
  ];
  
  const initialProjectInfo = [
    { id: 1, text: '진행중인 프로젝트', pathName: 'projects' },
    { id: 2, text: '예정된 프로젝트', pathName: 'projectsExpected' },
    { id: 3, text: '완료된 프로젝트', pathName: 'projectsFinished' },
  ];

  const initialOnBoardingInfo = [
    { id: 1, text: '신입사원 필독서', pathName: 'onBoardingDocs' },
    { id: 2, text: '온보딩 문서', pathName: 'onBoardingSubjects' },
  ];

  const companyList = initialCompanyInfo.map((company) => (
    <li key={company.id} onClick={() => {
      navigate(`/wiki?category=${company.pathName}`)
    }}>{company.text}</li>
  ))

  const projectList = initialProjectInfo.map((project) => (
    <li key={project.id} onClick={() => {
      navigate(`/wiki?category=${project.pathName}`)
    }}>{project.text}</li>
  ))

  const onBoardingList = initialOnBoardingInfo.map((onBoarding) => (
    <li key={onBoarding.id} onClick={() => {
      navigate(`/wiki?category=${onBoarding.pathName}`)
    }}>{onBoarding.text}</li>
  ))


  return (
    <NavigationContainer>
      <CategoryContainer>        
        <CategoryUl>
          <h1>회사생활</h1>
          {companyList}
        </CategoryUl>
        <CategoryUl>
          <h1>프로젝트</h1>
          {projectList}
        </CategoryUl>
        <CategoryUl>
          <h1>온보딩</h1>
          {onBoardingList}
        </CategoryUl>
      </CategoryContainer>
    </NavigationContainer>
  )
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryUl = styled.ul`
  padding: 0;
  color: white;
  margin-top: 2rem;

  li {
    list-style: none;
    margin: 1rem 0 1rem 1rem;
    cursor: default;
  }

  li:hover {
    cursor: pointer;
  }
`;

export default NavigationWiki;

