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
// import { colors } from '@material-ui/core';
import { DataImporter } from './DataImporter';
import ProjectData from './ProjectData';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DataTable from './DataTable'
import SummaryTable from './SummaryTable'
import CollapsibleTable from './CondensedSummaryTable';
import GroupedData from './GroupedData'


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
  }
}
const useStyles = ({
  headerStyle: {
    background: 'linear-gradient(45deg, #1a237e 30%, #1e88e5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 105, 135, .3)',
    color: 'white',
    height: 50,
    padding: '0 30px',
    fontWeight: 'bold'
  },
});


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
    
    <div style={useStyles.headerStyle}>
            <Typography variant="h4" align="center" data={data} >
             Project Timelines
            </Typography>
          </div>
    <div style={styles.paddingStyle}>
      <DataImporter onDataUpload={handleDataUpload}/>
      <button onClick={clearData}> Clear Data</button></div> 
      <ProjectData data={data}/>
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <DataTable data={data}></DataTable>
      </div>
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <SummaryTable data={data}></SummaryTable>
      </div>
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <CollapsibleTable data={data}></CollapsibleTable>
      </div>
      <div style={{...styles.paddingStyle, marginTop: 30, marginRight: 150, marginLeft: 150}}>
        <GroupedData data={data}></GroupedData>
      </div>
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
