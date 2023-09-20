import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { PostContainer, RecruitmentPostContainer, PostForm, PostBox, PostBtn, PostH, PostTextarea } from './style';
import { updateRecruitment } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { RecruitmentData } from '../../utils/recoil';

const RecruitmentEdit: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [recruitmentData, setRecruitmentData] = useRecoilState<any>(RecruitmentData);

    const [categoryToggle, setCategoryToggle] = useState(true);
    const [peopleValue, setPeopleValue] = useState(recruitmentData.people);
    const min = 1;
    const max = 50;

    const navigate = useNavigate();

    const channel = location.pathname.split('/')[3];
    const path = location.pathname.split('/')[4];

    useEffect(() => {
        if (recruitmentData.uid != userId) {
            navigate('/recruitment');
        }

        if (channel == 'project') {
            setCategoryToggle(false);
        }
    }, [channel, path]);

    console.log(recruitmentData);

    const handleUpdateRecruitment = (e: any) => {
        e.preventDefault();

        if (
            e.target &&
            e.target.content &&
            e.target.content.value &&
            e.target.category &&
            e.target.category.value &&
            e.target.title &&
            e.target.title.value &&
            e.target.people &&
            e.target.people.value &&
            e.target.recruitmentType &&
            e.target.recruitmentType.value
        ) {
            // const date = new Date().getTime();
            // console.log(date);
            const updated_at_timestamp = serverTimestamp();

            const value = {
                uid: userId,
                category: e.target.category.value,
                title: e.target.title.value,
                content: e.target.content.value,
                people: Number(e.target.people.value),
                recruitValued: true,
                comment: recruitmentData.comment,
                time: recruitmentData.time,
                name: recruitmentData.name,
                imageURL: recruitmentData.imageURL,
                editValued: true,
                editTime: updated_at_timestamp,
            };

            updateRecruitment(channel, path, value);
            navigate('/recruitment/' + channel + '/' + path);
        }
    };

    const handleCategory = (e: any) => {
        e.preventDefault();

        if (e.target.value == 'study') {
            setCategoryToggle(true);
        } else {
            setCategoryToggle(false);
        }
    };

    return (
        <RecruitmentPostContainer>
            <PostContainer>
                <PostForm action="submit" onSubmit={handleUpdateRecruitment}>
                    <PostBox>
                        <PostH>분야</PostH>
                        <Select
                            defaultValue={recruitmentData.channel}
                            labelId="bigCategory"
                            name="recruitmentType"
                            onChange={handleCategory}
                            style={{ width: '150px', height: '40px' }}
                            disabled
                        >
                            <InputLabel id="bigCategory">대분류</InputLabel>

                            <MenuItem value="project">프로젝트</MenuItem>
                            <MenuItem value="study" selected>
                                스터디
                            </MenuItem>
                        </Select>

                        {categoryToggle ? (
                            <Select
                                labelId="category"
                                name="category"
                                defaultValue={recruitmentData.category}
                                style={{ marginLeft: '10px', width: '150px', height: '40px' }}
                            >
                                <InputLabel id="category">분류</InputLabel>
                                <MenuItem value="코딩테스트" selected>
                                    코딩테스트
                                </MenuItem>
                                <MenuItem value="CS">CS</MenuItem>
                                <MenuItem value="면접">면접</MenuItem>
                                <MenuItem value="알고리즘">알고리즘</MenuItem>
                            </Select>
                        ) : (
                            <Select
                                labelId="category"
                                name="category"
                                defaultValue={recruitmentData.category}
                                style={{ marginLeft: '10px', width: '150px', height: '40px' }}
                            >
                                <InputLabel id="category">분류</InputLabel>
                                <MenuItem value="토이프로젝트">토이프로젝트</MenuItem>
                                <MenuItem value="연계프로젝트">연계프로젝트</MenuItem>
                            </Select>
                        )}
                    </PostBox>
                    <PostBox>
                        <PostH>모집 인원</PostH>
                        <TextField
                            defaultValue={recruitmentData.people}
                            id="standard-basic"
                            variant="standard"
                            type="number"
                            name="people"
                            inputProps={{ min, max }}
                            value={peopleValue}
                            onChange={(e) => {
                                let peopleValue = parseInt(e.target.value, 10);

                                if (peopleValue > max) peopleValue = max;
                                if (peopleValue < min) peopleValue = min;

                                setPeopleValue(peopleValue);
                            }}
                            style={{ width: '150px' }}
                        />
                    </PostBox>
                    <PostBox>
                        <PostH>제목</PostH>
                        <TextField
                            defaultValue={recruitmentData.title}
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="title"
                            style={{ width: '100%', fontSize: '1.5rem' }}
                        />
                    </PostBox>
                    <PostBox>
                        <PostTextarea
                            name="content"
                            placeholder="내용을 입력해주세요."
                            style={{ width: '100%' }}
                            defaultValue={recruitmentData.content}
                        />
                    </PostBox>

                    <PostBtn type="submit">수정완료</PostBtn>
                </PostForm>
            </PostContainer>
        </RecruitmentPostContainer>
    );
};

export default RecruitmentEdit;
