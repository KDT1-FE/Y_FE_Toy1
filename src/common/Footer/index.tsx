import React from 'react';
import { FooterComponent } from './style';

const Footer: React.FC = () => {
    return (
        <FooterComponent>
            <a href="https://github.com/2weeks-team/2weeks-team" style={{ verticalAlign: 'middle' }}>
                Github
            </a>
        </FooterComponent>
    );
};

export default Footer;
