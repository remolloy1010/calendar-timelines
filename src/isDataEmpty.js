export default function isDataEmpty(data, timelinesTitle){
    let titleConditional = data.length === 0 ? 'empty' : data[0].timelinesTitle;

  // let title = 'default'
  // if(data[0].timelines_title === 'undefined'){
  //   title = 'new'
  // }
  // // // let title = data[0].timelines_title === {} ? '' : data[0].timelines_title
    console.log('data', data)
    console.log('title:', titleConditional)
    
  return titleConditional
}