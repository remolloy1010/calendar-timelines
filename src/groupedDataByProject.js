import React from 'react';
import _ from 'lodash'

export default function groupedDataByProject(data){
    var groupedData = _.groupBy(data,'project');
    console.log('grouped data:', groupedData)

    const projectNamesArray = Object.keys(groupedData)
    console.log('projectNamesArray:', projectNamesArray)
    return projectNamesArray
}