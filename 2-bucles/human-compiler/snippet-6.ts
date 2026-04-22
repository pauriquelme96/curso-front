const numeros = [10, 20, 30, 40, 50];
let suma = 0;

for (const n of numeros) {
  if (suma > 40) break;
  suma += n;
}

console.log(suma);
