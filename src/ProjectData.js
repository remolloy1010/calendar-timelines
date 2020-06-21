import React from 'react';
import Timeline from 'react-calendar-timeline'
  // make sure you include the timeline stylesheet or the timeline will not be styled
  import './Timeline.css'
  import moment from 'moment'



// const progress = 'Complete'
//const colorIcon = iconColors('Complete')

// Constants for styles:
const BORDER_WIDTH = '1px';
const BORDER_STYLE = 'solid';
const ICON_WIDTH = 12;
const ICON_HEIGHT = 12;
const ICON_MARGIN_LEFT = -ICON_WIDTH/2;
const ICON_MARGIN_TOP = 3;

const iconColors = {
   Complete: 'green',
   OnTrack: 'yellow',
   Late: 'red'
}

const iconBorders = {
  Complete: 'green',
  OnTrack: 'orange',
  Late: 'crimson'
}

const styles = {
  iconStyle: {
    //borderColor: 'green',
    height: 30,
    borderColor: 'crimson',
    fill: 'green',


  },
  customIconStyle: {
    // backgroundColor: iconColors.Complete,
    backgroundColor: 'green',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: BORDER_WIDTH,
    transform: 'rotate(45deg)',
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
    //marginLeft: -12,
    //marginLeft: 'calc(${ICON_WIDTH/2}px)'
    marginLeft: ICON_MARGIN_LEFT,
    marginTop: ICON_MARGIN_TOP,
    display: 'flex',
    align: 'center'
  }
}

const today = Date.now()
const startOfMonth = moment().startOf('month')
//const endOfMonth = moment().endOf('month')
//const oneYearLater = Date.now()
const oneYearLater = moment().endOf('month').add(1, 'years');     



function projectedDateColor(projectedDate, targetDate, commitDate) {
  const totalDateLength = commitDate.getTime() - targetDate.getTime()
  const dateToCommitment = (projectedDate.getTime() - targetDate.getTime())/totalDateLength
  
  if (dateToCommitment <= 0.25) {
    return 'red'
  }
  else if(dateToCommitment <= 0.75) {
    return'yellow'
  }
  else if (dateToCommitment > 0.75) {
    //const dateLength = commitDate.getTime() - targetDate.getTime()
    return 'green'
  }
  else {
    return "error"
  }
  // console.log(dateToCommitment)
  //let diamondColor = (projectedDate > targetDate ? 'green' : 'red')
  //return diamondColor
}

function isProjectComplete(completeYorN, projectedDate, targetDate, commitDate) {
  return (completeYorN == 'Y' ? projectedDateColor(projectedDate, targetDate, commitDate) : '#bdbdbd' )
}

const date1 = new Date('10/15/2019')
const date2 = new Date('11/1/2019')
const date3 = new Date('1/30/2020')
console.log('function color', projectedDateColor(date1, date2, date3))
//console.log('date to commitment date', dateToCommitment)

console.log(date1.getTime())


function ProjectData({data}) {

  let groups = [];
  for (let i = 0; i < data.length; i++) {
    groups.push({
      //id: `${i + 1}`,
      id: i + 1, 
      title: data[i].project,
      stackItems: true
    });
  }

  let items = [];
  for (let i = 0; i < data.length; i++) {
    items.push({   
    
      id: items.length,
      group: i + 1,
      style: {
        background: 'red',
        marginLeft: 100
      },
      start_time: new Date(data[i].target_date),
      end_time: new Date(data[i].commit_date),
      itemProps: {
        style: {
          background: '#bdbdbd',
          borderColor: '#bdbdbd',
          left: '50%',
        }
      }
    })
    items.push({
      id: items.length,
      group: i + 1,
      title: (
        <div style={{
          ...styles.customIconStyle, 
          borderColor: projectedDateColor(new Date(data[i].projected_date), new Date(data[i].target_date), new Date(data[i].commit_date)), 
          backgroundColor: isProjectComplete(data[i].complete, new Date(data[i].projected_date), new Date(data[i].target_date), new Date(data[i].commit_date))
        }}/>
      ),
      start_time: new Date(data[i].projected_date),
      end_time: new Date(data[i].projected_date),
      itemProps: {
      style: {
              background: 'rgb(0,0,0,0)',
              borderColor: 'rgb(0,0,0,0)',
              width: 0
              }
          }
    })
  }

  http://localhost:3000/
  console.log('data', data)
  console.log('groups', groups)
  console.log('items', items)
  // let dataIndex = []
  // // for (let i = 0; i <3; i++){
  // for (let [key, value] of Object.entries(data)) {
  //   console.log(`${key}: ${value}`);
  //   //console.log(data.projected_date)
  //   dataIndex.push(data.projected_date)
  //   // console.log(dataIndex)
  // }
  // console.log(data)
  //}.projected_date)
  
  // console.log(data.entries())
 
  // Object.entries(data).forEach(entry => {
  //   let key = entry[0];
  //   let value = entry[1]
  // })

  
    return(
        <Timeline 
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        minZoom={1000 * 60 * 60 * 24 * 30 * 6}
        maxZoom={86400000 * 365}
        defaultTimeStart={startOfMonth}
        defaultTimeEnd={oneYearLater}
      >
         
      </Timeline>
    )
}

export default ProjectData;

