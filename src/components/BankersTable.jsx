import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// const processIds = ['P1', 'P2'];
// const allocations = [[0,1], [3,3]];
// const maxResources = [[7,7], [3,4]];
// const availableResources = [3,5];
// const remainingNeed = [[7,8], [0,3]]; 
// const resourceNames = ['A','B']; // You can modify this array to add more resource names

export default function BankersAlgorithmTable(props) {
  let allocations = props.allocation;
  let processIds = [];
  for(let i=0 ; i<props.process ; i++){
    processIds.push(`P${i}`);
  }
  let maxResources = props.maxresource;
 
  let availableResources = props.available;
  console.log(availableResources)
  let remainingNeed = props.need;
  let resourceNames=[];
  for(let i=0 ; i<props.resource ; i++){
    resourceNames.push(String.fromCharCode(i+65));
  }
  // console.log(resourceNames)
  const numResources = props.resource;
  const cellWidth = numResources === 1 ? 100 : 30; // Set cellWidth based on the number of resources
 // Further reduced width for each cell

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="bankers algorithm table">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} style={{ padding: '8px' }}>Process</TableCell>
            <TableCell colSpan={numResources} align="center" style={{ width: cellWidth }}>Allocation</TableCell>
            <TableCell colSpan={numResources} align="center" style={{ width: cellWidth }}>Max</TableCell>
            <TableCell colSpan={numResources} align="center" style={{ width: cellWidth }}>Available</TableCell>
            <TableCell colSpan={numResources} align="center" style={{ width: cellWidth }}>Remaining Need</TableCell>
          </TableRow>
          <TableRow>
            {resourceNames.length!=0 && resourceNames.map((name, index) => (
              <TableCell align="center" key={index} style={{ width: cellWidth }}>{name}</TableCell>
            ))}
            {resourceNames.length!=0 && resourceNames.map((name, index) => (
              <TableCell align="center" key={index} style={{ width: cellWidth }}>{name}</TableCell>
            ))}
            {resourceNames.length!=0 && resourceNames.map((name, index) => (
              <TableCell align="center" key={index} style={{ width: cellWidth }}>{name}</TableCell>
            ))}
            {resourceNames.length!=0 && resourceNames.map((name, index) => (
              <TableCell align="center" key={index} style={{ width: cellWidth }}>{name}</TableCell>
            ))}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {processIds.map((processId, index) => (
            <TableRow key={index}>
              <TableCell style={{ padding: '8px' , width: cellWidth }}>{processId}</TableCell>
              {allocations.length!=0 && allocations[index].map((allocation, index) => (
                <TableCell align="center" key={index} style={{ width: cellWidth }}>{allocation}</TableCell>
              ))}
              {maxResources.length!=0 && maxResources[index].map((max, index) => (
                <TableCell align="center" key={index} style={{ width: cellWidth }}>{max}</TableCell>
              ))}
              {remainingNeed.length!=0 && remainingNeed[index].map((need, index) => (
                <TableCell align="center" key={index} style={{ width: cellWidth }}>{need}</TableCell>
              ))}
              {availableResources.length!=0 && availableResources[index].map((need, index) => (
                <TableCell align="center" key={index} style={{ width: cellWidth }}>{need}</TableCell>
              ))}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
