import React from 'react';
import { HeaderComponent, TitleAnchor, AnchorContainer, ListAnchor, RightAnchorContainer, ModalButton } from './style';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import CommuteBtn from '../../components/modal/CommuteBtn';

const Header: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const logOutHandler = () => {
        setUserId('');
        navigate('/', { state: pathname });
    };

    return (
        <HeaderComponent>
            <TitleAnchor href="/">wiki for fastcampus</TitleAnchor>
            <AnchorContainer>
                <RightAnchorContainer>
                    <ListAnchor href="/wiki">wiki</ListAnchor>
                    <ListAnchor href="/recruitment">recruitment</ListAnchor>
                    <ListAnchor href="/gallery">gallery</ListAnchor>
                    {userId ? (
                        <button onClick={logOutHandler}>LogOut</button>
                    ) : (
                        <ListAnchor href={'/LogIn'}>LogIn</ListAnchor>
                    )}
                    <ModalButton>
                        <CommuteBtn />
                    </ModalButton>
                </RightAnchorContainer>
            </AnchorContainer>
        </HeaderComponent>
    );
};

export default Header;
