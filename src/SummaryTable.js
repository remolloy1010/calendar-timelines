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
import GroupedData from './GroupedData'
import groupedDataByProject from './groupedDataByProject'
import projectSummary from './projectSummary'
import groupedDataObject from './groupedDataObject'
import countSuccesses from './countSuccesses'
import timeDuration from './timeDuration'

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


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function SummaryTable({data}) {
  const classes = useStyles();
  //const timelinesTitle = data[0].timelines_title;

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
    console.log('Project Summ from Function:', projectSummary(groupedDataObject(data)))

    let slipRateSumsArray = [];
    for(let i = 0; i < projectSummary(groupedDataObject(data)).length; i++){
      slipRateSumsArray.push(projectSummary(groupedDataObject(data))[i].sum_slip_rate)

    }
    console.log(slipRateSumsArray)
    
    // Milestone Success Rate Calculation
    let successCount = 0;
    let arrayCount = 0;
    for(let i=0; i < data.length; i++){

        if (new Date(data[i].projected_date).getTime() < new Date(data[i].commit_date).getTime() && data[i].complete === 'Y'){
          successCount += 1;
          arrayCount += 1;
        }
        else if(data[i].complete === 'N'){
          successCount += 0;
          arrayCount += 0;
        }
        else{
          successCount += 0;
          arrayCount += 1;
        }
           
    }
    console.log('timeDuration', timeDuration(new Date(data[0].start_date), new Date(data[0].projected_date)))

    // Project Success Rate
    let successCountProject = 0;
    let arrayCountProject = 0;
    for(let i=0; i < projectSummary(groupedDataObject(data)).length; i++){

        if (new Date(projectSummary(groupedDataObject(data))[i].projected_completion_date).getTime() < new Date(projectSummary(groupedDataObject(data))[i].commit_completion_date).getTime()){
          successCountProject += 1;
          arrayCountProject += 1;
        }
        // else if(data[i].complete === 'N'){
        //   successCount += 0;
        //   arrayCount += 0;
        // }
        else{
          successCountProject += 0;
          arrayCountProject += 1;
        }
           
    }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Total # of Projects</StyledTableCell>
            <StyledTableCell align="center">Average Revenue Impact ($M)</StyledTableCell>
            <StyledTableCell align="center">Project Success Rate</StyledTableCell>
            <StyledTableCell align="center">Average Project Slip Rate (days)</StyledTableCell>
            <StyledTableCell align="center">Milestone Success Rate</StyledTableCell>
            <StyledTableCell align="center">Average Milestone Slip Rate (days)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
              <StyledTableCell>Timelines Title</StyledTableCell>
              <StyledTableCell align='center'>{groupedDataByProject(data).length}</StyledTableCell>
              <StyledTableCell align="center">{'$' + getAverage(revenueArray)}</StyledTableCell>
              <StyledTableCell align="center">{Math.round((successCountProject/arrayCountProject)*100)}%</StyledTableCell>
              <StyledTableCell align="center">{getAverage(slipRateSumsArray)}</StyledTableCell>
              <StyledTableCell align="center">{Math.round((successCount/arrayCount)*100)}%</StyledTableCell>
              <StyledTableCell align="center">{getAverage(slipRateArray)}</StyledTableCell>
            </TableRow>    
        </TableBody>
      </Table>
    </TableContainer>
  );
}
