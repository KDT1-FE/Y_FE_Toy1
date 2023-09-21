import React, { useEffect, useState } from 'react';
import { WikiContainer, EditCompletedButton, WikiContent, ChannelNames, MDEditBtn, ReadChannel } from './style';
import SidebarWiki from '../../components/SidebarWiki';
import MDEditor, { bold } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { themeType, updateChannelContent } from '../../utils/firebase';
import editImg from '../../common/WikiImg/icons8-edit-50.png';
import doneImg from '../../common/WikiImg/icons8-done-50.png';
import { handleGetDocs, DocumentData } from '../../utils/firebase';
import { QuerySnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { ThemeChange } from '../../utils/recoil';
const Wiki: React.FC = () => {
    const defaultChannel = '기본 정보';
    const defaultSubChannel = '과정 참여 규칙';
    const [back, setBack] = useState('');
    const [currentTheme, setCurrentTheme] = useRecoilState(ThemeChange);

    useEffect(() => {
        const selected = (theme: themeType) => {
            setBack(theme.recruitmentBack);
        };
        if (localStorage.getItem('theme')) {
            const localtheme = localStorage.getItem('theme');
            if (localtheme) {
                const color = JSON.parse(localtheme);
                selected(color);
            }
        }
    }, [currentTheme]);
    const [clickedValue, setClickedValue] = useState<any>({
        channel: defaultChannel,
        subChannel: defaultSubChannel,
        value: {
            content: '',
        },
    });
    const [docsWithFields, setDocsWithFields] = useState<{ docId: string; docKeys: string[]; docData: DocumentData }[]>(
        [],
    );
    const [isClicked, setIsClicked] = useState(false);

    const [md, setMd] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [isToggled, setIsToggled] = useState(true);
    const defaultChannels = ['기본 정보'];
    const defaultSubChannels = ['과정 참여 규칙', '링크 모음'];
    const toggleButton = () => {
        setIsToggled(!isToggled);
    };

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
        setIsClicked(true);
        if (!isToggled) {
            setIsToggled(true);
        }
    };

    // Define an onChange handler for the MDEditor
    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setMd(value);

            if (isClicked) {
                setClickedValue((prevState: any) => {
                    const newTime = Timestamp.fromDate(new Date());
                    return {
                        ...prevState,
                        value: {
                            ...prevState.value,
                            content: value,
                            time: newTime,
                        },
                    };
                });
            }
        }
    };

    // Function to handle the update when the button is clicked
    const handleUpdateButtonClick = async () => {
        // First, update the state by calling setMd
        setMd((currentMd) => {
            // Now, you can call the updateChannelContent function with the updated md content
            updateChannelContent('wiki', clickedValue.channel, clickedValue.subChannel, currentMd)
                .then(() => {
                    console.log('Content updated successfully'); // Handle success
                })
                .catch((error) => {
                    console.error('Content update failed', error); // Handle error
                });
            return currentMd; // Return the current value to update the state
        });
    };

    // Function to handle both toggle and update button click
    const handleToggleAndUpdateClick = async () => {
        await handleUpdateButtonClick();
        if (clickedValue.value.time) {
            setTime(new Date().toLocaleString());
        } else {
            setTime(''); // Set a default value or an empty string if time is undefined
        }
        if (!isToggled) {
            setIsToggled(true);
        }
    };

    useEffect(() => {
        handleGetDocs('wiki', (querySnapshot: QuerySnapshot<DocumentData>) => {
            const data: { docId: string; docKeys: string[]; docData: DocumentData }[] = [];

            querySnapshot.forEach((doc: any) => {
                const docData = doc.data();
                const docId = doc.id;
                const docKeys = Object.keys(docData);
                data.push({ docId, docKeys, docData });
            });
            setDocsWithFields(data);
        });
    }, []);

    useEffect(() => {
        if (isClicked) {
            setMd(clickedValue.value.content);
            if (clickedValue.value.time) {
                setTime(clickedValue.value.time.toDate().toLocaleString());
            } else {
                setTime(''); // 시간이 정의되지 않은 경우 기본값 또는 빈 문자열 설정
            }
        } else {
            docsWithFields.forEach((item) => {
                item.docKeys.forEach((item2) => {
                    if (item.docId === defaultChannels[0] && item2 === defaultSubChannels[0]) {
                        setMd(item.docData[item2].content);
                        if (item.docData[item2].time) {
                            setTime(item.docData[item2].time.toDate().toLocaleString());
                        } else {
                            setTime(''); // 시간이 정의되지 않은 경우 기본값 또는 빈 문자열 설정
                        }
                    }
                });
            });
        }
    }, [docsWithFields, clickedValue, isClicked]);

    return (
        <WikiContainer>
            <SidebarWiki onKeyClick={handleKeyClick} />
            {isToggled ? (
                <WikiContent>
                    <ChannelNames>
                        <ReadChannel>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                {clickedValue.subChannel}
                            </div>
                            <MDEditBtn
                                onClick={() => {
                                    toggleButton();
                                }}
                            >
                                <img style={{ width: '30px' }} src={editImg}></img>
                            </MDEditBtn>
                        </ReadChannel>
                        <div style={{ marginBottom: '16px', color: 'black' }}>{time}</div>
                        <MDEditor.Markdown
                            source={md}
                            style={{
                                backgroundColor: back,
                                color: 'black',
                                minHeight: 'calc(100vh - 252px)',
                            }}
                        />
                    </ChannelNames>
                </WikiContent>
            ) : (
                <WikiContent>
                    <ChannelNames>
                        <ReadChannel>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                {clickedValue.subChannel}
                            </div>
                            <MDEditBtn
                                onClick={() => {
                                    handleToggleAndUpdateClick();
                                }}
                            >
                                <img style={{ width: '30px' }} src={doneImg}></img>
                            </MDEditBtn>
                        </ReadChannel>
                        <MDEditor
                            value={md}
                            onChange={handleEditorChange}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                                style: {
                                    backgroundColor: back,
                                    color: 'black',
                                },
                            }}
                            height={'95vh'}
                            style={{ backgroundColor: back, color: 'black' }}
                        />
                    </ChannelNames>
                </WikiContent>
            )}
        </WikiContainer>
    );
};
export default Wiki;
