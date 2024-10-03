import logo from './logo.svg';
import './App.css';
import {Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Tooltip, Button} from "@mui/material";
import {useEffect, useState} from "react";

export default function App() {
  let [employeeData, setEmployeeData] = useState([]);
  let [pg, setPg] = useState(0);
  const [rpg, setrpg] = useState(10);

  let fetchEmployeeData = () => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then((response) => response.json())
        .then((data) => setEmployeeData(data))
        .catch((error) => {console.log(error); alert('failed to fetch data');});
  }

  let handleChangePage = (event, newpg) => {
      setPg(newpg);
  }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setPg(0);
    }

    useEffect(() => fetchEmployeeData(), []);

  return (
    <div className="App">
      <Typography variant='h2'>Employee Data Table</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.slice(pg * rpg, pg * rpg + rpg).map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
            component="div"
            rowsPerPage={rpg}
            count={employeeData.length}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{`${from}-${to} of ${count}`}</span>
                    <button onClick={(e) => handleChangePage(e, pg - 1)} disabled={pg === 0}>
                        Previous
                    </button>
                    <button onClick={(e) => handleChangePage(e, pg + 1)} disabled={pg >= Math.ceil(count / rpg) - 1}>
                        Next
                    </button>
                </div>
            )}
            getItemAriaLabel={(type) => `${type === 'next' ? 'Next' : 'Previous'} page`}
        />
    </div>
  );
}
