import React from 'react';
import Timeline, { 
    TimelineMarkers,
    TodayMarker }
    from 'react-calendar-timeline'
  // make sure you include the timeline stylesheet or the timeline will not be styled
  import './Timeline.css'
  import moment from 'moment'



const progress = 'Complete'
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
    borderStyle: BORDER_STYLE,
    borderColor: iconBorders.Complete,
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



// {
//     id: 1,
//     group: 1,
//     //title: 'item 1',
//     style: {
//       background: 'red',
//       marginLeft: 100
//     },
//     start_time: new Date('3/6/2020'),
//     end_time: new Date('5/9/2020'),
//     itemProps: {
//       style: {
//         background: 'blue',
//         borderColor: 'blue',
//         left: '50%',
//       }
//     }
//   },
// const groups = [
//     { 
//       id: 1, 
//       title: 'Project 1', 
//       stackItems: true,
//       rightTitle: 'hi'
//     },
//     { 
//       id: 2, 
//       title: 'Project 2', 
//       stackItems: true 
//     }, 
//     { 
//       id: 3, 
//       title: 'Project 3',
//       stackItems: true 
//     }, 
//     { 
//       id: 4, 
//       title: 'Project 4',
//       stackItems: false 
//     },
//     { 
//       id: 5, 
//       title: 'Project 5',
//       stackItems: false 
//     }
//   ]
  
//   const items = [
//     {
//       id: 1,
//       group: 1,
//       //title: 'item 1',
//       style: {
//         background: 'red',
//         marginLeft: 100
//       },
//       start_time: new Date('3/6/2020'),
//       end_time: new Date('5/9/2020'),
//       itemProps: {
//         style: {
//           background: 'blue',
//           borderColor: 'blue',
//           left: '50%',
//         }
//       }
//     },
//     {
//       id: 6,
//       group: 1,
//       title: <div style={{...styles.customIconStyle, backgroundColor: 'green'}}/>,
//       start_time: new Date('2/27/2020'),
//       end_time: new Date('2/27/2020'),
//       itemProps: {
//         style: {
//           background: 'rgb(0,0,0,0)',
//           borderColor: 'rgb(0,0,0,0)',
//           width: 0
//         }
//       }
//     },
//     {
//       id: 2,
//       group: 2,
//       //title:  'item 2',
//       start_time: new Date('5/5/2020'),
//       end_time: new Date('6/7/2020'),
//       itemProps: {
//         style: {
//           background: 'pink',
//           borderColor: 'pink',
//         }
//       }
//     },
//     {
//       id: 3,
//       group: 3,
//       //title: 'item 3',
//       start_time: new Date('4/7/2020'),
//       end_time: new Date('6/7/2020'),
//       itemProps: {
//         style: {
//           background: 'red',
//           borderColor: 'red',
//         }
//       }
//     },
//     {
//       id: 4,
//       group: 4,
//       //title: 'item 4',
//       start_time: new Date('6/6/2020'),
//       end_time: new Date('9/9/2020'),
//       itemProps: {
//         style: {
//           background: 'purple',
//           borderColor: 'purple',
//         }
//       }
      
//     },
//     {
//       id: 5,
//       group: 4,
//       title: <div style={styles.customIconStyle}/>,
//       start_time: new Date('6/8/2020'),
//       end_time: new Date('6/8/2020'),
//       itemProps: {
//         style: {
//           background: 'rgb(0,0,0,0)',
//           borderColor: 'rgb(0,0,0,0)',
//           width: 0
//         }
//       }
//     }
//   ]

function ProjectData({data}) {
  // logic will go here

  // Scale dimensions
  const groups = [
    {
        id: data.num_project,
        title: data.project,
        stackItems: true,
    }
]

const items = [
    {
        id: data.num_project,
        group: data.num_project,
        style: {
            background: 'red',
            marginLeft: 100
          },
        start_time: new Date(data.projected_date),
        end_time: new Date(data.commit_date),
        itemProps: {
            style: {
                background: 'blue',
                borderColor: 'blue',
                left: '50%',
            }
        }

    }
]
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

