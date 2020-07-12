import React from 'react'
import moment from 'moment'

export default function timeDuration(startTime, endTime) {
    const duration = new Date(endTime).getTime() - new Date(startTime).getTime()

    // returns time duration in days
    return Math.round(duration/1000/60/60/24) 
}