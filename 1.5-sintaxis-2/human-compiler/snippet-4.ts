const doble = (n: number) => n * 2;

const crearPunto = (x: number, y: number) => ({ x, y });

const saludar = (nombre: string, saludo = "Hola") => `${saludo}, ${nombre}!`;

console.log(doble(5));
console.log(crearPunto(3, 7));
console.log(saludar("Leo"));
console.log(saludar("Ana", "Buenas"));
