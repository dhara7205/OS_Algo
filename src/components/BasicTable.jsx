/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

let names=[];
let arrivalTimes = [];
let burstTimes = [];
let completionTimes = [];
let turnaroundTimes = [];
let waitingTimes = [];

// Function to create row data
function createRow(name, arrivalTime, burstTime, completionTime, turnaroundTime, waitingTime) {
  return { name, arrivalTime, burstTime, completionTime, turnaroundTime, waitingTime };
}

// Function to generate rows based on data arrays
function generateRows() {
  const rows = [];
  for (let i = 0; i < names.length; i++) {
    rows.push(createRow(names[i], arrivalTimes[i], burstTimes[i], completionTimes[i].time, turnaroundTimes[i].time, waitingTimes[i].time));
  }
  return rows;
}

export default function BasicTable(props) {
  names=props.name;
  completionTimes=props.completionTime;
  arrivalTimes=props.arrivalTime;
  turnaroundTimes=props.turnaroundTime;
  waitingTimes = props.waitingTime;
  burstTimes = props.burstTime;
  const rows = generateRows();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
            <TableCell align="right">Burst Time</TableCell>
            <TableCell align="right">Completion Time</TableCell>
            <TableCell align="right">Turnaround Time</TableCell>
            <TableCell align="right">Waiting Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.arrivalTime}</TableCell>
              <TableCell align="right">{row.burstTime}</TableCell>
              <TableCell align="right">{row.completionTime}</TableCell>
              <TableCell align="right">{row.turnaroundTime}</TableCell>
              <TableCell align="right">{row.waitingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
