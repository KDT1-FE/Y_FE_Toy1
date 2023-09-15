import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from 'constants/routes';

function Wiki() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategory = searchParams.get('category')

  return (
    <WikiContainer>
      <NavigationWiki></NavigationWiki>
      <div>
        <h1>아직 작성된 글이 없습니다.</h1>
        <Link to={`${ROUTES.WIKICREATE}?category=${selectedCategory === null ? 'companyRule' : selectedCategory}`}>글 작성하기</Link>
      </div>
    </WikiContainer>
  )
}

const WikiContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr
`;

export default Wiki;