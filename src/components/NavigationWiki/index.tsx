import styled from 'styled-components';
import NavigationContainer from 'components/NavigationContainer';
function NavigationWiki() {

  const initialCompanyInfo = [
    { id: 1, text: '회사 내규', pathName: 'companyRule'},
    { id: 2, text: '팀 소개', pathName: 'companyTeam'},
    { id: 3, text: '조직도', pathName: 'companyOrganization'},
  ]

  const initialProjectInfo = [
    { id: 1, text: '진행중인 프로젝트', pathName: 'projects'},
    { id: 2, text: '예정된 프로젝트', pathName: 'projectsExpected'},
    { id: 3, text: '완료된 프로젝트', pathName: 'projectsFinished'},
  ]

  const initialOnBoardingInfo = [
    { id: 1, text: '신입사원 필독서', pathName: 'onBoardingDocs'},
    { id: 2, text: '온보딩 주제', pathName: 'onBoardingSubjects'}
  ]

  return (
    <Container>
      <NavigationContainer>

      </NavigationContainer>
      <h1>test</h1>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
`;

export default NavigationWiki;

