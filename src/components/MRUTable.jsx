import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import {Code} from '@nextui-org/react';

const MRUTable = ({ frameLogs, series }) => {
    if (!frameLogs || !Array.isArray(frameLogs) || frameLogs.length === 0) {
        return <Code color='warning'>No Data Available For The Table</Code>;
    }
    console.log("series:", series);
    const processedSeries = series.split(',').map(num => `P${num}`);
    console.log("series:", processedSeries);
    // Create an array to represent the column numbers
    const columnNumbers = Array.from({ length: frameLogs[0].length }, (_, index) => index + 1);

    // Rendering the Table
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                         <TableCell align="center">Frames</TableCell>
                         {processedSeries.map((processedSeries) => (
                            <TableCell key={processedSeries} align="center">{processedSeries}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Render column numbers on the left */}
                    {columnNumbers.map((colNumber, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">Frame{colNumber}</TableCell>
                            {/* Render each row in frameLogs */}
                            {frameLogs.map((row, rowIndex) => (
                                <TableCell key={rowIndex} align="center">{row[index]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MRUTable;
