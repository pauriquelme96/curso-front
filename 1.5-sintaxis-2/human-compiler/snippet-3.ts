const nums = [10, 20, 30, 40, 50];

const [a, , b, ...resto] = nums;

const combinado = [...resto, 0, ...nums.slice(0, 2)];

console.log(a);
console.log(b);
console.log(resto);
console.log(combinado);
