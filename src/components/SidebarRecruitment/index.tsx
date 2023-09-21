import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ThemeChange, channelState, subChannelState } from '../../utils/recoil';
import { AllChannelsWrapper, ChannelWrapper, ChannelDiv, SubChannelDiv, ChannelHr } from './style';
import { themeType } from '../../utils/firebase';

const SidebarRecruitment: React.FC = () => {
    const [channel, setChannel] = useRecoilState(channelState);
    const [subChannel, setSubChannel] = useRecoilState(subChannelState);
    const defaultChannel = 'study';
    const defaultSubChannel = '전체';
    const [currentTheme, setCurrentTheme] = useRecoilState(ThemeChange);
    const [back, setBack] = useState('');

    useEffect(() => {
        const selected = (theme: themeType) => {
            setBack(theme.activeColor1);
        };
        if (localStorage.getItem('theme')) {
            const localtheme = localStorage.getItem('theme');
            if (localtheme) {
                const color = JSON.parse(localtheme);
                selected(color);
            }
        }
    }, [currentTheme]);

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
                    backgroundColor: isActive ? back : '',
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
                    {renderSubChannelDiv('study', '전체', '전체')}
                    {renderSubChannelDiv('study', '코딩테스트', '코딩테스트')}
                    {renderSubChannelDiv('study', 'CS', 'CS')}
                    {renderSubChannelDiv('study', '면접', '면접')}
                    {renderSubChannelDiv('study', '알고리즘', '알고리즘')}
                </div>
            </ChannelWrapper>
            <ChannelHr />

            <ChannelWrapper>
                <ChannelDiv># 프로젝트</ChannelDiv>
                <div style={{ marginLeft: '20px' }}>
                    {renderSubChannelDiv('project', '전체', '전체')}
                    {renderSubChannelDiv('project', '토이 프로젝트', '토이 프로젝트')}
                    {renderSubChannelDiv('project', '연계 프로젝트', '연계 프로젝트')}
                </div>
            </ChannelWrapper>
        </AllChannelsWrapper>
    );
};

export default SidebarRecruitment;
