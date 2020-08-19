import React, { useState } from 'react';
import './App.css';
import { DataImporter } from './DataImporter';
import ProjectData from './ProjectData';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GroupedData from './GroupedData'
import NumberCard from './NumberCard';
import { DollarSign, CheckCircle, TrendingDown, Clipboard } from 'react-feather';
import Grid from '@material-ui/core/Grid'
import projectSummary from './projectSummary';
import groupedDataObject from './groupedDataObject'
import getAverage from './getAverage';
import timeDuration from './timeDuration'
import slipRate from './slipRate';
import SettingsIcon from '@material-ui/icons/Settings';
import { Menu, MenuItem } from '@material-ui/core';
import Settings from './Settings';





const styles = {
  titleBarStyle: {
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
    
  },

  settingsIcon: {
    // marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute', 
    // marginLeft: 500,
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'red'
    // marginBottom: 10,
    // marginLeft: 10
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


function getBrowserData() {
  const dataString = localStorage.getItem('data') 
  if (!dataString) return []; 
  return JSON.parse(dataString) 
}


function App() {


  const [data, setData] = useState(getBrowserData());
  const [spacing] = React.useState(2);
  const classes = useStyles();

  // Total Revenue Impact
  let revenueArray = [];
  for (let i = 0; i < data.length; i++) {
      revenueArray.push(data[i].revenue)
  }
  console.log("Revenue Array: ", revenueArray)

  // Milestone Success Rate Calculation
  let successCountMilestone = 0;
  let arrayCountMilestone = 0;
  for(let i=0; i < data.length; i++){

      if (new Date(data[i].projected_date).getTime() < new Date(data[i].commit_date).getTime() && data[i].complete === 'Y'){
        successCountMilestone += 1;
        arrayCountMilestone += 1;
      }
      else if(data[i].complete === 'N'){
        successCountMilestone += 0;
        arrayCountMilestone += 0;
      }
      else{
        successCountMilestone += 0;
        arrayCountMilestone += 1;
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
      else{
        successCountProject += 0;
        arrayCountProject += 1;
      }
         
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDataUpload(data) {

    setData(data) 
    
    localStorage.setItem('data', JSON.stringify(data))
  }

  function clearData() {
    setData([]) 
    localStorage.removeItem('data') 
  }

  function handleClick() {
    alert('Hello!');
  }
  



  console.log('show data:', data)

  if(data.length === 0){
    
  }
  function title(data){

      
      if(!data.length){
        return ''
      }
      else{
        return data[0].timelines_title
      }
      
    
    
  }
  


 

  let slipRatePerctgArray = [];

  for(let i=0; i < projectSummary(groupedDataObject(data)).length; i++) {
    console.log("complete?:", projectSummary(groupedDataObject(data))[i].complete)
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
    let filteredSlipRatePerctgArray = slipRatePerctgArray.filter(slipRateVal => slipRateVal !== isNaN)
    console.log('slipRate:', slipRate(projectSummary(groupedDataObject(data))[i].commit_completion_date, projectSummary(groupedDataObject(data))[i].projected_completion_date, 'Y'))
    console.log('time duration:', timeDuration(projectSummary(groupedDataObject(data))[i].project_start_date, projectSummary(groupedDataObject(data))[i].commit_completion_date))
    console.log('slipRatePrctgArray:', slipRatePerctgArray)
    console.log('avg project slip rate:', getAverage(slipRatePerctgArray)+'%')
    console.log('filter:', filteredSlipRatePerctgArray)


  }
  
  return (

    <div>
    
    <div style={styles.headerStyle}>

            <Typography variant="h4" align="center" data={data} >
              {title(data)} Project Timelines
            </Typography>
          </div>
    
    <div style={styles.paddingStyle}>
      <DataImporter onDataUpload={handleDataUpload}/>
      <button onClick={clearData}> Clear Data</button>
      <div><Settings> </Settings></div>
          </div> 
    
      <ProjectData data={data}/>
      
      <div style={styles.headerStyleBlock}> 
        <div style={{...styles.headerStyle, marginTop: 15, width: 700, background: '#1a237e'}}> 
          <Typography align='center' variant='h5'>{title(data)} Portfolio Metrics</Typography> 

        </div>
      </div>
      <div> 
        <Grid container className={classes.root} spacing={2}> 
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
            <NumberCard variant='avatar' Icon={Clipboard} value={projectSummary(groupedDataObject(data)).length} title='# of Projects'></NumberCard>
            <NumberCard variant='avatar' Icon={DollarSign} value={'$' + Math.round(getAverage(revenueArray)/12) + 'M'} title='Avg Monthly Revenue Impact'></NumberCard>

            </Grid>
          </Grid>
        </Grid>
      </div>
      <div> 
        <Grid container className={classes.root} spacing={2}> 
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              <NumberCard variant='avatar' Icon={CheckCircle} value={'Projects: ' + Math.round((successCountProject/arrayCountProject)*100)+'%'} 
                  value2={'Milestones: '+ Math.round((successCountMilestone/arrayCountMilestone)*100)+'%'} title='Success Rate'></NumberCard>
              <NumberCard variant='avatar' Icon={TrendingDown} value={'Projects: ' + getAverage(slipRatePerctgArray)+'%'} value2={'Milestones: ' + getAverage(slipRateArray)+'%'} title='Average Slip Rate'></NumberCard>
            </Grid>
          </Grid>
        </Grid>
      </div>

 
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <GroupedData data={data}></GroupedData>
      </div>
  
  </div>
);
}

export default App;
