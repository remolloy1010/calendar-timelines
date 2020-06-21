import React, { useState } from 'react';
import './App.css';
import Timeline, { 
  TimelineMarkers,
  TodayMarker }
  from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import './Timeline.css'
import moment from 'moment'
import DetailsIcon from '@material-ui/icons/Details';
import DetailsTwoToneIcon from '@material-ui/icons/DetailsTwoTone';
import { colors } from '@material-ui/core';
import { DataImporter } from './DataImporter';
import ProjectData from './ProjectData';






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

const today = Date.now()
const date = '5/7/2020'

function App() {

  // return <div />

  const [data, setData] = useState(getBrowserData());
  const handleForce = (data, fileInfo) => console.log(data, fileInfo);
  
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

  return (
    <div>
    <DataImporter onDataUpload={handleDataUpload}/>
    <button onClick={clearData}> Clear Data</button>
    <ProjectData data={data}/>

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
