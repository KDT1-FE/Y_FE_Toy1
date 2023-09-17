import React from 'react';
import { MyPageProfile, ProfileContent, ProfileEdit, ProfileImg, ProfileIntroduce } from './style';

export default function MyPageUser() {
    const imgSrc =
        'https://firebasestorage.googleapis.com/v0/b/wiki-for-fastcampus.appspot.com/o/images%2Fson.jpeg?alt=media&token=f343cb1b-a335-40a9-8f68-f25662f68a40';

    return (
        <MyPageProfile>
            <ProfileImg src={imgSrc}></ProfileImg>
            <ProfileContent>
                <span>백상원</span>
                <ProfileEdit>편집</ProfileEdit>
            </ProfileContent>
            <ProfileContent>rnffjt@gmail.com</ProfileContent>
            <ProfileIntroduce>
                <p>안녕하세요 백상원입니다.</p>
            </ProfileIntroduce>
        </MyPageProfile>
    );
}
