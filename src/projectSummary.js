import groupedDataByProject from "./groupedDataByProject";
import slipRate from "./slipRate";
import getSum from "./getSum";
import commitCompletionDate from "./commitCompletionDate";
import projectedCompletionDate from "./projectedCompletionDate";
import min from "lodash/min";
import max from "lodash/max";
// import findFiscalYear from "./findFiscalYear";

function projectStartDate(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let startDateArray = [];
    groupedData[key].forEach((eachInstance) => {
      startDateArray.push(new Date(eachInstance.start_date).getTime());
    });

    return startDateArray;
  });
}

function projectCommitEndDate(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let endCommitDateArray = [];
    groupedData[key].forEach((eachInstance) => {
      endCommitDateArray.push(new Date(eachInstance.commit_date).getTime());
    });

    return endCommitDateArray;
  });
}

function projectProjectedEndDate(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let endProjectedDateArray = [];
    groupedData[key].forEach((eachInstance) => {
      endProjectedDateArray.push(
        new Date(eachInstance.projected_date).getTime()
      );
    });

    return endProjectedDateArray;
  });
}

function isProjectComplete(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let isCompleteArray = [];
    groupedData[key].forEach((eachInstance) => {
      isCompleteArray.push(eachInstance.complete);
    });

    return isCompleteArray;
  });
}

function totalRevenueImpactperProject(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let total = 0;
    groupedData[key].forEach((eachInstance) => {
      total = total + eachInstance.revenue;
    });

    return total;
  });
}
function numOfMilestonesPerProject(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let total = 0;
    groupedData[key].forEach((eachInstance) => {
      total = total + 1;
    });

    return total;
  });
}

function priorityPerProject(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let priorityArray = [];
    groupedData[key].forEach((eachInstance) => {
      priorityArray = eachInstance.priority;
    });

    return priorityArray;
  });
}

function projectCommitDate(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let priorityArray = [];
    groupedData[key].forEach((eachInstance) => {
      priorityArray = eachInstance.commit_date;
    });

    return priorityArray;
  });
}

function avgSlipRate(groupedData) {
  return Object.keys(groupedData).map((key) => {
    let slipRateArray = [];
    groupedData[key].forEach((eachInstance) => {
      slipRateArray.push(
        slipRate(
          new Date(eachInstance.commit_date),
          new Date(eachInstance.projected_date),
          eachInstance.complete
        )
      );
    });

    return slipRateArray;
  });
}

function findFiscalYear(projectSummaryCompletionDate){
  let fiscalStartMonth = 10;
  let fiscalYear = 0;
  let projectCompletionMonth = new Date(projectSummaryCompletionDate).getMonth()
 
  if (projectCompletionMonth < fiscalStartMonth){
      let fiscalYear = new Date(projectSummaryCompletionDate).getFullYear()
  }
  else{
      let fiscalYear = new Date(projectSummaryCompletionDate).getFullYear() + 1
  }
  
  

  return fiscalYear

}

export default function projectSummary(groupedData) {
  const projectNames = Object.keys(groupedData);

  let projectSummary = [];
  for (let i = 0; i < projectNames.length; i++) {
    projectSummary.push({
      project_name: projectNames[i],
      num_of_milestones: numOfMilestonesPerProject(groupedData)[i],
      total_revenue: totalRevenueImpactperProject(groupedData)[i],
      priority: priorityPerProject(groupedData)[i],
      commit_completion_date: new Date(
        max(projectCommitEndDate(groupedData)[i])
      ),
      sum_slip_rate: getSum(avgSlipRate(groupedData)[i]),
      projected_completion_date: new Date(
        max(projectProjectedEndDate(groupedData)[i])
      ),
      project_start_date: new Date(min(projectStartDate(groupedData)[i])),
      complete:
        isProjectComplete(groupedData)[i].every((val, i) => val === "Y") ===
        true
          ? "Y"
          : "N",
      
    });
  }
<<<<<<< HEAD
  // console.log("project summary data", projectSummary);
  // console.log(findFiscalYear(new Date(max(projectProjectedEndDate(groupedData)[0]))))
=======
>>>>>>> calendar-section-test-branch
  

  return projectSummary;
}
