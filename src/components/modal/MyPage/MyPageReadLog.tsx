import React from 'react';
import { TimelogBoxScroll, TimelogEl, TimelogText } from './style';
import { ReadTimelog } from '../../../utils/recoil';
import { useRecoilState } from 'recoil';
import { CommuteModalBox } from './commuteStyle';

export default function MyPageReadLog() {
    const [readTimelog, setReadTimelog] = useRecoilState(ReadTimelog);

    return (
        <CommuteModalBox>
            <TimelogBoxScroll>
                {readTimelog.length > 0 ? (
                    readTimelog.map((e: string, i) => {
                        e = e.replace('|', '\n');
                        return (
                            <TimelogEl key={i}>
                                <TimelogText>{e}</TimelogText>
                            </TimelogEl>
                        );
                    })
                ) : (
                    <TimelogEl>
                        <TimelogText>현재 저장된 기록이 없습니다.</TimelogText>
                    </TimelogEl>
                )}
            </TimelogBoxScroll>
        </CommuteModalBox>
    );
}
