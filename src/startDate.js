export default function startDate(startArrayExample) {
    // startArrayExample = ['4/25/2020', '5/21/2020', '3/1/2020']
    minStartDate = max(startArrayExample)
    
    return minStartDate // output project start date (start date of 1st milestone)
}

console.log('startDateExample:', startDate(['4/25/2020', '5/21/2020', '3/1/2020']))