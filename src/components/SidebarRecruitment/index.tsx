import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { channelState, subChannelState } from '../../utils/recoil';
import { AllChannelsWrapper, ChannelWrapper, ChannelDiv, SubChannelDiv, ChannelHr } from './style';

const SidebarRecruitment: React.FC = () => {
    const [channel, setChannel] = useRecoilState(channelState);
    const [subChannel, setSubChannel] = useRecoilState(subChannelState);
    return (
        <AllChannelsWrapper>
            <ChannelWrapper>
                <ChannelDiv># 프로젝트</ChannelDiv>
                <div style={{ marginLeft: '20px' }}>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('project');
                            setSubChannel('toyProject');
                        }}
                    >
                        토이 프로젝트
                    </SubChannelDiv>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('project');
                            setSubChannel('corporateProject');
                        }}
                    >
                        연계 프로젝트
                    </SubChannelDiv>
                </div>
                <ChannelHr />
            </ChannelWrapper>
            <ChannelWrapper>
                <ChannelDiv># 스터디</ChannelDiv>
                <div style={{ marginLeft: '20px' }}>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('study');
                            setSubChannel('all');
                        }}
                    >
                        전체
                    </SubChannelDiv>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('study');
                            setSubChannel('codingTest');
                        }}
                    >
                        코딩테스트
                    </SubChannelDiv>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('study');
                            setSubChannel('CS');
                        }}
                    >
                        CS
                    </SubChannelDiv>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('study');
                            setSubChannel('interview');
                        }}
                    >
                        면접
                    </SubChannelDiv>
                    <SubChannelDiv
                        onClick={() => {
                            setChannel('study');
                            setSubChannel('algorithm');
                        }}
                    >
                        알고리즘
                    </SubChannelDiv>
                </div>
            </ChannelWrapper>
        </AllChannelsWrapper>
    );
};

export default SidebarRecruitment;
