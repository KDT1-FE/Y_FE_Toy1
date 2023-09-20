import React, { useEffect, useState } from 'react';
import { WikiContainer, EditCompletedButton, WikiContent, ChannelNames, MDEditBtn, ReadChannel } from './style';
import SidebarWiki from '../../components/SidebarWiki';
import MDEditor, { bold } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { updateChannelContent } from '../../utils/firebase';
import editImg from '../../common/WikiImg/icons8-edit-50.png';
import doneImg from '../../common/WikiImg/icons8-done-50.png';
const Wiki: React.FC = () => {
    const defaultChannel = '기본 정보';
    const defaultSubChannel = '과정 참여 규칙';

    const [clickedValue, setClickedValue] = useState<any>({
        channel: defaultChannel,
        subChannel: defaultSubChannel,
        value: {
            content: '',
        },
    });
    const [md, setMd] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [isToggled, setIsToggled] = useState(true);
    const toggleButton = () => {
        setIsToggled(!isToggled);
    };
    useEffect(() => {
        // This code will run whenever clickedValue changes
        if (clickedValue !== null) {
            setMd(clickedValue.value.content);
            if (clickedValue.value.time) {
                setTime(clickedValue.value.time.toDate().toLocaleString());
            } else {
                setTime(''); // Set a default value or an empty string if time is undefined
            }
        }
    }, [clickedValue]);

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
        if (!isToggled) {
            setIsToggled(true);
        }
    };

    // Define an onChange handler for the MDEditor
    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setMd(value);
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
                            <MDEditBtn onClick={toggleButton}>
                                <img style={{ width: '30px' }} src={editImg}></img>
                            </MDEditBtn>
                        </ReadChannel>
                        <div style={{ marginBottom: '16px', color: 'black' }}>{time}</div>
                        <MDEditor.Markdown
                            source={md}
                            style={{ backgroundColor: 'var(--mention-badge)', minHeight: 'calc(100vh - 202px)' }}
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
                            <MDEditBtn onClick={handleToggleAndUpdateClick}>
                                <img style={{ width: '30px' }} src={doneImg}></img>
                            </MDEditBtn>
                        </ReadChannel>
                        <MDEditor
                            value={md}
                            onChange={handleEditorChange}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                            height={'95vh'}
                            style={{ backgroundColor: 'var(--mention-badge)' }}
                        />
                    </ChannelNames>
                </WikiContent>
            )}
        </WikiContainer>
    );
};
export default Wiki;
