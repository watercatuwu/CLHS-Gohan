export function priceSum(arr){
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].price
    }
    return sum
}

export function getRandom(min,max){
    return Math.floor(Math.random()*max)+min
}