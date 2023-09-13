import styled from 'styled-components';

function NavigationContainer() {
  return <Container></Container>;
}

export const Container = styled.nav`
  width: 12rem;
  height: 56rem;
  background-color: #3584f4;
  margin: 30px 0px 30px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default NavigationContainer;
