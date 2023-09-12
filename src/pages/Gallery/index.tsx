import React, { useState } from 'react';
import Profile from './profile';

const Gallery: React.FC = () => {
    const [channelName, setChannelName] = useState('profile');
    if (channelName === 'profile') {
        return <Profile />;
    } else {
        return <div>기타</div>;
    }
};

export default Gallery;
