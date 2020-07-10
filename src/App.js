import React, { useState } from 'react';
import './App.css';
// import Timeline, { 
//   TimelineMarkers,
//   TodayMarker }
//   from 'react-calendar-timeline'
// // make sure you include the timeline stylesheet or the timeline will not be styled
// import './Timeline.css'
// import moment from 'moment'
// import DetailsIcon from '@material-ui/icons/Details';
// import DetailsTwoToneIcon from '@material-ui/icons/DetailsTwoTone';
import { colors } from '@material-ui/core';
import { DataImporter } from './DataImporter';
import ProjectData from './ProjectData';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DataTable from './DataTable'
import SummaryTable from './SummaryTable'
import CollapsibleTable from './CondensedSummaryTable';
import GroupedData from './GroupedData'
import CardWidget from './CardWidget';
import NumberCard from './NumberCard';
import { UserCheck, Map, DollarSign, CheckCircle, TrendingDown, Book, Trello, Clipboard } from 'react-feather';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import projectSummary from './projectSummary';
import groupedDataObject from './groupedDataObject'
import getSum from './getSum';
import getAverage from './getAverage';

// import countSuccesses from './countSuccesses'


const styles = {
  titleBarStyle: {
    //borderColor: 'green',
    height: 30,
    borderColor: 'crimson',
    backgroundColor: 'green',


  },
  paddingStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  headerStyle: {
    background: 'linear-gradient(45deg, #1a237e 30%, #64b5f6 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 105, 135, .3)',
    color: 'white',
    height: 50,
    padding: '0 30px',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  headerStyleBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    
  }
}
const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


// const markers = [
//   {
//     id: 5,
//     group: 1,
//     title: <div style={styles.customIconStyle}/>,
//     start_time: new Date('6/8/2020'),
//     end_time: new Date('6/8/2020'),
//     itemProps: {
//       style: {
//         background: 'rgb(0,0,0,0)',
//         borderColor: 'rgb(0,0,0,0)',
//         width: 0
//       }
//     }
//   }
// ]

function getBrowserData() {
  // 'data' is the key of the data (object variables) from local storage
  const dataString = localStorage.getItem('data') 
  if (!dataString) return []; // if no data stored locally, return no data 
  return JSON.parse(dataString) // converts JSON string into an object
}

// const today = Date.now()
// const date = '5/7/2020'

function App() {

  // return <div />

  const [data, setData] = useState(getBrowserData());
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  // Total Revenue Impact
  let revenueArray = [];
  for (let i = 0; i < data.length; i++) {
      revenueArray.push(data[i].revenue)
  }
  console.log("Revenue Array: ", revenueArray)

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


  // const handleForce = (data, fileInfo) => console.log(data, fileInfo);
  
  function handleDataUpload(data) {
    //we are updating the state to whatever the data is in local storage
    //accepts the new state value (data from local storage) and re-renders the component (data?)
    setData(data) 
    // sets the values of the data pulled from local storage to the keys identified in the "getBrowserData" function
    // stringify converts JS values to JSON format
    localStorage.setItem('data', JSON.stringify(data))
  }

  function clearData() {
    setData([]) // set state back to zero (empty) - re-initialzes
    //removes the key-value pair from local storage so you can start all over with new data if need be
    localStorage.removeItem('data') 
  }

  console.log(data)

  // {data[0].timelines_title}
  return (

    <div>
    
    <div style={styles.headerStyle}>
            <Typography variant="h4" align="center" data={data} >
             Project Timelines
            </Typography>
          </div>
    <div style={styles.paddingStyle}>
      <DataImporter onDataUpload={handleDataUpload}/>
      <button onClick={clearData}> Clear Data</button></div> 
      <ProjectData data={data}/>
      
      <div style={styles.headerStyleBlock}> 
        <div style={{...styles.headerStyle, marginTop: 15, width: 700, background: '#1a237e'}}> 
          <Typography align='center' variant='h5'>Portfolio Metrics</Typography> 
        {/* <Grid container className={classes.root} spacing={2}> 
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}> */}
            {/* <CardWidget>SUPPPP</CardWidget> */}
            {/* </Grid>
          </Grid>
        </Grid> */}
        </div>
      </div>
      <div> 
        <Grid container className={classes.root} spacing={2}> 
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
            <NumberCard variant='avatar' Icon={Clipboard} value={projectSummary(groupedDataObject(data)).length} title='# of Projects'></NumberCard>
            {/* <NumberCard variant='avatar' Icon={Map} value={data.length} title='# of Milestones'></NumberCard> */}
            <NumberCard variant='avatar' Icon={DollarSign} value={'$' + Math.round(getAverage(revenueArray)/12) + 'M'} title='Average Monthly Revenue Impact'></NumberCard>
            {/* <NumberCard variant='avatar' Icon={TrendingDown} value={'-30%'} title='Average Milestones Slip Rate'></NumberCard> */}

              {/* {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  {/* <Paper className={classes.paper}/>hiii */}
                  {/* <CardWidget>Hiiiii</CardWidget> */}
                  {/* <NumberCard variant='success' Icon={UserCheck} value={data[7].priority} title='Ready for pickup'></NumberCard>
                </Grid>
              ))} */} 
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div> 
        <Grid container className={classes.root} spacing={2}> 
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
            <NumberCard variant='avatar' Icon={CheckCircle} value={'Projects: ' + Math.round((successCountProject/arrayCountProject)*100)+'%'} 
                value2={'Milestones: '+ Math.round((successCount/arrayCount)*100)+'%'} title='Success Rate'></NumberCard>
            {/* <NumberCard variant='avatar' Icon={CheckCircle} value={Math.round((successCount/arrayCount)*100)+'%'} title='Milestones Success Rate'></NumberCard> */}
            <NumberCard variant='avatar' Icon={TrendingDown} value={'Projects: ' + '-12%'} value2={'Milestones: ' + '-30%'} title='Average Slip Rate'></NumberCard>
            {/* <NumberCard variant='avatar' Icon={TrendingDown} value={'-30%'} title='Average Milestones Slip Rate'></NumberCard> */}

              {/* {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  {/* <Paper className={classes.paper}/>hiii */}
                  {/* <CardWidget>Hiiiii</CardWidget> */}
                  {/* <NumberCard variant='success' Icon={UserCheck} value={data[7].priority} title='Ready for pickup'></NumberCard>
                </Grid>
              ))} */} 
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <SummaryTable data={data}></SummaryTable>
      </div>

      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <DataTable data={data}></DataTable>
      </div> */}
      
      {/* <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <CollapsibleTable data={data}></CollapsibleTable>
      </div> */}
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <GroupedData data={data}></GroupedData>
      </div>
        {/* <div> 
          <CardWidget>Hiiiii</CardWidget> </div>
        <div> 
          <NumberCard variant='success' Icon={UserCheck} value={1} title='Ready for pickup'></NumberCard> 
        </div> */}
      
      {/* <NumberCard variant='success' Icon={UserCheck} value={1} title='Ready for pickup' /> */}
      {/* <div> <countSuccesses data={data}> </countSuccesses></div> */}
    {/* <ProjectData>
    </ProjectData> */}


    {/* <DataImporter onDataUpload={handleDataUpload} /> 
      <button onClick={clearData}> Clear Data</button>
      {data.map((d, index) => <ProjectData key={index} data={d} />)}    */}
    
      {/* custom renderer for this marker
      {({ styles, date }) => {
        const customStyles = {
          ...styles,
          backgroundColor: 'deeppink',
          width: '4px'
        }
        return <div style={customStyles}  />
      }} */}
  </div>
);
}

export default App;
