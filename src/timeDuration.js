import React from 'react'
import moment from 'moment'

export default function timeDuration(startDate, endDate) {
    const duration = new Date(startDate).getTime() - new Date(endDate).getTime()

    // returns time duration in days
    return Math.round(duration/1000/60/60/24) 
}