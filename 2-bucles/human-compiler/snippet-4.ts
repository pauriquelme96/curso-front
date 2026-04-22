const palabras = ["hola", "mundo", "js"];

const resultado = palabras.reduce(
  (acc, palabra) => {
    acc[palabra] = palabra.length;
    return acc;
  },
  {} as Record<string, number>,
);

console.log(resultado);
