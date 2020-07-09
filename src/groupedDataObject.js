import _ from 'lodash'

export default function groupedDataObject(data){
    var groupedData = _.groupBy(data,'project');
    // console.log('grouped data:', groupedData)
    return groupedData
}