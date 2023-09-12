import React from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';

export default function Btns() {
    return (
        <BtnBox>
            <OnBtn>입실</OnBtn>
            <OffBtn>퇴실</OffBtn>
        </BtnBox>
    );
}
