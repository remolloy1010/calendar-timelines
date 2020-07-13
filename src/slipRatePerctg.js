import timeDuration from './timeDuration';
import slipRate from './slipRate';

export default function slipRatePerctg(slipRateFunction, timeDurationFunction) {
    let slipRateP = 0;
    if(slipRateFunction === '-'){
        return '-'
    }
    else{
        slipRateP = Math.round((slipRateFunction/timeDurationFunction)*100)
    }
    
    return slipRateP + '%'



}