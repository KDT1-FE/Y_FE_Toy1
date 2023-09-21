import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

import { auth, addUser } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // 회원가입 기능
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const emailEntry = data.get('email');
        const email = emailEntry !== null ? emailEntry.toString() : '';

        const passwordEntry = data.get('password');
        const password = passwordEntry !== null ? passwordEntry.toString() : '';

        const nameEntry = data.get('name');
        const name = nameEntry !== null ? nameEntry.toString() : '';

        // firebase Auth 등록
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                const value = {
                    name: name,
                    email: email,
                    info: `안녕하세요 ${name}입니다.`,
                    login: false,
                    imageURL:
                        'https://firebasestorage.googleapis.com/v0/b/wiki-for-fastcampus.appspot.com/o/images%2Fprofile.jpeg?alt=media&token=29da086e-74a8-445c-99b3-7332569544f7',
                    timelog: [],
                    Theme: {
                        navBar: '#350d36',
                        sideMenu: '#3F0E40',
                        pointItem: '#4D2A51',
                        text: '#fff',
                        activeColor1: '#1164A3',
                        activeColor2: '#2BAC76',
                        recruitmentBack: '#ECE7EC',
                    },
                    ThemeBorder: {
                        first: '3px solid #fff',
                        second: 'none',
                        third: 'none',
                        fourth: 'none',
                    },
                };
                addUser(user.uid, value);

                // 회원가입 성공시 redirect
                navigate('/login', { state: pathname });
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found' || 'auth/wrong-password':
                        return alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
                    case 'auth/email-already-in-use':
                        return alert('이미 사용 중인 이메일입니다.');
                    case 'auth/weak-password':
                        return alert('비밀번호는 6글자 이상이어야 합니다.');
                    case 'auth/network-request-failed':
                        return alert('네트워크 연결에 실패 하였습니다.');
                    case 'auth/invalid-email':
                        return alert('잘못된 이메일 형식입니다.');
                    case 'auth/internal-error':
                        return alert('잘못된 요청입니다.');
                    default:
                        return alert('로그인에 실패 하였습니다.');
                }
                // ..
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth="xs"
                style={{
                    position: 'absolute',
                    border: '1px solid #efefef',
                    borderRadius: '20px',
                    padding: '0px 30px 40px 30px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '1px 1px rgba(0, 0, 0, 0.4)',
                    backgroundColor: 'white',
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'whitegray' }}></Avatar>

                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="이름"
                            type="text"
                            id="name"
                            autoComplete="name"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: 'var( --active-item)' }}
                        >
                            회원가입
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
