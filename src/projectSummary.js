import groupedDataByProject from "./groupedDataByProject";
import slipRate from './slipRate'
import getSum from './getSum'
import commitCompletionDate from "./commitCompletionDate";
import projectedCompletionDate from './projectedCompletionDate'


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
      commit_completion_date: commitCompletionDate(groupedData)[i],
      sum_slip_rate: (getSum(avgSlipRate(groupedData)[i])),
      projected_completion_date: projectedCompletionDate(groupedData)[i],
    });
  }
  console.log("Project Summary: ", projectSummary)
  return projectSummary
}