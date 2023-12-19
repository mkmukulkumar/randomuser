import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { logOut } from '@/redux/features/auth-slice';

interface ButtonAppBarProps {
  text: string; 
}

export default function ButtonAppBar({ text }: ButtonAppBarProps){
    const dispatch=useDispatch<AppDispatch>();
    const router = useRouter();
    
    const handleLogout = () => {
        dispatch(logOut());
        router.push('/login');
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background:"#2e3648" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       {text}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
