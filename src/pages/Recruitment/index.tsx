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

    const [recruitmentData, setRecruitmentData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const postsPerPage = 2;

    const fetchData = async () => {
        try {
            setLoading(true);
            const { docSnapshots } = await showRecruitmentFields('recruitmentContainer', 'recruitment', channel);
            const newRecruitmentData =
                subChannel === 'all'
                    ? docSnapshots.map((item) => ({ id: item.id, data: item.data }))
                    : docSnapshots
                          .filter((item) => item.data.category === subChannel)
                          .map((item) => ({ id: item.id, data: item.data }));

            if (newRecruitmentData.length === 0) {
                setHasMore(false);
            } else {
                setRecruitmentData((prevData) => [...prevData, ...newRecruitmentData]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= scrollHeight - 100 && !loading && hasMore) {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [channel, subChannel]);

    useEffect(() => {
        if (searching) {
            const filtered = recruitmentData.filter((data) =>
                data.title.toLowerCase().includes(searchTitle.toLowerCase()),
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [searching, searchTitle, recruitmentData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

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
                    ></SearchInput>
                </PostNav>
                <PostsWrapper>
                    {searching
                        ? filteredData.map((data, index) => (
                              <Post key={index} data={data.data} id={data.id} index={index} channel={channel} />
                          ))
                        : recruitmentData
                              .slice(0, page * postsPerPage)
                              .map((data, index) => (
                                  <Post key={index} data={data.data} id={data.id} index={index} channel={channel} />
                              ))}
                </PostsWrapper>
                {loading && <div>Loading...</div>}
            </PostsContainer>
        </RecruitmentContainer>
    );
};

const Post: React.FC<{ data: any; id: string; index: number; channel: string }> = ({ data, id, index, channel }) => (
    <Link to={`/recruitment/${channel}/${id}`}>
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
