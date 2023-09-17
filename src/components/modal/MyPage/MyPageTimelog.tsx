import React from 'react';
import { MarginLeftContents, MyPageContents, RedCircle } from './style';

export default function MyPageTimelog() {
    return (
        <MyPageContents>
            <MarginLeftContents>입/퇴실 기록</MarginLeftContents>
            <RedCircle>·</RedCircle>
        </MyPageContents>
    );
}
