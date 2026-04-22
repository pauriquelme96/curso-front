const multiplicador = (factor: number) => (n: number) => n * factor;

const porTres = multiplicador(3);
const porDiez = multiplicador(10);

const resultado = [1, 2, 3].map(porTres);
const filtrado = resultado.filter((n) => n > 4);
const total = filtrado.reduce((acc, n) => acc + n, 0);

console.log(resultado);
console.log(filtrado);
console.log(total);
