import React from "react";
import Timeline, {
  TimelineHeaders,
  DateHeader,
  SidebarHeader,
  TodayMarker,
} from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "./Timeline.css";
import moment from "moment";
//import TreeMenu from 'react-simple-tree-menu'
import { Typography, createMuiTheme } from "@material-ui/core";
import _ from "lodash";
// import groupedDataObject from './groupedDataObject'

// Constants for styles:
const BORDER_WIDTH = "2px";
const BORDER_STYLE = "solid";
const ICON_WIDTH = 12;
const ICON_HEIGHT = 12;
const ICON_MARGIN_LEFT = -ICON_WIDTH / 2;
const ICON_MARGIN_TOP = 3;
const LEFT_SIDEBAR_WIDTH = 300; 

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      text: {
        color: "white",
        marginTop: 10,
      },
    },
  },
});

const styles = {
  iconStyle: {
    //borderColor: 'green',
    height: 30,
    borderColor: "crimson",
    fill: "green",
  },
  todayMarkerStyle: {
    backgroundColor: "red",
    width: 3,
  },
  rightSidebarStyles: {
    align: "center",
    //backgroundColor: 'red',
    marginLeft: 240,
    color: "white",
    //width: 350,
    marginTop: 20,
  },
  leftSidebarStyles: {
    align: "center",
    marginTop: 20,
    color: "white",
    width: LEFT_SIDEBAR_WIDTH,
  },
  titleStyle: {
    marginLeft: 10,
  },
  customIconStyle: {
    // backgroundColor: iconColors.Complete,
    backgroundColor: "green",
    borderColor: "white",
    borderStyle: BORDER_STYLE,
    borderWidth: BORDER_WIDTH,
    transform: "rotate(45deg)",
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
    //marginLeft: -12,
    //marginLeft: 'calc(${ICON_WIDTH/2}px)'
    marginLeft: ICON_MARGIN_LEFT,
    marginTop: ICON_MARGIN_TOP,
    display: "flex",
    align: "center",
  },
};

const today = Date.now();
const startOfMonth = moment().startOf("month");
const oneYearLater = moment().endOf("month").add(1, "years");

function outlineColor(complete, projectedDate, targetDate, commitDate) {
  const totalDateLength = commitDate.getTime() - targetDate.getTime();
  const dateToCommitment =
    (projectedDate.getTime() - targetDate.getTime()) / totalDateLength;

  if (dateToCommitment <= 0.5) {
    return "green";
  } else if (dateToCommitment <= 1.0 && complete === "N") {
    return "yellow";
  } else if (dateToCommitment <= 1.0 && complete === "Y") {
    return "green";
  } else if (dateToCommitment > 1.0) {
    return "red";
  } else {
    return "error";
  }
}

function isProjectCompleteSolidColor(
  complete,
  projectedDate,
  targetDate,
  commitDate
) {
  if (complete === "Y") {
    return outlineColor(complete, projectedDate, targetDate, commitDate);
  } else if (complete === "N") {
    return "#bdbdbd";
  }
}

// ProjectData() function: iterate through # of projects, and for # of milestones in each project, show timeline of milestones on one project line
function ProjectData({ data, projectSummary, groupedDataObject }) {
  const projectNamesList = Object.keys(groupedDataObject(data));
  console.log('project summary:', projectSummary(groupedDataObject(data)))
  let groups = [];
  let items = [];
  for (let i = 0; i < projectNamesList.length; i++) {

    // Show each unique project on one line
    groups.push({
      id: i + 1,
      title: <Typography align='center'> {projectNamesList[i]} </Typography>,
      stackItems: true,
      rightTitle: data[i].comments,
    });
  // }

  // let items = [];
  for (let j = 0; j < projectSummary(groupedDataObject(data))[i].num_of_milestones; j++) {


    
    // Target and Commit Date Data
    items.push({
      id: items.length,
      group: i + 1,
      // style: {
      //   background: "red",
      //   marginLeft: 100,
      // },
      start_time: new Date(
        groupedDataObject(data)[projectNamesList[i]][j].target_date
      ),
      end_time: new Date(
        groupedDataObject(data)[projectNamesList[i]][j].commit_date
      ),
      itemProps: {
        style: {
          background: "#bdbdbd",
          borderColor: "#bdbdbd",
          left: "50%",
          zIndex: 0
        },
      },
    });


    // Projected Date Data
    items.push({
      id: items.length,
      group: i + 1,
      title: (
        <div
          style={{
            ...styles.customIconStyle,
            borderColor: outlineColor(
              groupedDataObject(data)[projectNamesList[i]][j].complete,
              new Date(groupedDataObject(data)[projectNamesList[i]][j].projected_date),
              new Date(groupedDataObject(data)[projectNamesList[i]][j].target_date),
              new Date(groupedDataObject(data)[projectNamesList[i]][j].commit_date)
            ),
            backgroundColor: isProjectCompleteSolidColor(
              groupedDataObject(data)[projectNamesList[i]][j].complete,
              new Date(groupedDataObject(data)[projectNamesList[i]][j].projected_date),
              new Date(groupedDataObject(data)[projectNamesList[i]][j].target_date),
              new Date(groupedDataObject(data)[projectNamesList[i]][j].commit_date)
            ),
          }}
        />
      ),
      start_time: new Date(groupedDataObject(data)[projectNamesList[i]][j].projected_date),
      end_time: new Date(groupedDataObject(data)[projectNamesList[i]][j].projected_date),
      itemProps: {
        style: {
          background: "rgb(0,0,0,0)",
          borderColor: "rgb(0,0,0,0)",
          width: 0,
        },
      },
    });

  }

}

  var groupedData = _.groupBy(data, "project");
  console.log("data", data);
  console.log("groups", groups);
  console.log("items", items);

  const today = Date.now();
  return (
    <>
      <Timeline
        groups={groups}
        items={items}
        minZoom={1000 * 60 * 60 * 24 * 30 * 6}
        maxZoom={86400000 * 365 * 3}
        defaultTimeStart={startOfMonth}
        defaultTimeEnd={oneYearLater}
        sidebarWidth={LEFT_SIDEBAR_WIDTH}
        rightSidebarWidth={525}
      >
        <TodayMarker interval={2000} />
        <TodayMarker date={today}>
          {({ styles: localStyles }) => (
            <div style={{ ...localStyles, ...styles.todayMarkerStyle }} />
          )}
        </TodayMarker>

        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div style={styles.leftSidebarStyles}>
                  <Typography variant="subtitle1" align="center">
                    Projects
                  </Typography>
                </div>
              );
            }}
          </SidebarHeader>

          <SidebarHeader variant="right">
            {({ getRootProps, data }) => {
              return (
                <div style={styles.rightSidebarStyles}>
                  <Typography variant="subtitle1" align="center">
                    Comments
                  </Typography>
                </div>
              );
            }}
          </SidebarHeader>

          <DateHeader unit="primaryHeader"></DateHeader>
          <DateHeader unit="month" labelFormat="MMM"></DateHeader>
        </TimelineHeaders>
      </Timeline>
    </>
  );
}

export default ProjectData;
