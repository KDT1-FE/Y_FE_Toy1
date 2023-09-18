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

import { useRecoilState } from 'recoil';
import { UserId } from './utils/recoil';

const App: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);

    // userId로 사용자 uid 관리 가능 defalut = '' /
    console.log(userId);

    return (
        <BrowserRouter>
            <GlobalStyle />
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
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
