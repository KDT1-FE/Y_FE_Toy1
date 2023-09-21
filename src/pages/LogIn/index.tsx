import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, themeType } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { ThemeChange, UserId } from '../../utils/recoil';
import swal from 'sweetalert';

const defaultTheme = createTheme();

export default function LogIn() {
    const [userId, setUserId] = useRecoilState(UserId);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [back, setBack] = React.useState('');
    const [buttonColor, setButtonColor] = React.useState('');
    const [currentTheme, setCurrentTheme] = useRecoilState(ThemeChange);

    React.useEffect(() => {
        const selected = (theme: themeType) => {
            setBack(theme.recruitmentBack);
            setButtonColor(theme.navBar);
        };
        if (localStorage.getItem('theme')) {
            const localtheme = localStorage.getItem('theme');
            if (localtheme) {
                const color = JSON.parse(localtheme);
                selected(color);
            }
        }
    }, [currentTheme]);

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
                        return swal({
                            title: '로그인 에러',
                            text: '이메일 혹은 비밀번호가 일치하지 않습니다.',
                            icon: 'warning',
                        });
                    case 'auth/email-already-in-use':
                        return swal({
                            title: '로그인 에러',
                            text: '이미 사용중인 이메일입니다.',
                            icon: 'warning',
                        });
                    case 'auth/weak-password':
                        return swal({
                            title: '로그인 에러',
                            text: '비밀번호는 6자리 이상으로 작성해주세요',
                            icon: 'warning',
                        });
                    case 'auth/network-request-failed':
                        return swal({
                            title: '로그인 에러',
                            text: '네트워크 연결에 실패 하였습니다.',
                            icon: 'warning',
                        });
                    case 'auth/invalid-email':
                        return swal({
                            title: '로그인 에러',
                            text: '잘못된 이메일 형식입니다.',
                            icon: 'warning',
                        });
                    case 'auth/internal-error':
                        return swal({
                            title: '로그인 에러',
                            text: '잘못된 요청입니다.',
                            icon: 'warning',
                        });
                    default:
                        return swal({
                            title: '로그인 에러',
                            text: '로그인에 실패 하였습니다. 다시 확인해주세요',
                            icon: 'warning',
                        });
                }
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div
                style={{
                    position: 'fixed',
                    top: '72px',
                    left: '0',
                    width: '100vw',
                    height: 'calc(100vh - 72px)',
                    backgroundColor: back,
                }}
            ></div>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: buttonColor }}
                        >
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
