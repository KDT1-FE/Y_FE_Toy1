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
    PostPageBtnWrapper,
    PostPageBtn,
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

    const [postStartIndex, setPostStartIndex] = useState(0);

    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearching(true);
            setPostStartIndex(0);
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
                    subChannel === '전체' || subChannel === ''
                        ? docSnapshots.map((item) => ({ id: item.id, data: item.data }))
                        : docSnapshots
                              .filter((item) => item.data.category === subChannel)
                              .map((item) => ({ id: item.id, data: item.data }));

                setRecruitmentData(subChannelFields);
                setLastIndex(subChannelFields.length - 1);
                setSearchTitle('');
                setPostStartIndex(0);
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
            setPostStartIndex(0);
        } else {
            setFilteredData([]);
        }
    }, [searching, searchTitle]);

    console.log(recruitmentData, '1');

    const postItem = [];
    const postFilterItem = [];
    const postNumber = Math.floor((window.innerHeight - 100) / 130 - 1);
    console.log(postNumber);

    for (let i = postStartIndex; i < postStartIndex + postNumber; i++) {
        if (recruitmentData[i]) {
            postItem.push(
                <Post
                    key={i}
                    data={recruitmentData[i].data}
                    id={recruitmentData[i].id}
                    index={i}
                    lastIndex={lastIndex}
                    channel={channel}
                />,
            );
        }
    }

    for (let i = postStartIndex; i < postStartIndex + postNumber; i++) {
        if (filteredData[i]) {
            postFilterItem.push(
                <Post
                    key={i}
                    data={filteredData[i].data}
                    id={filteredData[i].id}
                    index={i}
                    lastIndex={lastIndex}
                    channel={channel}
                />,
            );
        }
    }

    const handlePage = (e: any) => {
        setPostStartIndex((Number(e.target.innerHTML) - 1) * postNumber);
    };

    const pageNumbers = [];
    const pageFilterNumbers = [];

    for (let i = 0; i < recruitmentData.length / postNumber; i++) {
        pageNumbers.push(<PostPageBtn onClick={handlePage}>{i + 1}</PostPageBtn>);
    }

    for (let i = 0; i < filteredData.length / postNumber; i++) {
        pageFilterNumbers.push(<PostPageBtn onClick={handlePage}>{i + 1}</PostPageBtn>);
    }

    return (
        <RecruitmentContainer>
            <SidebarRecruitment />

            <PostsContainer>
                <PostNav>
                    <Link to="/recruitment/post">
                        <PostButton>게시글 작성</PostButton>
                    </Link>

                    <SearchInput
                        placeholder="찾으시는 모임이 있나요?"
                        value={searchTitle}
                        onChange={(event) => setSearchTitle(event.target.value)}
                        onKeyDown={handleEnterKey}
                    ></SearchInput>
                </PostNav>
                <PostsWrapper>{searching ? postFilterItem : postItem}</PostsWrapper>
                <PostPageBtnWrapper>{searching ? pageFilterNumbers : pageNumbers}</PostPageBtnWrapper>
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
                <Time>
                    {data.editValued
                        ? new Date(data.editTime?.toMillis()).toLocaleString() + ' (수정됨)'
                        : new Date(data.time?.toMillis()).toLocaleString()}
                </Time>
            </div>
        </PostWrapper>
    </Link>
);

export default Recruitment;
