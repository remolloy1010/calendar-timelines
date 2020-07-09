export default function commitCompletionDate(groupedData) {
    //function projectCommitDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let priorityArray = [];
            groupedData[key].forEach(eachInstance => {
                priorityArray = eachInstance.commit_date 
            });
            
            return priorityArray
        }); 
    //}
}