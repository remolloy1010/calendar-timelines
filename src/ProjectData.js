import React from 'react';
import Timeline, { TimelineHeaders, DateHeader, SidebarHeader } from 'react-calendar-timeline'
  // make sure you include the timeline stylesheet or the timeline will not be styled
  import './Timeline.css'
  import moment from 'moment'
//import TreeMenu from 'react-simple-tree-menu'



// Constants for styles:
const BORDER_WIDTH = '1px';
const BORDER_STYLE = 'solid';
const ICON_WIDTH = 12;
const ICON_HEIGHT = 12;
const ICON_MARGIN_LEFT = -ICON_WIDTH/2;
const ICON_MARGIN_TOP = 3;

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
    borderStyle: BORDER_STYLE,
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

//const today = Date.now()
const startOfMonth = moment().startOf('month')
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
    return 'green'
  }
  else {
    return "error"
  }
}

function isProjectComplete(completeYorN, projectedDate, targetDate, commitDate) {
  return (completeYorN === 'Y' ? projectedDateColor(projectedDate, targetDate, commitDate) : '#bdbdbd' )
}


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

  
  console.log('tree data', treeData)
  console.log('data', data)
  console.log('groups', groups)
  console.log('items', items)

  
    return(
        <Timeline 
        groups={groups}
        items={items}
        minZoom={1000 * 60 * 60 * 24 * 30 * 6}
        maxZoom={86400000 * 365* 3}
        defaultTimeStart={startOfMonth}
        defaultTimeEnd={oneYearLater}
        
      >
      
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Project 1</div>
            }}
          </SidebarHeader>
          <DateHeader 
            unit="primaryHeader">
          </DateHeader>
          <DateHeader
          
            unit="month"
            labelFormat="MMM"
          >
          </DateHeader>

        </TimelineHeaders>
         
      </Timeline>
    )
}

export default ProjectData;

