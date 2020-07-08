import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DataImporter from './DataImporter'
import slipRate from './slipRate'
import numOfCompleteMilestones from './numOfCompleteMilestones'
import getAverage from './getAverage'
import successRate from './successRate'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1a237e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function SummaryTable({data}) {
  const classes = useStyles();
  //const timelinesTitle = data[0].timelines_title;

  //FUNCTION TO FIND SLIP RATE
  // function slipRate(commitDate, projectedDate) {
  //   const slipRateDays = projectedDate.getTime() - commitDate.getTime()
  //   return Math.round(slipRateDays/1000/60/60/24)

  //   }

    //CREATE SLIP RATE ARRAY
    let slipRateArray = [];
    for (let i = 0; i < data.length; i++) {
        slipRateArray.push(slipRate(new Date(data[i].commit_date), new Date(data[i].projected_date), data[i].complete))
    }
    console.log("Slip Rate Array: ", slipRateArray)
    console.log("Success Rate:", successRate(slipRateArray))

    //CREATE REVENUE IMPACT ARRAY
    let revenueArray = [];
    for (let i = 0; i < data.length; i++) {
        revenueArray.push(data[i].revenue)
    }
    console.log("Revenue Array: ", revenueArray)
    
    let projectArray = [];
    for (let i = 0; i < data.length; i++) {
        projectArray.push(data[i].project)
    }
    console.log("Project Array: ", projectArray)


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Total # of Projects</StyledTableCell>
            <StyledTableCell align="center">Average Revenue Impact</StyledTableCell>
            <StyledTableCell align="center">Milestone Success Rate</StyledTableCell>
            <StyledTableCell align="center">Average Milestone Slip Rate (days)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
              <StyledTableCell>Timelines Title</StyledTableCell>
              <StyledTableCell align='center'>{data.length}</StyledTableCell>
              <StyledTableCell align="center">{'$' + getAverage(revenueArray)}</StyledTableCell>
              <StyledTableCell align="center">{successRate(slipRateArray)}%</StyledTableCell>
              <StyledTableCell align="center">{getAverage(slipRateArray)}</StyledTableCell>
            </TableRow>    
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// {timelinesTitle}