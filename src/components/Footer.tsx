import styled from 'styled-components';
const Footer = () => {
  return (
    <FooterContainer>
      <p>
        © <strong>ToyTeam13</strong>, 2023~ All Rights Reserved.
      </p>
    </FooterContainer>
  );
};
const FooterContainer = styled.div`
  p {
    font-size: 12px;
    color: gray;
    padding: 20px 2.6rem;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    @media screen and (max-width: 700px) {
      padding: 20px 1.1rem;
    }
  }
  strong {
    color: black;
  }
`;
export default Footer;
