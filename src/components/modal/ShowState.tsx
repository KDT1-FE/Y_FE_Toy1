import React from 'react';
import { ShowOn } from './style';

interface OwnProps {
    value: boolean;
}

const ShowState: React.FC<OwnProps> = ({ value }) => {
    return (
        <ShowOn value={value}>
            <span>ON</span>
        </ShowOn>
    );
};

export default ShowState;
