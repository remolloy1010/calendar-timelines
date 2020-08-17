import React from 'react';
import _ from 'lodash';
import CollapsibleTable from './CollapsibleTable'
import slipRate from './slipRate'
import getSum from './getSum'


export default function GroupedData({data}) {
    console.log("data:", data)
    //Group Data based on Project Name
    
    var groupedData = _.groupBy(data,'project');
    console.log('grouped data:', groupedData)
    console.log('length:', groupedData.length)
    // console.log('start data:', groupedData[0].start_date)

    for(let i=0; i < groupedData.length; i++){
      console.log("i", i)
      console.log('length', groupedData.length)
      // console.log("start date", groupedData[i].start_date)
    }

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

    

    function priorityPerProject(groupedData) {
    return Object.keys(groupedData).map(key => {
        let priorityArray = [];
        groupedData[key].forEach(eachInstance => {
            priorityArray = eachInstance.priority 
        });
        
        return priorityArray
    });

    }

    function projectCommitDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let priorityArray = [];
            groupedData[key].forEach(eachInstance => {
                priorityArray = eachInstance.commit_date 
            });
            
            return priorityArray
        }); 
    }

    function avgSlipRate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let slipRateArray = [];
            groupedData[key].forEach(eachInstance => {
                slipRateArray.push(slipRate(new Date(eachInstance.commit_date), new Date(eachInstance.projected_date), eachInstance.complete))
            });
            
            return slipRateArray
        }); 
    }

  


    const projectNames = Object.keys(groupedData)
    
    console.log('Avg Slip Rate:', avgSlipRate(groupedData))
    
    console.log('getSum:', getSum(avgSlipRate(groupedData)[1]))


    

    let projectSummary = [];
    for (let i = 0; i < projectNames.length; i++) {
       
    projectSummary.push({
      project_name: projectNames[i], 
      num_of_milestones: numOfMilestonesPerProject(groupedData)[i],
      total_revenue: totalRevenueImpactperProject(groupedData)[i],
      priority: priorityPerProject(groupedData)[i],
      commit_date: projectCommitDate(groupedData)[i],
      sum_slip_rate: (getSum(avgSlipRate(groupedData)[i]))
    });
  }
  console.log("Project Summary: ", projectSummary)

    return (
        <>
        <CollapsibleTable projectSummary={projectSummary} groupedData={groupedData}> </CollapsibleTable>

        </>
    );
  }
