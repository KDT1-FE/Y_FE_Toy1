import styled from 'styled-components';
import NavigationContainer from 'components/NavigationContainer';
function NavigationWiki() {
  return (
    <Container>
      <NavigationContainer></NavigationContainer>
      <h1>test</h1>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
`;

export default NavigationWiki;

