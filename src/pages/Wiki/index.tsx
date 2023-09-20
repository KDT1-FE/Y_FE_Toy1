import React, { useEffect, useState } from 'react';
import {
    WikiContainer,
    EditCompletedButton,
    WikiContent,
    ChannelNames,
    BeforeEdit,
    MDEditBtn,
    ReadChannel,
} from './style';
import SidebarWiki from '../../components/SidebarWiki';
import MDEditor, { bold } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { updateChannelContent } from '../../utils/firebase';
import editImg from '../../common/WikiImg/icons8-edit-50.png';
import doneImg from '../../common/WikiImg/icons8-done-50.png';

const Wiki: React.FC = () => {
    const v = {
        value: {
            content: '',
        },
    };

    // Initialize default values here
    const defaultChannel = '기본 정보';
    const defaultSubChannel = '과정 참여 규칙';

    const [clickedValue, setClickedValue] = useState<any>({
        channel: defaultChannel,
        subChannel: defaultSubChannel,
        value: {
            content: '',
        },
    });
    const [md, setMd] = useState<string>('# 제목');
    const [time, setTime] = useState<string>('');
    const [isToggled, setIsToggled] = useState(true);

    const toggleButton = () => {
        setIsToggled(!isToggled);
    };

    useEffect(() => {
        // This code will run whenever clickedValue changes
        if (clickedValue !== null) {
            setMd(clickedValue.value.content);
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
        if (!isToggled) {
            setIsToggled(true);
        }
    };

    return (
        <WikiContainer>
            <SidebarWiki onKeyClick={handleKeyClick} />
            {isToggled ? (
                <WikiContent>
                    <BeforeEdit>
                        <ReadChannel>
                            <p
                                style={{
                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    lineHeight: '1.5',
                                    marginLeft: '5vw',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                {clickedValue.subChannel}
                                <MDEditBtn onClick={toggleButton}>
                                    <img style={{ width: '20vw', lineHeight: '1' }} src={editImg}></img>
                                </MDEditBtn>
                            </p>
                        </ReadChannel>
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                border: '1px solid black',
                                width: '100vw',
                            }}
                        ></div>
                        <p style={{ width: '100vw', marginBottom: '16px', color: 'red' }}>{time}</p>
                        <MDEditor.Markdown source={md} />
                    </BeforeEdit>
                </WikiContent>
            ) : (
                <WikiContent>
                    <ChannelNames>
                        <p style={{ fontSize: '35px', fontWeight: 'bold', lineHeight: '1.5' }}>
                            {clickedValue.subChannel}
                        </p>
                        <p style={{ marginBottom: '16px' }}>{time}</p>
                        <MDEditor
                            value={md}
                            onChange={handleEditorChange}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                            height={'95vh'}
                            style={{ width: '100vw' }}
                        />
                    </ChannelNames>
                    <MDEditBtn onClick={handleToggleAndUpdateClick}>
                        <img style={{ width: '30px', lineHeight: '1.5' }} src={doneImg}></img>
                    </MDEditBtn>
                </WikiContent>
            )}
        </WikiContainer>
    );
};

export default Wiki;
