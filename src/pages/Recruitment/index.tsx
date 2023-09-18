import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { channelState, subChannelState } from '../../utils/recoil';
import { Link } from 'react-router-dom';
import {
    RecruitmentContainer,
    PostsContainer,
    PostNav,
    PostButton,
    SearchInput,
    PostsWrapper,
    PostWrapper,
    Category,
    RecruitValued,
    Title,
    Time,
    People,
} from './style';
import SidebarRecruitment from '../../components/SidebarRecruitment';
import { showRecruitmentFields } from '../../utils/firebase';

const Recruitment: React.FC = () => {
    const channel = useRecoilValue(channelState);
    const subChannel = useRecoilValue(subChannelState);
    console.log('channel', channel);
    console.log('subChannel', subChannel);

    const [recruitmentData, setRecruitmentData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searching, setSearching] = useState(false);

    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearching(true);
        } else {
            setSearching(false);
        }
    };

    useEffect(() => {
        if (searching) {
            const filtered = recruitmentData.filter((data) =>
                data.title.toLowerCase().includes(searchTitle.toLowerCase()),
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [searching]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showRecruitmentFields('recruitmentContainer', 'recruitment', channel);
                const filteredData = subChannel === 'all' ? data : data.filter((item) => item.category === subChannel);

                setRecruitmentData(filteredData);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };

        fetchData();
    }, [channel, subChannel]);

    return (
        <RecruitmentContainer>
            <SidebarRecruitment />
            <PostsContainer>
                <PostNav>
                    <Link to="/">
                        <PostButton>게시글 작성</PostButton>
                    </Link>

                    <SearchInput
                        placeholder="찾으시는 모임이 있나요?"
                        value={searchTitle}
                        onChange={(event) => setSearchTitle(event.target.value)}
                        onKeyDown={handleEnterKey}
                    ></SearchInput>
                </PostNav>
                <PostsWrapper>
                    {searching
                        ? filteredData.map((data, index) => <Post data={data} index={index} />)
                        : recruitmentData.map((data, index) => <Post data={data} index={index} />)}
                </PostsWrapper>
            </PostsContainer>
        </RecruitmentContainer>
    );
};

const Post: React.FC<{ data: any; index: number }> = ({ data, index }) => (
    <Link to="/">
        <PostWrapper key={index} style={index >= 1 ? { borderTop: '1px solid #BEBEBE' } : {}}>
            <div style={{ display: 'flex' }}>
                <RecruitValued isRecruitCompleted={!data.recruitValued}>
                    {data.recruitValued ? '모집중' : '모집완료'}
                </RecruitValued>
                <People>{data.people}명</People>
                <Category>{data.category}</Category>
            </div>
            <Title>{data.title}</Title>
            <div style={{ display: 'flex' }}>
                <Time>{new Date(data.time.toMillis()).toLocaleString()}</Time>
            </div>
        </PostWrapper>
    </Link>
);

export default Recruitment;
