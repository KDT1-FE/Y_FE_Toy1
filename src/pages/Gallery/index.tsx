import React, { useState } from 'react';
import Profile from './profile';

const Gallery: React.FC = () => {
    const [channelName, setChannelName] = useState('profile');
    const [subChannelName, setSubChannelName] = useState('profile');

    if (channelName === 'profile' && subChannelName === 'profile') {
        return <Profile />;
    } else {
        return <div>기타</div>;
    }
};

export default Gallery;
