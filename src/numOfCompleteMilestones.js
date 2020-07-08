export default function numOfCompleteMilestones(complete, dataLength) {
    let arrayLength = 0;
    for(let i = 0; i < dataLength; i++){
        if(complete === 'Y'){
            arrayLength += 1
        }
    }
    
    return arrayLength
}