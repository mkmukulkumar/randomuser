"use client"
import { useEffect, useState } from "react";
import { IUsers } from "./models/IUsers";
import { UsersService } from "./services/UsersService";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonAppBar from "./components/navbar";
import { useAppSelector } from "@/redux/store";
import { useRouter } from 'next/navigation';
import { Box, TextField } from "@mui/material";

interface Column {
  id: 'id'| 'name' | 'gender' | 'email' | 'dob' | 'phone'| 'city';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 150 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'phone', label: 'Phone', minWidth: 150 },
  { id: 'dob', label: 'Age', minWidth: 50 },
  { id: 'city', label: 'City', minWidth: 150 }
];

interface Data {
  id: string;
  name: string;
  gender: string;
  email: string;
  phone:string;
  dob: string;
  city:string;
}

function createData(
    id: string,
    name: string,
    gender: string,
    email: string,
    phone: string,
    dob: string,
    city: string,
  ): Data {
    return { id, name, gender, email, phone, dob, city };
  }

export default function UsersTable() {
    const router = useRouter();
    interface IState{
        loading:boolean,
        users:IUsers[],
        errorMsg:string
    }
    const [state,setState]=useState<IState>({
        loading:false,
        users:[]as IUsers[],
        errorMsg:''
    })
    const username=useAppSelector((state)=>state.auth.value.username);
    const isAuth=useAppSelector((state)=>state.auth.value.isAuth);
    
    useEffect(()=>{
        if (!isAuth) {
            router.push('/login');
        }
        else{
            setState({...state,loading:true})
            UsersService.getAllUsers()
            .then((res)=>setState({
                ...state,loading:false, users:res.data.results
            })).catch(err=> setState({
                ...state,loading:false,errorMsg:err.message
            }));
        }
    },[isAuth]);

    
    
    const{loading,users,errorMsg}=state
    const rows: Data[] = users.map((row) =>
    // console.log(row.id)
    createData(
      row.id.value,
      row.name.first + " " + row.name.last,
      row.gender,
      row.email,
      row.phone,
      row.dob.age,
      row.location.city
    )
  );

    const [searchInput, setSearchInput] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearchInput(input);
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    
    return (
    <>
        {isAuth?(
            <Paper sx={{ width: '100%',overflow: 'hidden' }}>
                <ButtonAppBar text={username}/> 
                <Box sx={{ flexGrow: 1 }}>
                        <TextField 
                            id="filled-basic"
                            label="Search by name"
                            variant="filled"
                            fullWidth
                            sx={{
                                background: '#fdd73f' ,
                                width:"100%"
                            }}
                            onChange={handleSearchInputChange}
                        />     
                </Box>
                {errorMsg &&(<p style={{textAlign:'center'}}>{errorMsg}</p>)}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress  sx={{ color: '#fdd73f' }}/>
                    </div>
                )}
                {!loading && (
                    <TableContainer sx={{ maxHeight: "75vh"}} >

                    
                    
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell sx={{fontSize:'16px',fontWeight:"Bold",background:"#EAEAEA"}}
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((row)=>{
                                return searchInput.toLowerCase()===''?row:row.name.toLowerCase().includes(searchInput)
                            }).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.phone}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                        );
                                    })}
                            </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                )}
                <TablePagination
                rowsPerPageOptions={[50, 100, 500,1000,5000]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ background: '#2e3648',color:"white" }}
                />
            </Paper>
        ):(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress size="5rem" sx={{ color: '#fdd73f' }} />
            </div>
        )}
        
    </>   
    
    );
}