import projectSummary from './projectSummary';
import groupedDataObject from './groupedDataObject';
import data from './App'

// export default function numCompletedProjectsPerYear(isProjectComplete, projectSummaryCompletionDate){

//     function findFiscalYear(isProjectComplete, projectSummaryCompletionDate){
//         let fiscalStartMonth = 10;
//         let fiscalYear = 0;
//         let projectCompletionMonth = new Date(projectSummaryCompletionDate).getMonth()
//         if (isProjectComplete === 'Y'){
//             if (projectCompletionMonth < fiscalStartMonth){
//                 let fiscalYear = new Date(projectSummaryCompletionDate).getFullYear()
//             }
//             else{
//                 let fiscalYear = new Date(projectSummaryCompletionDate).getFullYear() + 1
//             }
//         }
        

//         return fiscalYear
//         console.log('fiscal year:', fiscalYear)

//     }

    
//     let completeProjectsCount = 0
//     let completionYearObj = {}
//     console.log('isProjectComplete?', isProjectComplete)

    
//     // console.log('completionYearObj: ', findFiscalYear(projectSummary(groupedDataObject(data))[0].projected_completion_date))
    

    
//     function countProjectsPerFiscalYear(findFiscalYear){
//         let count = 0;
        
//         if (isProjectComplete === 'Y') {
//             count += 1

//         }
//         else{
//             count += 0
//         }
//         return count
//     }


//         let projectCompletionYear = new Date(projectSummaryCompletionDate).getFullYear()
//         let projectCompletionMonth = new Date(projectSummaryCompletionDate).getMonth()
//         completeProjectsCount += 1
//         console.log('year:', projectCompletionYear)
//         console.log('month:', projectCompletionMonth)

//     }
    
//     let fiscalYearDict = {};
//     for (let i=0; i < projectSummary(groupedDataObject(data)).length; i++){
//         fiscalYearDict[findFiscalYear(projectSummary(groupedDataObject(data))[i].projected_completion_date)] = countProjectsPerFiscalYear(findFiscalYear(projectSummary(groupedDataObject(data))[i].projected_completion_date))
//     }
//     console.log('fiscalYearDict: ', fiscalYearDict) 

    
//     return completeProjectsCount
// }

