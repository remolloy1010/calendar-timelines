export default function projectedCompletionDate(groupedData) {
    //function projectCommitDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let priorityArray = [];
            groupedData[key].forEach(eachInstance => {
                priorityArray = eachInstance.projected_date 
            });
            
            return priorityArray
        }); 
    //}
}