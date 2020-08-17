export default function startDate(startArrayExample) {
    minStartDate = max(startArrayExample)
    
    return minStartDate 
}

console.log('startDateExample:', startDate(['4/25/2020', '5/21/2020', '3/1/2020']))