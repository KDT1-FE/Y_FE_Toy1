import React from 'react';
import { MyPageThemeBox, ThemeColorEl, ThemeColors } from './style';
import { useRecoilState } from 'recoil';
import { ThemeChange } from '../../../utils/recoil';

export default function MyPageTheme() {
    const [theme, setTheme] = useRecoilState(ThemeChange);
    const themes = {
        eggPlant: {
            navBar: '#350d36',
            sideMenu: '#3F0E40',
            text: '#fff',
            activeColor1: '#1164A3',
            activeColor2: '#2BAC76',
            badge: '#ECE7EC',
        },
        banana: {
            navBar: '#FFC806',
            sideMenu: '#FFEB84',
            text: '#591035',
            activeColor1: '#FFC806',
            activeColor2: '#4C6DC2',
            badge: '#DD4147',
        },
        sweetDessert: {
            navBar: '#FFC2C0',
            sideMenu: '#FFEEED',
            text: '#4A154B',
            activeColor1: '#FFC2C0',
            activeColor2: '#FFA95A',
            badge: '#37BD8D',
        },
        mintChoco: {
            navBar: '#42362B',
            sideMenu: '#544538',
            text: '#fff',
            activeColor1: '#5DB09D',
            activeColor2: '#FFFFFF',
            badge: '#5DB09D',
        },
    };
    // const themeChange = (themeName: string) => {
    //     if (themeName) {
    //         const selectedTheme = { ...themes[themeName] };
    //         if (selectedTheme) {
    //             setTheme(selectedTheme);
    //         }
    //     }
    // };

    return (
        <MyPageThemeBox>
            <span>Theme</span>
            <ThemeColors>
                <ThemeColorEl
                    style={{ backgroundColor: 'red' }}
                    onClick={() => {
                        setTheme(themes.eggPlant);
                    }}
                ></ThemeColorEl>
                <ThemeColorEl
                    style={{ backgroundColor: 'yellow' }}
                    onClick={() => {
                        setTheme(themes.banana);
                    }}
                ></ThemeColorEl>
                <ThemeColorEl
                    style={{ backgroundColor: 'blue' }}
                    onClick={() => {
                        setTheme(themes.sweetDessert);
                    }}
                ></ThemeColorEl>
                <ThemeColorEl
                    style={{ backgroundColor: 'green' }}
                    onClick={() => {
                        setTheme(themes.mintChoco);
                    }}
                ></ThemeColorEl>
            </ThemeColors>
        </MyPageThemeBox>
    );
}
