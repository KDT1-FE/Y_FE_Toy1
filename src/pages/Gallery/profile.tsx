import React, { useState } from 'react';
import { ProfileBox, ProfileContainer } from './style';

const Profile: React.FC = () => {
    const [userImg, setUserImg] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    return (
        <ProfileContainer>
            {userImg.map(function (a, i) {
                return <ProfileBox key={i} src="https://img.icons8.com/color/96/karl-lagerfeld.png" alt="" />;
            })}
        </ProfileContainer>
    );
};

export default Profile;

// Auth 임포트 해서 사용하기
//
// 유저의 UID 배열을 받아서 for문으로 render 한다.
//
