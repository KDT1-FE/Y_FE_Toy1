import React from 'react';
import { FooterComponent } from './style';
import githubIcon from '../../common/MainImg/githubicon.png';

const Footer: React.FC = () => {
    return (
        <FooterComponent>
            <a href="https://github.com/2weeks-team/2weeks-team" style={{ color: 'white', verticalAlign: 'middle' }}>
                <img src={githubIcon} style={{ width: '1rem', height: '1rem' }} />
                Github
            </a>
        </FooterComponent>
    );
};

export default Footer;
