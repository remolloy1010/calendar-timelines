import React from 'react';
import _ from 'lodash';
import CollapsibleTable from './CollapsibleTable'
import groupedDataByProject from './groupedDataByProject'
import SummaryTable from './SummaryTable';
import getAverage from './getAverage'
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
                //console.log('slipRateArray:', slipRateArray)
            });
            
            return slipRateArray
        }); 
    }

    // function avgSlipRatePerProject(indivArraytoSum){
    //     let sum = 0;
    //     for(const slipRateVal of indivArraytoSum){
    //         console.log('slipRateVal:', slipRateVal)
    //         if(typeof(slipRateVal) !== 'number'){
    //             sum += 0;
    //         }
    //         else{
    //             sum = sum + slipRateVal
    //         }
    //         console.log('sum:', sum)
    //         return sum
    //     }
        
    // }


    //CREATE SLIP RATE ARRAY
    // let slipRateArray = [];
    // for (let i = 0; i < groupedData.length; i++) {
    //     slipRateArray.push(slipRate(new Date(groupedData[i].commit_date), new Date(groupedData[i].projected_date), groupedData[i].complete))
    // }
    // console.log("Slip Rate Array: ", slipRateArray)
    // console.log("Success Rate:", successRate(slipRateArray))

    const projectNames = Object.keys(groupedData)
    //const priority = Object.keys(groupedData.priority)
    const titleOfGroupedDataMap = ['project_names', 'total_revenue', 'num_of_milestones']
    // console.log('Title of Mapped Data', titleOfGroupedDataMap)
    // console.log('Project Names:', projectNames) 
    // console.log('Total Revenue per Project Array:', totalRevenueImpactperProject(groupedData))
    // console.log('Number of Milestones per Project:', numOfMilestonesPerProject(groupedData))
    // console.log('Priority Array:', priorityPerProject(groupedData))
    console.log('Avg Slip Rate:', avgSlipRate(groupedData))
    
    console.log('getSum:', getSum(avgSlipRate(groupedData)[1]))



    //for(let i=0; i < avgSlipRate(groupedData).length; i++){
    //   function findSumPerProject(groupedData){
    //     let allProjectsSum = [];
    //     for(const array of avgSlipRate(groupedData)){
    //         console.log('array:', array)
    //         let sum = 0;
    //         for(const val of array){
    //             console.log('val:', val)
    //             if(typeof(val) !== 'number'){
    //                 sum += 0;
    //             }
    //             else{
    //                 sum += val
    //             }
    //             console.log('sum:', sum)
                
    //         }
    //         allProjectsSum.push(sum)
    //         console.log('allProjectsSum:', allProjectsSum)
    //     }  
    //     return sum
    // }
    

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
//   console.log(projectSummary.avg_slip_rate)

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
        <>
        <CollapsibleTable projectSummary={projectSummary} groupedData={groupedData}> </CollapsibleTable>
        {/* <SummaryTable projectSummary={projectSummary}></SummaryTable> */}
        {/* <SummaryTable groupedData={groupedData}> </SummaryTable> */}
        </>
    );
  }
