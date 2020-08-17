export default function isDataEmpty(data, timelinesTitle){
    let titleConditional = data.length === 0 ? 'empty' : data[0].timelinesTitle;


    console.log('data', data)
    console.log('title:', titleConditional)
    
  return titleConditional
}