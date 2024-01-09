import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { findPatients } from 'src/api/practitioner';
import { Permissions } from 'src/constants/Permissions';
import { Layout as DashboardLayout } from '../../layouts/dashboard-layout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';

function createData(dob, full_name, age, phone, national_id) {
    return { dob, full_name, age, phone, national_id };
}

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = () => {
        router.push(`/patient/search?search=${searchTerm}`);
    };

    if (!search) router.replace('/patient');

    const { error: searchError, data: searchData } = useQuery({
        queryKey: ['find_patient', search],
        queryFn: (ctx) => findPatients(ctx),
    });

    const row = searchData?.data?.data?.map((item) => {
        return createData(item.dob, item.full_name, item.age, item.phone, item.national_id);
    });

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ margin: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginLeft: '10px' }}>
                    Search
                </Button>
            </div>
            <Typography variant="h6" sx={{ margin: '10px' }}>
                Search Results for: {search}
            </Typography>
            <TableContainer sx={{border:2, width:"99%", marginLeft:"10px"}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                fontWeight: 'bold',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <TableCell align="left">Full Name</TableCell>
                            <TableCell align="left">Age</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">National ID</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row?.map((rowData) => (
                            <TableRow
                                key={rowData.dob}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                            >
                                <TableCell align="left">{rowData.full_name}</TableCell>
                                <TableCell align="left">{rowData.age}</TableCell>
                                <TableCell align="left">{rowData.dob}</TableCell>
                                <TableCell align="left">{rowData.phone}</TableCell>
                                <TableCell align="left">{rowData.national_id}</TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => { }} variant="contained" color="success">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Search;

Search.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Search.access = Permissions.CanViewPatient;
