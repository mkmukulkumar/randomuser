'use client';
import React , { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { logIn } from '@/redux/features/auth-slice';
import { useAppSelector } from "@/redux/store";
import CircularProgress from '@mui/material/CircularProgress';


export default function LoginForm() {
   
    const router = useRouter();
 

    const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch<AppDispatch>();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // Dummy user credentials
        const dummyUsers = [
            { email: 'user1@example.com', password: 'password1' },
            { email: 'user2@example.com', password: 'password2' },
        ];
    
        // Check if the entered credentials match any dummy user
        const enteredEmail = data.get('email') as string;
        const enteredPassword = data.get('password') as string;
    
        const authenticatedUser = dummyUsers.find(
            (user) => user.email === enteredEmail && user.password === enteredPassword
        );
    
        if (authenticatedUser) {
            window.alert('Authentication successful!');
            dispatch(logIn(enteredEmail))
            router.push('/');
        } else {
            window.alert('Authentication failed. Please check your credentials.');
        }
    };

       const username=useAppSelector((state)=>state.auth.value.username);
    const isAuth=useAppSelector((state)=>state.auth.value.isAuth);
    useEffect(()=>{
        if (isAuth) {
            router.push('/');
        }
    },[isAuth]);

    return (
    <>
        {isAuth?(
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress size="5rem" sx={{ color: '#fdd73f' }} />
            </div>
        ):(
            <Grid container component="main" sx={{ height: '100vh'}}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item sx= {{background: '#fdd73f'}} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding:"50px"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#2e3648'}}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField sx={{ bgcolor: 'white'}}
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
                        sx={{ bgcolor: 'white' }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,bgcolor: '#2e3648' ,'&:hover': { bgcolor: '#3f4a5b' }}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
                </Grid>
            </Grid>
        )}
    </>
    );
}