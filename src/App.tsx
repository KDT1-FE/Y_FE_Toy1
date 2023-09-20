import React from 'react';
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
import { ThemeChange } from './utils/recoil';

const App: React.FC = () => {
    const [theme, setTheme] = useRecoilState(ThemeChange);
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
