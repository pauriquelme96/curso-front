# Pimp my code: Bucles

---

# Info

```ts
type Producto = {
  nombre: string;
  precio: number;
  cantidad: number;
};
```

# Code 1

```ts
function sumarPrecios(productos: Producto[]): number {
  let total = 0;
  for (let i = 0; i <= productos.length; i++) {
    total += productos[i].precio;
  }
  return total;
}
```

# Code 2

```ts
function obtenerNombres(productos: Producto[]): void {
  const nombres = productos.map((p) => console.log(p.nombre));
}
```

# Code 3

```ts
function buscarProductoCaro(productos: Producto[]): string {
  let resultado = "";
  productos.forEach((p) => {
    if (p.precio > 100) {
      resultado = p.nombre;
      break;
    }
  });
  return resultado;
}
```

# Code 4

```ts
function eliminarAgotados(productos: Producto[]): Producto[] {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].cantidad === 0) {
      productos.splice(i, 1);
    }
  }
  return productos;
}
```

# Code 5

```ts
function calcularTotal(productos: Producto[]): number {
  let suma = 0;
  for (const indice in productos) {
    suma += productos[indice].precio * productos[indice].cantidad;
  }
  return suma;
}
```

# Code 6

```ts
function contarCaros(productos: Producto[]): number {
  let contador = 0;
  let i = 0;
  while (i < productos.length) {
    if (productos[i].precio > 50) {
      contador++;
    }
  }
  return contador;
}
```
