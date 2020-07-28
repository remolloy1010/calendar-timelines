import groupedDataByProject from "./groupedDataByProject";
import slipRate from './slipRate'
import getSum from './getSum'
import commitCompletionDate from "./commitCompletionDate";
import projectedCompletionDate from './projectedCompletionDate'
// import { max } from "lodash";
import min from 'lodash/min';
import max from 'lodash/max';
import timeDuration from './timeDuration';

    function projectStartDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let startDateArray = [];
            groupedData[key].forEach(eachInstance => {
                startDateArray.push(new Date(eachInstance.start_date).getTime())
                // console.log('startArray start_date:', eachInstance.start_date)
            });
            // console.log('start date array:', startDateArray)

            return startDateArray
        });
        
    }

    function projectCommitEndDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let endCommitDateArray = [];
            groupedData[key].forEach(eachInstance => {
                endCommitDateArray.push(new Date(eachInstance.commit_date).getTime())
                // console.log('startArray start_date:', eachInstance.start_date)
            });
            // console.log('end commit array:', endCommitDateArray)

            return endCommitDateArray
        });
        
    }

    function projectProjectedEndDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let endProjectedDateArray = [];
            groupedData[key].forEach(eachInstance => {
                endProjectedDateArray.push(new Date(eachInstance.projected_date).getTime())
                // console.log('startArray start_date:', eachInstance.start_date)
            });
            // console.log('end projected array:', endProjectedDateArray)
            // console.log('max end projected date', min(endProjectedDateArray))

            return endProjectedDateArray
        });
        
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
                //console.log('slipRateArray:', slipRateArray)
            });
            
            return slipRateArray
        }); 
    }

export default function projectSummary(groupedData){

    const projectNames = Object.keys(groupedData)

    let projectSummary = [];
    for (let i = 0; i < projectNames.length; i++) {
       
    projectSummary.push({
      project_name: projectNames[i], 
      num_of_milestones: numOfMilestonesPerProject(groupedData)[i],
      total_revenue: totalRevenueImpactperProject(groupedData)[i],
      priority: priorityPerProject(groupedData)[i],
      commit_completion_date: new Date(max(projectCommitEndDate(groupedData)[i])),
      sum_slip_rate: (getSum(avgSlipRate(groupedData)[i])),
      projected_completion_date: new Date(max(projectProjectedEndDate(groupedData)[i])),
      project_start_date: new Date(min(projectStartDate(groupedData)[i]))
    });
  }
  console.log('project summary data', projectSummary)

  //console.log("Project Summary: ", projectSummary)
  return projectSummary
}