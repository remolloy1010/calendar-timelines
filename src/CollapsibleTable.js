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
import slipRate from './slipRate'
import { ExpansionPanel } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckCircle } from 'react-feather';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import timeDuration from './timeDuration'
import slipRatePerctg from './slipRatePerctg'

const THEME = createMuiTheme({
  typography: {
    // "fontFamily": "\"MyCustomFont\"",
    // "fontSize": 20,
    // "lineHeight": 1.5,
    // "letterSpacing": 0.32,
    // useNextVariants: true,
    // suppressDeprecationWarnings: true,
    body2: {
      "fontWeight": 600,
    },
    subtitle1: {
      "fontWeight": 500,
    }
  },
});

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
      //minWidth: 500,
      // marginTop: 20,
      // marginBottom: 20,
      // marginLeft: 20,
      // marginRight: 20,
      backgroundColor: '#1a237e',

    },
    root: {
      backgroundColor: '#1a237e',
      color: 'white',
      width: 1000,
      // height: 50,
      // justifyContent: 'center'
    },
    detailsRoot: {
      backgroundColor: 'white',
      paddingTop: 20,
      paddingLeft: 100,
      paddingRight: 100,
      paddingBottom: 20
    }, 
    button: {
      color: 'white',
      // height: 50
    },
    content: {
      justifyContent: 'center'
    }
  });

  const styles = {
    expansionPanelText:{
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center'
    },
    completeIcon: {
      backgroundColor: 'white',
      color: 'green'
    }
  }


function Row({ index, rowData = {}, temp = {} }) {
    //const {data} = data;
    console.log('rowData', rowData)
    
    // console.log('collapsedRowData:', collapsedRowData)
    console.log('groupedData:', temp)
    const projectNames = Object.keys(temp)
    console.log('projectNames', projectNames)

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    // function slipRate(commitDate, projectedDate) {
    //     const slipRateDays = projectedDate.getTime() - commitDate.getTime()
    //     return Math.round(slipRateDays/1000/60/60/24)
    //     }
    function milestoneComplete(complete) {
      if(complete === 'Y'){
        return <CheckBoxIcon style={styles.completeIcon}> </CheckBoxIcon>
      }
      else{
        return ''
      }
    }
    // {if(groups[0].complete === 'Y') ? <CheckBoxIcon style={styles.completeIcon}> </CheckBoxIcon> : 'empty'}

  return (
    <React.Fragment>
      {/* <ExpansionPanel classes={{ root: classes.root }} > */}
      {/* <ExpansionPanel>  */}
      {/* <ExpansionPanelSummary expandIcon={<ExpandMoreIcon classes={{ root: classes.button}}/>}>
        <Typography className={classes.heading, classes.root} >Data Table</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes = {{ root: classes.detailsRoot}}> */}
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <MuiThemeProvider theme={THEME}>
            <Typography variant='body2'>{rowData.priority}</Typography>
          </MuiThemeProvider> 
        </TableCell>

        <TableCell align="center">
          <MuiThemeProvider theme={THEME}>
            <Typography variant='body2'>{rowData.project_name}</Typography>
          </MuiThemeProvider>
        </TableCell>

        <TableCell align="center">
          <MuiThemeProvider theme={THEME}>
            <Typography variant='body2'>{rowData.commit_date}</Typography>
          </MuiThemeProvider>
        </TableCell>

        <TableCell align="center">
          <MuiThemeProvider theme={THEME}>
            <Typography variant='body2'>${rowData.total_revenue}</Typography>
          </MuiThemeProvider>
        </TableCell>
        {/* <TableCell align="center">{data.target_date}</TableCell>
        <TableCell align="center">{data.commit_date}</TableCell>
        <TableCell align="center">{data.projected_date}</TableCell>
        <TableCell align="center">{slipRate(new Date(data.commit_date), new Date(data.projected_date))}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div"></Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    
                    <TableCell>
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'> </Typography>
                      </MuiThemeProvider>
                    </TableCell>

                    <TableCell>
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Milestone</Typography>
                      </MuiThemeProvider>
                    </TableCell>
                    
                    <TableCell align="center">
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Start Date</Typography>
                      </MuiThemeProvider>
                    </TableCell>
                    
                    <TableCell align="center">
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Projected Completion Date</Typography>
                      </MuiThemeProvider>
                    </TableCell>
                    
                    <TableCell align="center">
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Target Completion Date</Typography>
                      </MuiThemeProvider>                    
                    </TableCell>
                    
                    <TableCell align="center">
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Commit Completion Date</Typography>
                      </MuiThemeProvider>                    
                    </TableCell>
                    
                    <TableCell align="center">
                      <MuiThemeProvider theme={THEME}>
                        <Typography variant='body2'>Slip Rate</Typography>
                      </MuiThemeProvider>                    
                    </TableCell>
                    {/* <TableCell align="center">Slip Rate (%)</TableCell> */}



                  </TableRow>
                </TableHead>
                <TableBody>
                    
                    {temp.map(group => (
                              
                          <TableRow key={group.project}>
                              <TableCell align="center">
                                {milestoneComplete(group.complete)}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  {group.milestone}
                              </TableCell>
                              <TableCell align="center">{group.start_date}</TableCell>
                              <TableCell align="center">{group.projected_date}</TableCell>
                              <TableCell align="center">{group.target_date}</TableCell>
                              <TableCell align="center">{group.commit_date}</TableCell>
                              <TableCell align="center">{slipRatePerctg(slipRate(group.commit_date, group.projected_date, group.complete),timeDuration(group.start_date, group.projected_date))}</TableCell>

                          </TableRow>
                          // )})
                          
                    ))}
                          
                  

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function CollapsibleTable({projectSummary, groupedData}) {
    const classes = useStyles();
    console.log('groupedData:', groupedData)
    
    console.log('project summary:', projectSummary)
    

    return (
      <div style={{...styles.expansionPanelText}}>
      <ExpansionPanel classes={{ root: classes.root }} >
      <ExpansionPanelSummary classes={{ content: classes.content }} expandIcon={<ExpandMoreIcon classes={{ root: classes.button}}/>}>
        <Typography variant='h5' align='center' >Data Table</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes = {{ root: classes.detailsRoot}}>
      <TableContainer component={Paper} classes={{ table: classes.table }}>
        {/* <Row groupedData={groupedData}/> */}
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
             <StyledTableCell></StyledTableCell>

             <StyledTableCell align="center">
                <MuiThemeProvider theme={THEME}>
                  <Typography variant='subtitle1'>Priority</Typography>
                </MuiThemeProvider>
              </StyledTableCell>

              <StyledTableCell align="center">
                  <MuiThemeProvider theme={THEME}>
                    <Typography variant='subtitle1'>Project</Typography>
                  </MuiThemeProvider>
              </StyledTableCell>

             <StyledTableCell align="center">
                <MuiThemeProvider theme={THEME}>
                  <Typography variant='subtitle1'>Project Commit Date</Typography>
                </MuiThemeProvider>             
              </StyledTableCell>

             <StyledTableCell align="center">
             <MuiThemeProvider theme={THEME}>
                  <Typography variant='subtitle1'>Total Revenue Impact ($M)</Typography>
                </MuiThemeProvider>
             </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectSummary && projectSummary.map((element, i) => (
              <Row key={element.priority} rowData={element} temp={groupedData[Object.keys(groupedData)[i]]}/>
            ))}          
          </TableBody>
        </Table>
      </TableContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel> 
    </div>
    );
  }