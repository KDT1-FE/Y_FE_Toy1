import React, { useEffect, useState } from 'react';
import { MarginLeftContents, MyPageContents, TimelogBox, TimelogBoxScroll, TimelogEl } from './style';
import { readUser } from '../../../utils/firebase';
import { UserId } from '../../../utils/recoil';
import { useRecoilState } from 'recoil';

export default function MyPageAuthor() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [timelogData, setTimelogData] = useState([]);
    useEffect(() => {
        async function getTimelog() {
            try {
                const userData = await readUser('user', userId);
                if (userData) {
                    const timelog = userData['timelog'].reverse();
                    setTimelogData(timelog);
                }
            } catch {
                console.log('error');
            }
        }
        getTimelog();
    }, []);
    return (
        <MyPageContents>
            {/* <TimelogBox>
                <TimelogBoxScroll>
                    {timelogData.map((e: string, i) => (
                        <TimelogEl key={i}>
                            <div
                                style={{
                                    height: '100px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {e}
                            </div>
                        </TimelogEl>
                    ))}
                </TimelogBoxScroll>
            </TimelogBox> */}
        </MyPageContents>
    );
}
