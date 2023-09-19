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

    const [lastIndex, setLastIndex] = useState(0);

    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearching(true);
        } else {
            setSearching(false);
            setLastIndex(recruitmentData.length - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let updatedChannel = channel;
                if (subChannel === '') {
                    updatedChannel = 'study';
                }
                const { docSnapshots } = await showRecruitmentFields(
                    'recruitmentContainer',
                    'recruitment',
                    updatedChannel,
                );
                const subChannelFields =
                    subChannel === 'all' || subChannel === ''
                        ? docSnapshots.map((item) => ({ id: item.id, data: item.data }))
                        : docSnapshots
                              .filter((item) => item.data.category === subChannel)
                              .map((item) => ({ id: item.id, data: item.data }));

                setRecruitmentData(subChannelFields);
                setLastIndex(subChannelFields.length - 1);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };

        fetchData();
    }, [channel, subChannel]);

    useEffect(() => {
        if (searching) {
            const filtered = recruitmentData.filter(
                (item) => item?.data?.title?.toLowerCase().includes(searchTitle.toLowerCase()),
            );
            setFilteredData(filtered);
            setLastIndex(filtered.length - 1);
        } else {
            setFilteredData([]);
        }
    }, [searching, searchTitle]);

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
                        ? filteredData.map((data, index) => (
                              <Post
                                  key={index}
                                  data={data.data}
                                  id={data.id}
                                  index={index}
                                  lastIndex={lastIndex}
                                  channel={channel}
                              />
                          ))
                        : recruitmentData.map((data, index) => (
                              <Post
                                  key={index}
                                  data={data.data}
                                  id={data.id}
                                  index={index}
                                  lastIndex={lastIndex}
                                  channel={channel}
                              />
                          ))}
                </PostsWrapper>
            </PostsContainer>
        </RecruitmentContainer>
    );
};

const Post: React.FC<{ data: any; id: string; index: number; lastIndex: number; channel: string }> = ({
    data,
    id,
    index,
    lastIndex,
    channel,
}) => (
    <Link to={`/recruitment/${channel}/${id}`}>
        {/* ex) /recruitment/study/SD521S3SF3EB3H5 */}
        <PostWrapper
            key={index}
            style={{
                borderTop: index >= 1 ? '1px solid #BEBEBE' : 'none',
                borderTopLeftRadius: index === 0 ? '15px' : '0',
                borderTopRightRadius: index === 0 ? '15px' : '0',
                borderBottomLeftRadius: index === lastIndex ? '15px' : '0',
                borderBottomRightRadius: index === lastIndex ? '15px' : '0',
            }}
        >
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
