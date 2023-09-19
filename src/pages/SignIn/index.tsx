import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
                };
                addUser(user.uid, value);

                // 회원가입 성공시 redirect
                navigate('/login', { state: pathname });
            })
            .catch((error) => {
                alert(error);
                // ..
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="name"
                            type="text"
                            id="name"
                            autoComplete="name"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
