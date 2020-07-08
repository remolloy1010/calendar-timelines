// Find average of array; Skip items that are not a number
export default function getAverage(arrayToAverage) {
    let total = 0;
    let count = 0;
    for(let i = 0; i < arrayToAverage.length; i++) {
      if(typeof(arrayToAverage[i]) !== 'number'){
        total += 0;
      }
      else{
        total += arrayToAverage[i];
        count += 1;
      }

    }
      return Math.round(total/count)
  }