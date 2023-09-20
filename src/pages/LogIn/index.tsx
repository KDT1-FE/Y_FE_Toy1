import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';

const defaultTheme = createTheme();

export default function LogIn() {
    const [userId, setUserId] = useRecoilState(UserId);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const emailEntry = data.get('email');
        const email = emailEntry !== null ? emailEntry.toString() : '';

        const passwordEntry = data.get('password');
        const password = passwordEntry !== null ? passwordEntry.toString() : '';

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                setUserId(user.uid);

                navigate('/', { state: pathname });
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
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" style={{ paddingTop: '72px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            로그인
                        </Button>

                        <Link href="/signin" variant="body2">
                            회원가입
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
