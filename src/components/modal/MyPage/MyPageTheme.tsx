import React, { useEffect, useState } from 'react';
import { MyPageThemeBox, ThemeColorEl, ThemeColors } from './style';
import { useRecoilState } from 'recoil';
import { CurrentTheme, ThemeChange, UserId } from '../../../utils/recoil';
import { updateUserTheme } from '../../../utils/firebase';

export default function MyPageTheme() {
    const [theme, setTheme] = useRecoilState(ThemeChange);
    const [userId, setUserId] = useRecoilState(UserId);
    const [showPalette, setShowPalette] = useState(false);
    const [currentTheme, setCurrentTheme] = useRecoilState(CurrentTheme);
    const themes = {
        eggPlant: {
            navBar: '#350d36',
            sideMenu: '#3F0E40',
            pointItem: '#4D2A51',
            text: '#fff',
            activeColor1: '#1164A3',
            activeColor2: '#2BAC76',
            badge: '#ECE7EC',
        },
        banana: {
            navBar: '#FFC806',
            sideMenu: '#FFEB84',
            pointItem: '#FFF8D4',
            text: '#591035',
            activeColor1: '#FFC806',
            activeColor2: '#4C6DC2',
            badge: '#DD4147',
        },
        sweetDessert: {
            navBar: '#FFC2C0',
            sideMenu: '#FFEEED',
            pointItem: '#fff',
            text: '#4A154B',
            activeColor1: '#FFC2C0',
            activeColor2: '#FFA95A',
            badge: '#37BD8D',
        },
        mintChoco: {
            navBar: '#42362B',
            sideMenu: '#544538',
            pointItem: '#4A3C30',
            text: '#fff',
            activeColor1: '#5DB09D',
            activeColor2: '#FFFFFF',
            badge: '#5DB09D',
        },
    };
    const handlePalette = () => {
        if (!showPalette) {
            setShowPalette(true);
        } else {
            setShowPalette(false);
        }
    };

    return (
        <MyPageThemeBox>
            <span>Theme</span>
            <ThemeColors>
                {!showPalette && (
                    <ThemeColorEl style={{ backgroundColor: currentTheme }} onClick={handlePalette}></ThemeColorEl>
                )}
                {showPalette && (
                    <ThemeColorEl
                        style={{ backgroundColor: '#350d36' }}
                        onClick={() => {
                            setCurrentTheme('#350d36');
                            setTheme(themes.eggPlant);
                            updateUserTheme('user', userId, themes.eggPlant);
                            localStorage.setItem('theme', JSON.stringify(themes.eggPlant));
                            handlePalette();
                        }}
                    ></ThemeColorEl>
                )}
                {showPalette && (
                    <ThemeColorEl
                        style={{ backgroundColor: '#FFC806' }}
                        onClick={() => {
                            setCurrentTheme('#FFC806');
                            setTheme(themes.banana);
                            updateUserTheme('user', userId, themes.banana);
                            localStorage.setItem('theme', JSON.stringify(themes.banana));
                            handlePalette();
                        }}
                    ></ThemeColorEl>
                )}
                {showPalette && (
                    <ThemeColorEl
                        style={{ backgroundColor: '#FFC2C0' }}
                        onClick={() => {
                            setCurrentTheme('#FFC2C0');
                            setTheme(themes.sweetDessert);
                            updateUserTheme('user', userId, themes.sweetDessert);
                            localStorage.setItem('theme', JSON.stringify(themes.sweetDessert));
                            handlePalette();
                        }}
                    ></ThemeColorEl>
                )}
                {showPalette && (
                    <ThemeColorEl
                        style={{ backgroundColor: '#42362B' }}
                        onClick={() => {
                            setCurrentTheme('#42362B');
                            setTheme(themes.mintChoco);
                            updateUserTheme('user', userId, themes.mintChoco);
                            localStorage.setItem('theme', JSON.stringify(themes.mintChoco));
                            handlePalette();
                        }}
                    ></ThemeColorEl>
                )}
            </ThemeColors>
        </MyPageThemeBox>
    );
}
