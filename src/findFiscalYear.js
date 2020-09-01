export default function findFiscalYear(projectSummaryCompletionDate){
    let fiscalStartMonth = 10;
    let fiscalYear = 0;
    let projectCompletionMonth = new Date(projectSummaryCompletionDate).getMonth()

    if (projectCompletionMonth < 9){
        fiscalYear = new Date(projectSummaryCompletionDate).getFullYear()
    }
    else{
        fiscalYear = new Date(projectSummaryCompletionDate).getFullYear() + 1
    }

    return fiscalYear
}