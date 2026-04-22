let i = 5;
const salida: string[] = [];

while (i > 0) {
  if (i === 3) {
    i--;
    continue;
  }
  salida.push(`val-${i}`);
  i--;
}

console.log(salida);
