import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { PostContainer, RecruitmentPostContainer, PostForm, PostBox, PostBtn, PostH, PostTextarea } from './style';
import { createRecruitment } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';
import { getUserData } from '../../utils/firebase';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';

const RecruitmentPost: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [userData, setUserData] = useState<any>({});
    const [peopleValue, setPeopleValue] = useState(1);
    const [categoryViewToggle, setCategoryViewToggle] = useState(false);

    const min = 1;
    const max = 50;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            swal({
                title: '글을 작성하실 수 없습니다.',
                text: '로그인 후 사용해주세요 !',
                icon: 'warning',
                // buttons: true,
                // dangerMode: true,
            });
            navigate('/recruitment');
        }
        getUserData(userId)
            .then((result) => {
                setUserData(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCreateRecruitment = (e: any) => {
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
            swal({
                title: '글을 작성하시겠습니까?',
                text: '작성 후 수정 삭제를 자유롭게 하실 수 있습니다.',
                icon: 'info',
                buttons: ['취소', '작성'],
            }).then((willDelete) => {
                if (willDelete) {
                    swal('글을 성공적으로 작성하였습니다.', {
                        icon: 'success',
                    });

                    // const date = new Date().getTime();
                    // console.log(date);
                    const updated_at_timestamp = serverTimestamp();

                    const value = {
                        uid: userId,
                        name: userData.name,
                        imageURL: userData.imageURL,
                        category: e.target.category.value,
                        title: e.target.title.value,
                        content: e.target.content.value,
                        people: Number(e.target.people.value),
                        recruitValued: true,
                        comment: [],
                        time: updated_at_timestamp,
                        editValued: false,
                        editTime: updated_at_timestamp,
                    };
                    console.log(value);

                    console.log(e.target.recruitmentType.value);
                    createRecruitment(e.target.recruitmentType.value, value);

                    navigate('/recruitment');
                } else {
                    swal('글 작성이 취소되었습니다.');
                }
            });
        } else {
            swal({ title: '빈 공간 없이 입력해주세요', text: '부탁드립니다..', icon: 'warning' });
        }
    };

    const handleCategory = (e: any) => {
        e.preventDefault();
        if (!categoryViewToggle) {
            setCategoryViewToggle(true);
        }
        if (e.target.value == 'study') {
            setCategoryToggle(true);
        } else {
            setCategoryToggle(false);
        }
    };

    return (
        <RecruitmentPostContainer>
            <PostContainer>
                <PostForm action="submit" onSubmit={handleCreateRecruitment}>
                    <PostBox>
                        <PostH>분야</PostH>
                        {categoryViewToggle ? (
                            <Select
                                labelId="bigCategory"
                                name="recruitmentType"
                                onChange={handleCategory}
                                style={{ width: '150px', height: '40px' }}
                                disabled
                            >
                                <InputLabel id="bigCategory">대분류</InputLabel>

                                <MenuItem value="project">프로젝트</MenuItem>
                                <MenuItem value="study">스터디</MenuItem>
                            </Select>
                        ) : (
                            <Select
                                labelId="bigCategory"
                                name="recruitmentType"
                                onChange={handleCategory}
                                style={{ width: '150px', height: '40px' }}
                            >
                                <InputLabel id="bigCategory">대분류</InputLabel>

                                <MenuItem value="project">프로젝트</MenuItem>
                                <MenuItem value="study">스터디</MenuItem>
                            </Select>
                        )}
                        {categoryViewToggle ? (
                            categoryToggle ? (
                                <Select
                                    labelId="category"
                                    name="category"
                                    style={{ marginLeft: '10px', width: '150px', height: '40px' }}
                                >
                                    <InputLabel id="category">분류</InputLabel>
                                    <MenuItem value="코딩테스트">코딩테스트</MenuItem>
                                    <MenuItem value="CS">CS</MenuItem>
                                    <MenuItem value="면접">면접</MenuItem>
                                    <MenuItem value="알고리즘">알고리즘</MenuItem>
                                </Select>
                            ) : (
                                <Select
                                    labelId="category"
                                    name="category"
                                    style={{ marginLeft: '10px', width: '150px', height: '40px' }}
                                >
                                    <InputLabel id="category">분류</InputLabel>
                                    <MenuItem value="토이 프로젝트">토이 프로젝트</MenuItem>
                                    <MenuItem value="연계 프로젝트">연계 프로젝트</MenuItem>
                                </Select>
                            )
                        ) : (
                            ''
                        )}
                    </PostBox>
                    <PostBox>
                        <PostH>모집 인원</PostH>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="number"
                            name="people"
                            placeholder="1"
                            inputProps={{ min, max }}
                            value={peopleValue}
                            onChange={(e) => {
                                let peopleValue = parseInt(e.target.value, 10);

                                if (peopleValue > max) peopleValue = max;
                                if (peopleValue < min) peopleValue = min;

                                setPeopleValue(peopleValue);
                            }}
                            helperText="최대 50명"
                            style={{ width: '150px', marginTop: '10px' }}
                        />
                    </PostBox>
                    <PostBox>
                        <PostH>제목</PostH>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="title"
                            placeholder="글 제목"
                            helperText="제목을 30자 내로 작성해주세요"
                            inputProps={{ maxLength: 20 }}
                            style={{ width: '100%', fontSize: '1.5rem', marginTop: '10px' }}
                        />
                    </PostBox>
                    <PostBox>
                        <PostTextarea name="content" placeholder="내용을 입력해주세요." />
                    </PostBox>

                    <PostBtn type="submit">작성완료</PostBtn>
                </PostForm>
            </PostContainer>
        </RecruitmentPostContainer>
    );
};

export default RecruitmentPost;
