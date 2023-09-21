import React from 'react';
import { MyPageThemeBox, ThemeColorEl, ThemeColors } from './style';
import { useRecoilState } from 'recoil';
import { ThemeChange, ThemeRing, UserId } from '../../../utils/recoil';
import { updateUserTheme } from '../../../utils/firebase';

const themeBorder = [
    {
        first: '3px solid #fff',
        second: 'none',
        third: 'none',
        fourth: 'none',
    },
    {
        first: 'none',
        second: '3px solid #fff',
        third: 'none',
        fourth: 'none',
    },
    {
        first: 'none',
        second: 'none',
        third: '3px solid #fff',
        fourth: 'none',
    },
    {
        first: 'none',
        second: 'none',
        third: 'none',
        fourth: '3px solid #fff',
    },
];

export default function MyPageTheme() {
    const [theme, setTheme] = useRecoilState(ThemeChange);
    const [userId, setUserId] = useRecoilState(UserId);
    const [themeRing, setThemeRing] = useRecoilState(ThemeRing);
    const themes = {
        eggPlant: {
            navBar: '#350d36',
            sideMenu: '#3F0E40',
            pointItem: '#4D2A51',
            text: '#fff',
            activeColor1: '#1164A3',
            activeColor2: '#2BAC76',
            recruitmentBack: '#ECE7EC',
        },
        banana: {
            navBar: '#FFC806',
            sideMenu: '#FFEB84',
            pointItem: '#FFF8D4',
            text: '#591035',
            activeColor1: '#c24d51',
            activeColor2: '#4C6DC2',
            recruitmentBack: '#fef1ad',
        },
        sweetDessert: {
            navBar: '#FFC2C0',
            sideMenu: '#FFEEED',
            pointItem: '#fff',
            text: '#4A154B',
            activeColor1: '#f89d48',
            activeColor2: '#37BD8D',
            recruitmentBack: '#fff6f5',
        },
        indigo: {
            navBar: '#001A5E',
            sideMenu: '#7d9bfd',
            pointItem: '#5d80ff',
            text: '#fff',
            activeColor1: '#50ce73',
            activeColor2: '#2153FF',
            recruitmentBack: '#e9eeff',
        },
    };

    return (
        <MyPageThemeBox>
            <span>Theme</span>
            <ThemeColors>
                <ThemeColorEl
                    onClick={() => {
                        setThemeRing(themeBorder[0]);
                        setTheme(themes.eggPlant);
                        updateUserTheme('user', userId, themes.eggPlant, themeBorder[0]);
                        localStorage.setItem('theme', JSON.stringify(themes.eggPlant));
                        localStorage.setItem('themeRing', JSON.stringify(themeBorder[0]));
                    }}
                    thisTheme={themes.eggPlant}
                    selectTheme={themeRing.first}
                ></ThemeColorEl>
                <ThemeColorEl
                    onClick={() => {
                        setThemeRing(themeBorder[1]);
                        setTheme(themes.banana);
                        updateUserTheme('user', userId, themes.banana, themeBorder[1]);
                        localStorage.setItem('theme', JSON.stringify(themes.banana));
                        localStorage.setItem('themeRing', JSON.stringify(themeBorder[1]));
                    }}
                    thisTheme={themes.banana}
                    selectTheme={themeRing.second}
                ></ThemeColorEl>
                <ThemeColorEl
                    onClick={() => {
                        setThemeRing(themeBorder[2]);
                        setTheme(themes.sweetDessert);
                        updateUserTheme('user', userId, themes.sweetDessert, themeBorder[2]);
                        localStorage.setItem('theme', JSON.stringify(themes.sweetDessert));
                        localStorage.setItem('themeRing', JSON.stringify(themeBorder[2]));
                    }}
                    thisTheme={themes.sweetDessert}
                    selectTheme={themeRing.third}
                ></ThemeColorEl>
                <ThemeColorEl
                    onClick={() => {
                        setThemeRing(themeBorder[3]);
                        setTheme(themes.indigo);
                        updateUserTheme('user', userId, themes.indigo, themeBorder[3]);
                        localStorage.setItem('theme', JSON.stringify(themes.indigo));
                        localStorage.setItem('themeRing', JSON.stringify(themeBorder[3]));
                    }}
                    thisTheme={themes.indigo}
                    selectTheme={themeRing.fourth}
                ></ThemeColorEl>
            </ThemeColors>
        </MyPageThemeBox>
    );
}

export { themeBorder };
