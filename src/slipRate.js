import React from 'react'
import moment from 'moment'

export default function slipRate(commitDate, projectedDate, complete) {
    let slipRateDays = 0
    if(complete === 'Y'){
        slipRateDays = new Date(projectedDate).getTime() - new Date(commitDate).getTime()
        return Math.round(slipRateDays/1000/60/60/24)

    }
    else{
        slipRateDays = 0
        return '-'
    }

    //return Math.round(slipRateDays/1000/60/60/24)
    }