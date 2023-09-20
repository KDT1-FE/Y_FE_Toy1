import styled from 'styled-components';
import { media } from 'styles/media';

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
  ${media.tablet_680(`
    height: 38rem;
`)}
  ${media.mobile(`
    width: 10rem;
  `)}
  ${media.mobile_430(`
    height: 30rem;
  `)}
`;

export default NavigationContainer;
