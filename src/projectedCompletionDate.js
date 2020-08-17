export default function projectedCompletionDate(groupedData) {
        return Object.keys(groupedData).map(key => {
            let priorityArray = [];
            groupedData[key].forEach(eachInstance => {
                priorityArray = eachInstance.projected_date 
            });
            
            return priorityArray
        }); 
    
}