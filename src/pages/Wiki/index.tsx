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
import editImg from '../../common/wikiImg/icons8-edit-50.png';
import doneImg from '../../common/wikiImg/icons8-done-50.png';

const Wiki: React.FC = () => {
    const v = {
        value: {
            content: '',
        },
    };
    const [clickedValue, setClickedValue] = useState<any>(v);
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
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
                                {clickedValue.channel}
                                {' > '}
                                {clickedValue.subChannel}
                            </p>
                            <p style={{ marginBottom: '16px', color: 'black' }}>{time}</p>
                        </ReadChannel>
                        <MDEditBtn onClick={toggleButton}>
                            <img style={{ width: '30px' }} src={editImg}></img>
                        </MDEditBtn>
                        <MDEditor.Markdown source={md} />
                    </BeforeEdit>
                </WikiContent>
            ) : (
                <WikiContent>
                    <ChannelNames>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {clickedValue.channel}
                            {' > '}
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
                            style={{ width: '68vw' }}
                        />
                    </ChannelNames>
                    <MDEditBtn onClick={handleToggleAndUpdateClick}>
                        <img style={{ width: '30px' }} src={doneImg}></img>
                    </MDEditBtn>
                </WikiContent>
            )}
        </WikiContainer>
    );
};
export default Wiki;
