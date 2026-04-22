const nums = [1, 2, 3, 4, 5];
const resultado: number[] = [];

nums.forEach((n) => {
  if (n === 3) return;
  resultado.push(n * 2);
});

console.log(resultado);
