const count = 0;
const message = count ? `Hay ${count} items` : "No hay items";
console.log(message);

const stock = null;
const display = stock ?? "Sin stock";
console.log(display);
