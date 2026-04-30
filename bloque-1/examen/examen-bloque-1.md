# Examen — JS Fundamentos

> **Temas:** Sintaxis base · Condicionales · Sintaxis moderna (ES6+) · Bucles

---

## Instrucciones

- Sin IDE ni ejecutar código.
- En las preguntas tipo _Human Compiler_, escribe **exactamente** lo que se imprimiría por consola (incluyendo `undefined`, errores, etc.).
- En _Pimp my Code_, no se valora solo que funcione: se valora que esté **idiomático y limpio**.
- Si una pregunta tiene varios apartados, responde a todos.

---

## Sección A — Identificar conceptos

> Para cada fragmento, di **qué es** usando el vocabulario correcto (literal, identificador, expresión, sentencia, parámetro, argumento, método, propiedad, bloque, invocación, etc.).

---

**A1.** Las llaves `{}` aparecen en estos dos códigos. Indica qué son en cada caso:

```ts
// (1)
const x = { a: 1 };

// (2)
if (cond) {
  x = 1;
}
```

(1):
(2):

---

**A2.** Dada esta línea, indica qué son `nombre` y `"Ana"` dentro del objeto, y cómo se llama el par completo:

```ts
const usuario = { nombre: "Ana" };
```

- `nombre`:
- `"Ana"`:
- `nombre: "Ana"` (par completo):

---

**A3.** Mira esta línea de código:

```ts
boton.addEventListener("click", saludar);
```

¿Qué diferencia hay entre pasar `saludar` y pasar `saludar()`? Explica brevemente.

- ...

---

**A4.** Clasifica los siguientes operadores según su número de operandos (**unario** / **binario** / **ternario**):

`+` · `!` · `?:` · `===` · `typeof` · `&&`

- Unarios:
- Binarios:
- Ternarios:

---

**A5.** En cada caso, ¿el `...` es **spread** o **rest**?

```ts
const a = { ...base, edad: 31 };          // (1)
const { nombre, ...resto } = usuario;     // (2)
function sumar(...numeros) { ... }        // (3)
const combinado = [...arr1, ...arr2];     // (4)
```

(1):
(2):
(3):
(4):

---

## Sección B — Tipo test

> Una sola respuesta correcta por pregunta. Sin penalización por fallo.

---

**B1.** ¿Cuál de estos valores es **truthy**?

- a) `""`
- b) `0`
- c) `[]`
- d) `null`

---

**B2.** ¿Qué imprime `console.log(typeof null)`?

- a) `"null"`
- b) `"undefined"`
- c) `"object"`
- d) `"boolean"`

---

**B3.** Dado este código, ¿qué se imprime?

```ts
const config = { cantidad: 0 };
const valor = config.cantidad || 10;
console.log(valor);
```

- a) `0`
- b) `10`
- c) `undefined`
- d) Lanza error

---

**B4.** ¿Cuál es la principal razón para evitar `for...in` cuando iteras un array?

- a) Es más lento que `for...of`.
- b) Itera sobre los índices como **strings** y puede recoger propiedades heredadas.
- c) No funciona con arrays, solo con objetos.
- d) Salta el primer elemento (índice `0`).

---

**B5.** Dada esta función, ¿con qué llamada **NO** se aplica el valor por defecto?

```ts
function f(x = 5) {
  return x;
}
```

- a) `f()`
- b) `f(undefined)`
- c) `f(null)`
- d) En todas se aplica el valor por defecto

---

**B6.** Dado `const ciudad = usuario?.direccion?.ciudad`, si `usuario` es `null`, ¿cuánto vale `ciudad`?

- a) `null`
- b) `undefined`
- c) Lanza `TypeError`
- d) `""`

---

**B7.** ¿Cuál de estas arrow functions devuelve correctamente el objeto `{ x: 1 }`?

- a) `() => { x: 1 }`
- b) `() => ({ x: 1 })`
- c) `() => return { x: 1 }`
- d) `() => x: 1`

---

**B8.** ¿Qué ocurre si usas `break` dentro de un `.forEach()`?

- a) Sale del bucle correctamente.
- b) Salta a la siguiente iteración.
- c) Lanza `SyntaxError`: `break` solo es válido en bucles `for`/`while`.
- d) Continúa sin ningún efecto.

---

**B9.** ¿Qué imprime este código?

```ts
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

- a) `[1, 2, 3]` (porque `const` lo bloquea)
- b) `[1, 2, 3, 4]`
- c) Error: `Assignment to constant variable`
- d) `[4, 1, 2, 3]`

---

**B10.** ¿Qué imprime `console.log({ a: 1, ...{ a: 2, b: 3 } })`?

- a) `{ a: 1, b: 3 }`
- b) `{ a: 2, b: 3 }`
- c) `{ a: [1, 2], b: 3 }`
- d) Error: claves duplicadas

---

## Sección C — Human Compiler

> Indica la **salida exacta por consola** de cada snippet. Si lanza un error, indica el tipo (`TypeError`, `ReferenceError`, `SyntaxError`...).

---

**C1.**

```ts
console.log(1 + "2" + 3);
console.log("3" - 1);
console.log(typeof typeof null);
```

---

**C2.**

```ts
const lista = [];
const config = { titulo: "0", count: 0, tags: [] };

if (lista) console.log("A");
if (lista.length) console.log("B");
if (config.titulo) console.log("C");
if (config.count) console.log("D");
if (config.tags) console.log("E");

console.log(!!config.count);
console.log(!config.titulo);
```

---

**C3.**

```ts
function getDefault() {
  console.log("calculating");
  return 42;
}

const a = 0 || getDefault();
const b = 0 ?? getDefault();
const c = null ?? getDefault();
const d = "" || getDefault();

console.log(a, b, c, d);
```

---

**C4.**

```ts
const datos = { a: undefined, b: null, c: 0 };
const { a = 10, b = 20, c = 30 } = datos;

console.log(a, b, c);
```

---

**C5.**

```ts
const data = {
  items: null,
  config: { handler: () => "click" },
};

console.log(data.items?.length ?? "vacío");
console.log(data.items?.[0]?.nombre);
console.log(data.config.handler?.());
console.log(data.missing?.deep);
```

---

**C6.**

```ts
const nums = [10, 20, 30];
let resultado: any = 0;

for (const i in nums) {
  resultado += i;
}

console.log(resultado);
console.log(typeof resultado);
```

---

**C7.**

```ts
const items = [1, 2, 4, 5, 6];

for (let i = 0; i < items.length; i++) {
  if (items[i] % 2 === 0) {
    items.splice(i, 1);
  }
}

console.log(items);
```

---

## Sección D — Pimp my Code

> Refactoriza cada función para que sea **idiomática y limpia**, manteniendo el comportamiento. Aplica lo aprendido: early return, destructuring, `??`, `?.`, métodos de array, arrow functions, template literals, spread, etc.
>
> Las cuatro funciones trabajan sobre este dominio:

```ts
type Pedido = {
  id: string;
  cliente: {
    nombre: string;
    email: string;
    direccion?: {
      ciudad: string;
      cp: string;
    };
  };
  productos: Array<{
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  estado: "pendiente" | "enviado" | "entregado" | "cancelado";
  cupon?: {
    codigo: string;
    descuento: number;
  };
};
```

---

**D1.**

```ts
function puedeCancelar(pedido: Pedido): boolean {
  if (pedido.estado === "pendiente") {
    if (pedido.cliente.email !== "") {
      return true;
    } else {
      return false;
    }
  } else if (pedido.estado === "enviado") {
    return true;
  } else {
    return false;
  }
}
```

---

**D2.**

```ts
function descripcionEstado(pedido: Pedido): string {
  if (pedido.estado === "cancelado") {
    return "Pedido cancelado";
  } else {
    if (pedido.estado === "entregado") {
      return "Pedido entregado";
    } else {
      if (pedido.estado === "enviado") {
        if (pedido.cliente.direccion) {
          return "Pedido en camino a " + pedido.cliente.direccion.ciudad;
        } else {
          return "Pedido enviado";
        }
      } else {
        return "Pedido pendiente";
      }
    }
  }
}
```

---

**D3.**

```ts
function calcularTotal(pedido: Pedido): number {
  let total = 0;
  for (let i = 0; i < pedido.productos.length; i++) {
    total = total + pedido.productos[i].precio * pedido.productos[i].cantidad;
  }
  if (pedido.cupon) {
    if (pedido.cupon.descuento) {
      total = total - (total * pedido.cupon.descuento) / 100;
    }
  }
  return total;
}
```

---

**D4.**

```ts
function pedidosPorCliente(pedidos: Pedido[]) {
  const resultado: any = {};
  for (let i = 0; i < pedidos.length; i++) {
    const pedido = pedidos[i];
    if (!resultado[pedido.cliente.email]) {
      resultado[pedido.cliente.email] = [];
    }
    resultado[pedido.cliente.email].push(pedido);
  }
  return resultado;
}
```
