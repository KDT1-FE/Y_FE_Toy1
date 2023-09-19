import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { channelState, subChannelState } from '../../utils/recoil';
import { AllChannelsWrapper, ChannelWrapper, ChannelDiv, SubChannelDiv, ChannelHr } from './style';

const SidebarRecruitment: React.FC = () => {
    const [channel, setChannel] = useRecoilState(channelState);
    const [subChannel, setSubChannel] = useRecoilState(subChannelState);
    const defaultChannel = 'study';
    const defaultSubChannel = 'all';

    useEffect(() => {
        if (!channel || !subChannel) {
            setChannel(defaultChannel);
            setSubChannel(defaultSubChannel);
        }
    }, [channel, subChannel, setChannel, setSubChannel]);

    const isSubChannelActive = (channelName: string, subChannelName: string) => {
        return channel === channelName && subChannel === subChannelName;
    };

    const renderSubChannelDiv = (channelName: string, subChannelName: string, label: string) => {
        const isActive = isSubChannelActive(channelName, subChannelName);
        return (
            <SubChannelDiv
                style={{
                    color: isActive ? '#ffffff' : '',
                    backgroundColor: isActive ? 'var(--active-item)' : '',
                    borderRadius: isActive ? '5px' : '',
                    marginRight: isActive ? '10px' : '',
                    fontWeight: 'bold',
                }}
                onClick={() => {
                    setChannel(channelName);
                    setSubChannel(subChannelName);
                }}
            >
                {label}
            </SubChannelDiv>
        );
    };

    return (
        <AllChannelsWrapper>
            <ChannelWrapper>
                <ChannelDiv># 스터디</ChannelDiv>
                <div style={{ marginLeft: '20px' }}>
                    {renderSubChannelDiv('study', 'all', '전체')}
                    {renderSubChannelDiv('study', 'codingTest', '코딩테스트')}
                    {renderSubChannelDiv('study', 'CS', 'CS')}
                    {renderSubChannelDiv('study', 'interview', '면접')}
                    {renderSubChannelDiv('study', 'algorithm', '알고리즘')}
                </div>
            </ChannelWrapper>
            <ChannelHr />

            <ChannelWrapper>
                <ChannelDiv># 프로젝트</ChannelDiv>
                <div style={{ marginLeft: '20px' }}>
                    {renderSubChannelDiv('project', 'all', '전체')}
                    {renderSubChannelDiv('project', 'toyProject', '토이 프로젝트')}
                    {renderSubChannelDiv('project', 'corporateProject', '연계 프로젝트')}
                </div>
            </ChannelWrapper>
        </AllChannelsWrapper>
    );
};

export default SidebarRecruitment;
