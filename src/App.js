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
import CollapsibleTable from './CollapsibleTable';
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
import isDataEmpty from './isDataEmpty';
import timeDuration from './timeDuration'
import slipRate from './slipRate'
import min from 'lodash/min'
import max from 'lodash/max'


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

  // Slip Rate Array
  let count = 0;
  // let slipCount = 0;
  let slipRateArray = [];

  for(let i=0; i < data.length; i++) {
    let slipRateVal = slipRate(data[i].commit_date, data[i].projected_date, data[i].complete)
    if(slipRateVal === '-'){
      count += 0;      // slipCount += 0;
      // console.log('empty')
    }
    else{
      let slipRatePrctg = Math.round(slipRateVal/timeDuration(data[i].start_date, data[i].projected_date)*100)
      slipRateArray.push(slipRatePrctg)
      count += 1;
    }
  }
  console.log('slipRateArray', slipRateArray)
  console.log('count', count)

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

  console.log('show data:', data)

  // let title = data[0].timelines_title ? 'blank' : 'stranger'
  if(data.length === 0){
    
  }
  function title(data){
    // if(data.length){
    //   titleName = ''
    // }

    const blah = []
    // window.alert(blah === blah ? 'True' : 'False');
    // window.alert([] === [] ? 'True' : 'False');
      
      if(!data.length){
        return ''
      }
      else{
        return data[0].timelines_title
      }
      
    
    
  }
    // let appTitle = (data === [] ? 'HI' : data[0].timelines_title)

  // {title(data, data[0].title)}
  // return Object.is(data, undefined) ? 10 : 5;


  // var data[0].timelines_title = (typeof x === 'undefined') ? your_default_value : x;
  // {data[0].timelines_title}
  // console.log('timeDuration', timeDuration(data[0].start_date, data[0].projected_date))
  // console.log('slipRate in days', slipRate(data[0].commit_date, data[0].projected_date, data[0].complete))
  // console.log('slipRate', Math.round(slipRate(data[0].commit_date, data[0].projected_date, data[0].complete)/timeDuration(data[0].start_date, data[0].projected_date)*100) +'%')

  // const arrayOfDates = ["5/30/2019", '9/30/2019', "11/29/2019"]
  // let maxDate = max(arrayOfDates)
  // console.log('get time0:', new Date(arrayOfDates[0]).getTime())
  // console.log('get time1:', new Date(arrayOfDates[1]).getTime())
  // console.log('get time2:', new Date(arrayOfDates[2]).getTime())

  // // var maxDate=new Date(Math.max.apply(null,arrayOfDates));
  // console.log('array of dates:', arrayOfDates)
  // console.log('max date:', maxDate)
  // console.log('math min date:', min([1559196000000, 1572415200000, 1575010800000]))

  // console.log('time duration:', timeDuration(projectSummary(groupedDataObject(data)).start_date, projectSummary(groupedDataObject(data)).commit_completion_date))
  // console.log('length summary data:', projectSummary(groupedDataObject(data)).length)

  let completeArray1 = ['Y', 'Y', 'Y']
  let completeArray2 = ['N', 'N', 'N']
  let completeArray3 = ['Y', 'N', 'Y']
  let completeArray4 = ['Y']

  let ANSWER = completeArray2.every( (val, i) => val === 'Y') === true ? 'Y' : 'N'
  console.log('ANSWER:', ANSWER)
  console.log('isComplete?', completeArray4.every( (val, i) => val === 'Y'))
  // completeArray1.every( (val, i) => val === 'Y')

  let slipRatePerctgArray = [];

  for(let i=0; i < projectSummary(groupedDataObject(data)).length; i++) {
    console.log("complete?:", projectSummary(groupedDataObject(data))[i].complete)
    // projectSummary(groupedDataObject(data))[i].complete
    let slipRateDays = slipRate(
      projectSummary(groupedDataObject(data))[i].commit_completion_date, 
      projectSummary(groupedDataObject(data))[i].projected_completion_date, 
      projectSummary(groupedDataObject(data))[i].complete, 
      )
    let totalProjectDays = timeDuration(
      projectSummary(groupedDataObject(data))[i].project_start_date, 
      projectSummary(groupedDataObject(data))[i].commit_completion_date
      )
    let slipRatePercentage = (slipRateDays/totalProjectDays)*100
    if (slipRatePercentage)  
    slipRatePerctgArray.push(slipRatePercentage)
    let filteredSlipRatePerctgArray = slipRatePerctgArray.filter(slipRateVal => slipRateVal != isNaN)
        // return slipRatePercentage
    console.log('slipRate:', slipRate(projectSummary(groupedDataObject(data))[i].commit_completion_date, projectSummary(groupedDataObject(data))[i].projected_completion_date, 'Y'))
    console.log('time duration:', timeDuration(projectSummary(groupedDataObject(data))[i].project_start_date, projectSummary(groupedDataObject(data))[i].commit_completion_date))
    console.log('slipRatePrctgArray:', slipRatePerctgArray)
    console.log('avg project slip rate:', getAverage(slipRatePerctgArray)+'%')
    console.log('filter:', filteredSlipRatePerctgArray)

    // console.log('slipRatePercentage', slipRatePercentage)

  }
  // console.log('slipRatePercentage', slipRatePercentage)

  // console.log('slipRate', slipRate(new Date(data[0].commit_date), new Date(data[0].projected_date))/timeDuration(new Date(data[0].start_date), new Date(data[0].projected_date))*100)
  return (

    <div>
    
    <div style={styles.headerStyle}>
    {/* {value2 && <Typography variant='h5' >
          {value2}
        </Typography>} */}
        {/* {data[0].timelines_title && <Typography variant="h4" align="center" data={data} >
             {data[0].timelines_title} Project Timelines
            </Typography>} */}
            <Typography variant="h4" align="center" data={data} >
              {title(data)} Project Timelines
            </Typography>
          </div>
    <div style={styles.paddingStyle}>
      <DataImporter onDataUpload={handleDataUpload}/>
      <button onClick={clearData}> Clear Data</button></div> 
      <ProjectData data={data}/>
      
      <div style={styles.headerStyleBlock}> 
        <div style={{...styles.headerStyle, marginTop: 15, width: 700, background: '#1a237e'}}> 
          <Typography align='center' variant='h5'>{title(data)} Portfolio Metrics</Typography> 
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
            <NumberCard variant='avatar' Icon={DollarSign} value={'$' + Math.round(getAverage(revenueArray)/12) + 'M'} title='Avg Monthly Revenue Impact'></NumberCard>
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
              <NumberCard variant='avatar' Icon={TrendingDown} value={'Projects: ' + getAverage(slipRatePerctgArray)+'%'} value2={'Milestones: ' + getAverage(slipRateArray)+'%'} title='Average Slip Rate'></NumberCard>
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
