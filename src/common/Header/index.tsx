import React from 'react';
import { 
  HeaderComponent, 
  TitleAnchor, 
  AnchorContainer,
  ListAnchor, 
  RightAnchorContainer,
  ModalButton
} from './style';

const Header:React.FC = () => {
  return (
    <HeaderComponent>
      <TitleAnchor href="/">wiki for fastcampus</TitleAnchor>
      <AnchorContainer>
      <RightAnchorContainer>
        <ListAnchor href="/wiki">wiki</ListAnchor>
        <ListAnchor href="/gallery">gallery</ListAnchor>
        <ModalButton>commute</ModalButton>
      </RightAnchorContainer>
      </AnchorContainer>
      
    </HeaderComponent>
  );
}

export default Header