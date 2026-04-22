# Pimp my code: Sintaxis moderna (ES6+)

---

# Info

```ts
type Producto = {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  descuento?: {
    porcentaje: number;
    codigo: string;
  };
};
```

# Code 1

```ts
function resumen(producto: Producto) {
  const nombre = producto.nombre;
  const precio = producto.precio;
  const stock = producto.stock;

  return nombre + " - " + precio + "€ (" + stock + " uds)";
}
```

# Code 2

```ts
function precioFinal(producto: Producto): number {
  let porcentaje = 0;

  if (producto.descuento) {
    if (producto.descuento.porcentaje) {
      porcentaje = producto.descuento.porcentaje;
    }
  }

  return producto.precio * (1 - porcentaje / 100);
}
```

# Code 3

```ts
function aplicarIVA(productos: Producto[]) {
  const resultado = [];

  for (let i = 0; i < productos.length; i++) {
    resultado.push({
      nombre: productos[i].nombre,
      precio: productos[i].precio,
      precioConIVA: productos[i].precio * 1.21,
      categoria: productos[i].categoria,
      stock: productos[i].stock,
    });
  }

  return resultado;
}
```

# Code 4

```ts
function crearProducto(
  nombre: string,
  precio: number,
  categoria: string,
  stock: number,
) {
  const producto = {
    nombre: nombre,
    precio: precio,
    categoria: categoria,
    stock: stock,
  };

  return producto;
}
```

---

# Soluciones

<details>
<summary>Code 1 — Destructuring + template literal</summary>

```ts
function resumen(producto: Producto) {
  const { nombre, precio, stock } = producto;

  return `${nombre} - ${precio}€ (${stock} uds)`;
}
```

</details>

<details>
<summary>Code 2 — Optional chaining + nullish coalescing</summary>

```ts
function precioFinal(producto: Producto): number {
  const porcentaje = producto.descuento?.porcentaje ?? 0;

  return producto.precio * (1 - porcentaje / 100);
}
```

</details>

<details>
<summary>Code 3 — .map() + spread</summary>

```ts
function aplicarIVA(productos: Producto[]) {
  return productos.map((producto) => ({
    ...producto,
    precioConIVA: producto.precio * 1.21,
  }));
}
```

</details>

<details>
<summary>Code 4 — Shorthand properties + arrow con retorno implícito</summary>

```ts
const crearProducto = (
  nombre: string,
  precio: number,
  categoria: string,
  stock: number,
) => ({ nombre, precio, categoria, stock });
```

</details>
