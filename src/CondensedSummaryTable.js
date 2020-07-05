import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import _ from 'lodash';
import GroupedData from './GroupedData'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#1a237e',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    }
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      },
    },
  }))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
    table: {
      minWidth: 500,
      // marginTop: 20,
      // marginBottom: 20,
      // marginLeft: 20,
      // marginRight: 20
    },
    root: {
      backgroundColor: '#1a237e',
      color: 'white',
    },
    detailsRoot: {
      backgroundColor: 'white',
      paddingTop: 20,
      paddingLeft: 100,
      paddingRight: 100,
      paddingBottom: 20
    }, 
    button: {
      color: 'white'
    }
  });

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row({ data, groupedData_projects }) {
    //const {data} = data;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    function slipRate(commitDate, projectedDate) {
        const slipRateDays = commitDate.getTime() - projectedDate.getTime()
        return Math.round(slipRateDays/1000/60/60/24)
        }
    
// function projectGrouping({data}) {
//     for (milestone in milestone.data) {

//     }
    // const projectDataGrouping = data.map((milestoneData) => milestoneData.priority)
    // return projectDataGrouping
// }
// console.log("project data grouping", projectGrouping({data}))
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {groupedData_projects}
        </TableCell>
        <TableCell align="center">{groupedData_projects}</TableCell>
        {/* <TableCell align="center">${data.revenue}</TableCell>
        <TableCell align="center">{data.target_date}</TableCell>
        <TableCell align="center">{data.commit_date}</TableCell>
        <TableCell align="center">{data.projected_date}</TableCell>
        <TableCell align="center">{slipRate(new Date(data.commit_date), new Date(data.projected_date))}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Milestones
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Milestone</TableCell>
                    <TableCell>Revenue Impact</TableCell>
                    <TableCell align="right">Target Date</TableCell>
                    <TableCell align="right">Commit Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    hi
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];



export default function CollapsibleTable({data}) {
    console.log("data:", data)
    //Group Data based on Project Name
    
    var groupedData = _.groupBy(data,'project');
    console.log('grouped data:', groupedData)

    function totalRevenueImpactperProject(groupedData) {
      return Object.keys(groupedData).map(key => {
        let total = 0;
        groupedData[key].forEach(eachInstance => {
            total = total + eachInstance.revenue 
        });
        
        return total
      });

    }
    function numOfMilestonesPerProject(groupedData) {
        return Object.keys(groupedData).map(key => {
          let total = 0;
          groupedData[key].forEach(eachInstance => {
              total = total + 1 
          });
          
          return total
        });
  
      }
    function groupedDataArray(groupedData) {
        return Object.keys(groupedData).map(key => {
          let groupedDataArray = [];
          groupedData[key].forEach(eachInstance => {
              groupedDataArray = groupedDataArray + eachInstance.revenue 
          });
          
          return groupedDataArray
        });
  
      }

      const groupedData_projects = Object.keys(groupedData)
       
    console.log('Total Revenue per Project Array:', totalRevenueImpactperProject(groupedData))
    console.log('Number of Milestones per Project:', numOfMilestonesPerProject(groupedData))
    console.log('groupedDataArray:',groupedDataArray(groupedData))
    console.log('object keys:', groupedData_projects)
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
             <StyledTableCell></StyledTableCell>
             <StyledTableCell align="center">Priority</StyledTableCell>
             <StyledTableCell align="center">Project</StyledTableCell>
             <StyledTableCell align="center">Total Revenue Impact</StyledTableCell>
             <StyledTableCell align="center">Target Date</StyledTableCell>
             <StyledTableCell align="center">Commit Date</StyledTableCell>
             <StyledTableCell align="center">Projected Date</StyledTableCell>
             <StyledTableCell align="center">Slip Rate (days)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData_projects.map((groupedData_projects) => (
              <Row key={groupedData_projects} groupedData_projects={groupedData_projects} />
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
    );
  }