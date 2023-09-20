import React from 'react';
import { MyPageThemeBox, ThemeColorEl, ThemeColors } from './style';

export default function MyPageTheme() {
    return (
        <MyPageThemeBox>
            <span>Theme</span>
            <ThemeColors>
                <ThemeColorEl style={{ backgroundColor: 'red' }}></ThemeColorEl>
                <ThemeColorEl style={{ backgroundColor: 'yellow' }}></ThemeColorEl>
                <ThemeColorEl style={{ backgroundColor: 'blue' }}></ThemeColorEl>
                <ThemeColorEl style={{ backgroundColor: 'green' }}></ThemeColorEl>
            </ThemeColors>
        </MyPageThemeBox>
    );
}
