function factorial(num){
  if(num === 0 || num === 1){
    return 1;
  }else if(num < 0){
    return "factorial of negative numbers is not a vailde math op"
  }
  else {
    return factorial(num-1)*num;
  }
}

const r1 = factorial(5);

console.log(r1);