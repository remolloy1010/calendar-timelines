export default function successRate(slipRateArray) {
    let successCount = 0;
    let arrayCount = 0;
    
        for(let slipVal of slipRateArray){
            if(typeof(slipVal) !== 'number'){
                successCount += 0
                arrayCount += 0
            }
            else if(slipVal < 0){
                successCount += 1
                arrayCount += 1
            }
            else{
                arrayCount += 1
            }
        }

    const successRatePerctg = Math.round((successCount/arrayCount)*100)
    return successRatePerctg
}