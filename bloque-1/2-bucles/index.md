# Bucles

## `for` clásico

El bucle `for` tiene tres partes: **inicialización**, **condición** y **actualización**.

```ts
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

Cuidado con el **off-by-one**: usar `<=` en vez de `<` (o viceversa) es uno de los errores más frecuentes.

```ts
const nombres = ["Ana", "Luis", "Marta"];

// ❌ off-by-one: accede a índice 3, que no existe
for (let i = 0; i <= nombres.length; i++) {
  console.log(nombres[i]); // el último es undefined
}

// ✅ correcto
for (let i = 0; i < nombres.length; i++) {
  console.log(nombres[i]);
}
```

---

## `for...of` vs `for...in`

- **`for...of`**: itera sobre los **valores** de un iterable (arrays, strings, Maps, Sets…).
- **`for...in`**: itera sobre las **claves enumerables** de un objeto.

```ts
const frutas = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
  console.log(fruta); // "manzana", "pera", "uva"
}

for (const indice in frutas) {
  console.log(indice); // "0", "1", "2" ← son strings, no números
}
```

> Regla práctica: usa `for...of` para arrays y `for...in` para objetos. Nunca uses `for...in` con arrays, el orden no está garantizado y recoge propiedades heredadas.

```ts
const usuario = { nombre: "Ana", edad: 28, rol: "admin" };

for (const clave in usuario) {
  console.log(`${clave}: ${usuario[clave]}`);
}
// nombre: Ana
// edad: 28
// rol: admin
```

---

## `while` y `do...while`

- **`while`**: evalúa la condición **antes** de cada iteración. Puede no ejecutarse nunca.
- **`do...while`**: ejecuta el cuerpo **al menos una vez** y luego evalúa la condición.

```ts
let intentos = 0;

while (intentos < 3) {
  console.log(`Intento ${intentos}`);
  intentos++;
}
// Intento 0, Intento 1, Intento 2

let respuesta: string;
do {
  respuesta = prompt("Escribe 'salir' para terminar") ?? "";
} while (respuesta !== "salir");
```

Peligro principal: **bucles infinitos**. Asegúrate de que la condición cambie en algún momento.

```ts
// ❌ bucle infinito: nunca se modifica `i`
let i = 0;
while (i < 5) {
  console.log(i);
  // falta i++
}
```

---

## Métodos de array: `forEach`, `map`, `filter`, `reduce`

En JavaScript moderno, muchas veces no necesitas un bucle explícito. Los métodos de array son más declarativos y expresivos.

### `forEach`

Ejecuta una función por cada elemento. **No devuelve nada** (retorna `undefined`).

```ts
const nombres = ["Ana", "Luis", "Marta"];

function saludar() {
  console.log;
}

saludar("Ana"); // Ana

nombres.forEach(() => console.log);
```

> `forEach` no se puede interrumpir con `break` ni `return`. Si necesitas salir antes, usa `for...of`.

### `map`

Transforma cada elemento y **devuelve un nuevo array**.

```ts
const numeros = [1, 2, 3, 4];

function porDos(n) {
  return n * 2;
}

const dobles = numeros.map(porDos);
// [2, 4, 6, 8]
```

### `filter`

Filtra elementos según una condición y **devuelve un nuevo array**.

```ts
const edades = [15, 22, 8, 30, 17];

const mayores = edades.filter((edad) => {
  edad >= 18;
});
// [22, 30]
```

### `reduce`

Acumula un valor recorriendo el array. Es el más versátil pero también el más difícil de leer.

```ts
const precios = [10, 20, 30];
const total = precios.reduce((acum, precio) => acum + precio, 0);
// 60
```

> Úsalo cuando necesites colapsar un array en un solo valor (sumar, agrupar, contar…). Si el `reduce` se vuelve complejo, un `for...of` suele ser más legible.

---

## `break` y `continue`

- **`break`**: sale del bucle por completo.
- **`continue`**: salta a la siguiente iteración.

```ts
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

// Encontrar el primer par y parar
for (const n of numeros) {
  if (n % 2 === 0) {
    console.log("Primer par:", n); // 2
    break;
  }
}

// Imprimir solo impares
for (const n of numeros) {
  if (n % 2 === 0) continue;
  console.log(n); // 1, 3, 5, 7
}
```

Recuerda: `break` y `continue` **no funcionan** dentro de `forEach`, `map`, `filter` ni `reduce`.

---

## Anti-patrones comunes

### Mutar el array mientras se itera

```ts
const items = [1, 2, 3, 4, 5];

// ❌ mutar el array dentro del bucle salta elementos
for (let i = 0; i < items.length; i++) {
  if (items[i] % 2 === 0) {
    items.splice(i, 1); // elimina el elemento → los índices se desplazan
  }
}
console.log(items); // [1, 3, 5]? No siempre. Resultado impredecible.

// ✅ usa filter para crear un nuevo array
const impares = items.filter((n) => n % 2 !== 0);
```

### Usar `map` cuando no necesitas el resultado

```ts
// ❌ map devuelve un array que nadie usa
usuarios.map((u) => console.log(u.nombre));

// ✅ usa forEach si solo quieres ejecutar un efecto
usuarios.forEach((u) => console.log(u.nombre));
```

### Acumular manualmente cuando existe `reduce`

```ts
const nums = [1, 2, 3, 4];

// ❌ acumulación manual
let suma = 0;
for (const n of nums) {
  suma += n;
}

// ✅ reduce
const suma = nums.reduce((acc, n) => acc + n, 0);
```

---
