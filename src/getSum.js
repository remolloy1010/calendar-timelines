export default function getSum(array=[]){
    let sum = 0;
    for(const item of array){
        if(typeof(item) !== 'number'){
            sum += 0;
        }
        else{
            sum += item;
        }
    }
    return sum

}