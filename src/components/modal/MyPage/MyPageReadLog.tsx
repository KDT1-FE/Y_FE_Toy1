import React from 'react';
import { TimelogBox, TimelogBoxScroll, TimelogEl, TimelogText } from './style';
import { ReadTimelog } from '../../../utils/recoil';
import { useRecoilState } from 'recoil';

export default function MyPageReadLog() {
    const [readTimelog, setReadTimelog] = useRecoilState(ReadTimelog);

    return (
        <TimelogBox>
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
        </TimelogBox>
    );
}
