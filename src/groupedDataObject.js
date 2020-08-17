import _ from 'lodash'

export default function groupedDataObject(data){
    var groupedData = _.groupBy(data,'project');
    return groupedData
}