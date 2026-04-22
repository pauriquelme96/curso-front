const datos = {
  usuario: {
    direccion: {
      ciudad: "Madrid",
    },
  },
};

const ciudad = datos.usuario?.direccion?.ciudad;
const cp = datos.usuario?.direccion?.cp;
const pais = datos.pais?.nombre;

console.log(ciudad);
console.log(cp);
console.log(pais);
