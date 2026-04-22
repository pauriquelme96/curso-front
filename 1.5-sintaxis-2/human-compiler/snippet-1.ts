const usuario = { nombre: "Leo", edad: 30, email: "leo@ejemplo.com" };

const { nombre, ...resto } = usuario;
const copia = { ...resto, nombre: "Ana" };

console.log(nombre);
console.log(copia);
console.log(usuario.nombre);
