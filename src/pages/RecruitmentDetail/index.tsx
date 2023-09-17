import React, { useState, useEffect } from 'react';
import {
    CommentBtn,
    CommentWrapper,
    ContentContainer,
    ContentHeader,
    ContentHeaderName,
    ContentHeaderValuedTrue,
    ContentSub,
    ContentTitleWrapper,
    ContentWrapper,
    RecruitmentDetailContainer,
} from './style';
import SidebarGallery from '../../components/SidebarGallery';
import { getRecruitmentDetail } from '../../utils/firebase';
import MDEditor from '@uiw/react-md-editor';

const RecruitmentDetail: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };

    const channel = location.pathname.split('/')[2];
    const path = location.pathname.split('/')[3];

    useEffect(() => {
        // 데이터를 비동기로 가져오기 위해 useEffect를 사용합니다.
        getRecruitmentDetail(channel, path)
            .then((result) => {
                // 데이터를 성공적으로 가져온 후에 setData를 사용하여 값을 설정합니다.
                setData(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, [channel, path]);

    console.log(data.comment);

    return (
        <RecruitmentDetailContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
            <ContentContainer>
                <ContentWrapper>
                    <ContentHeader>
                        <ContentHeaderName>{data.name}</ContentHeaderName>
                        <ContentHeaderValuedTrue>{data.recruitValued ? '모집중' : '모집완료'}</ContentHeaderValuedTrue>
                    </ContentHeader>
                    <ContentTitleWrapper>
                        <h2>{data.title}</h2>
                        <p>09/16 12:11</p>
                    </ContentTitleWrapper>
                    <ContentSub>
                        <p>분야 : {data.category}</p>
                        <p>인원 : {data.people}</p>
                    </ContentSub>
                    <MDEditor.Markdown
                        source={data.content}
                        style={{ width: '100%', padding: '20px', backgroundColor: 'white' }}
                    />
                </ContentWrapper>
                <CommentBtn>댓글 쓰기</CommentBtn>
                <CommentWrapper></CommentWrapper>
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
