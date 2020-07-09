import projectedCompletionDate from "./projectedCompletionDate";
import React from 'react'
import moment from 'moment'
// import { data } from './App'

// export default function countSuccesses({data}){
//     console.log('data from countSuccess:', data)

// }

// export default function countSuccesses(dataArray, projectedDate, commitDate, complete){
//         let successCount = 0;
//         let arrayCount = 0;
//         //for(const i=0; i < dataArray.length; i++){
//         //for(const dataVal of dataArray){

//             if (projectedDate.getTime() < commitDate.getTime() && complete === 'Y'){
//                 successCount += 1;
//                 arrayCount += 1;
//             }
//             else{
//                 successCount += 0;
//                 arrayCount += 1;
//             }
//         //}
//         // console.log("projectedDate", projectedDate.getTime())
//         // console.log("commitDate", commitDate.getTime())
//         // console.log("complete", complete)
//         // console.log("successCount", successCount)
//             console.log('successRate', (successCount/arrayCount)*100)

//         let successCount = 0;
//         for(let i=0; i < data.length; i++){
//         successCount += countSuccesses(data[i], new Date(data[i].projected_date), new Date(data[i].commit_date), data[i].complete)
//         console.log('countSuccesses:', countSuccesses(data[i], new Date(data[i].projected_date), new Date(data[i].commit_date), data[i].complete))
//         console.log('successCount', successCount)
//     }
        
//     return successCount
        
    
// }