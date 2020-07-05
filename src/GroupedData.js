import React from 'react';
import _ from 'lodash';
import CollapsibleTable from './CondensedSummaryTable'


export default function GroupedData({data}) {
    console.log("data:", data)
    //Group Data based on Project Name
    
    var groupedData = _.groupBy(data,'project');
    console.log('grouped data:', groupedData)

    function totalRevenueImpactperProject(groupedData) {
      return Object.keys(groupedData).map(key => {
        let total = 0;
        groupedData[key].forEach(eachInstance => {
            total = total + eachInstance.revenue 
        });
        
        return total
      });

    }
    function numOfMilestonesPerProject(groupedData) {
        return Object.keys(groupedData).map(key => {
          let total = 0;
          groupedData[key].forEach(eachInstance => {
              total = total + 1 
          });
          
          return total
        });
  
      }
    // function groupedDataArray(groupedData) {
    //     return Object.keys(groupedData).map(key => {
    //       let groupedDataArray = [];
    //       groupedData[key].forEach(eachInstance => {
    //           groupedDataArray = groupedDataArray + eachInstance.revenue 
    //       });
          
    //       return groupedDataArray
    //     });
  
    //   }
    

    function priorityPerProject(groupedData) {
    return Object.keys(groupedData).map(key => {
        let priorityArray = [];
        groupedData[key].forEach(eachInstance => {
            priorityArray = eachInstance.priority 
        });
        
        return priorityArray
    });

    }

    const projectNames = Object.keys(groupedData)
    //const priority = Object.keys(groupedData.priority)
    const titleOfGroupedDataMap = ['project_names', 'total_revenue', 'num_of_milestones']
    console.log('Title of Mapped Data', titleOfGroupedDataMap)
    console.log('Project Names:', projectNames) 
    console.log('Total Revenue per Project Array:', totalRevenueImpactperProject(groupedData))
    console.log('Number of Milestones per Project:', numOfMilestonesPerProject(groupedData))
    console.log('Priority Array:', priorityPerProject(groupedData))
    
    let projectSummary = [];
    for (let i = 0; i < projectNames.length; i++) {
       
    projectSummary.push({
      project_name: projectNames[i], 
      num_of_milestones: numOfMilestonesPerProject(groupedData)[i],
      total_revenue: totalRevenueImpactperProject(groupedData)[i],
      priority: priorityPerProject(groupedData)[i]
    });
  }
  console.log("Project Summary: ", projectSummary)

    // let total = 0;
    //   for(let i = 0; i < arrayToAverage.length; i++) {
    //     total += arrayToAverage[i];
    //   }
    //     return Math.round(total/arrayToAverage.length)
    // }
    // console.log('groupedDataArray:',groupedDataArray(groupedData))
    // export default function GroupedData({projectSummary}) {
    return (
    //   <Row groupedData={groupedData} />
      <CollapsibleTable projectSummary={projectSummary}> </CollapsibleTable>
    );
  }
