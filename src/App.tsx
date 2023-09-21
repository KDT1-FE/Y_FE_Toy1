import React, { useEffect } from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './common/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wiki from './pages/Wiki';
import Gallery from './pages/Gallery';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Recruitment from './pages/Recruitment';
import RecruitmentDetail from './pages/RecruitmentDetail';
import RecruitmentPost from './pages/RecruitmentPost';
import RecruitmentEdit from './pages/RecruitmentEdit';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import { Current, ThemeChange, ThemeRing, UserId } from './utils/recoil';
import { readUser } from './utils/firebase';
import { themeBorder } from './components/modal/MyPage/MyPageTheme';

const App: React.FC = () => {
    const [theme, setTheme] = useRecoilState(ThemeChange);
    const [userId, setUserId] = useRecoilState(UserId);
    const [themeRing, setThemeRing] = useRecoilState(ThemeRing);

    const defaultTheme = {
        navBar: '#350d36',
        sideMenu: '#3F0E40',
        pointItem: '#4D2A51',
        text: '#fff',
        activeColor1: '#1164A3',
        activeColor2: '#2BAC76',
        badge: '#ECE7EC',
    };
    const user = async () => {
        {
            const userData = await readUser('user', userId);
            if (userData) {
                const userTheme = userData['Theme'];
                const userThemeRing = userData['ThemeBorder'];
                setTheme(userTheme);
                setThemeRing(userThemeRing);
                localStorage.setItem('theme', JSON.stringify(userTheme));
                localStorage.setItem('themeRing', JSON.stringify(userThemeRing));
            }
        }
    };

    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', JSON.stringify(defaultTheme));
        localStorage.setItem('themeRing', JSON.stringify(themeBorder[0]));
    }
    useEffect(() => {
        if (localStorage.getItem('theme') && localStorage.getItem('themeRing')) {
            const localtheme = localStorage.getItem('theme');
            const localthemeRing = localStorage.getItem('themeRing');
            if (localtheme && localthemeRing) {
                setTheme(JSON.parse(localtheme));
                setThemeRing(JSON.parse(localthemeRing));
            }
        } else if (userId) {
            user();
        }
    }, []);
    useEffect(() => {
        if (userId) {
            user();
        }
    }, [userId]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/wiki" element={<Wiki />}></Route>
                        <Route path="/gallery" element={<Gallery />}></Route>
                        <Route path="/signin" element={<SignIn />}></Route>
                        <Route path="/login" element={<LogIn />}></Route>
                        <Route path="/recruitment" element={<Recruitment />}></Route>
                        <Route path="/recruitment/:channel/:path" element={<RecruitmentDetail />}></Route>
                        <Route path="/recruitment/post" element={<RecruitmentPost />}></Route>
                        <Route path="/recruitment/edit/:channel/:path" element={<RecruitmentEdit />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
