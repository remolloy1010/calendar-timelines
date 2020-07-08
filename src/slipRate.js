export default function slipRate(commitDate, projectedDate, complete) {
    let slipRateDays = 0
    if(complete === 'Y'){
        slipRateDays = projectedDate.getTime() - commitDate.getTime()
        return Math.round(slipRateDays/1000/60/60/24)

    }
    else{
        slipRateDays = 0
        return 0
    }

    // return Math.round(slipRateDays/1000/60/60/24)
    }