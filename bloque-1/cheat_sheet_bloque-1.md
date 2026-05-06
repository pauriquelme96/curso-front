# Cheatsheet — JS Fundamentos

## 1. Sintaxis base

### Identificadores

Letras, dígitos, `_`, `$`. No empiezan por dígito. Case-sensitive. No reservadas.
Convención: `camelCase` (vars/fns), `PascalCase` (clases), `UPPER_SNAKE_CASE` (constantes).

### Literales

Valor escrito directamente: `42`, `"hola"`, `` `tpl ${x}` ``, `true`, `null`, `{a:1}`, `[1,2]`.

### Primitivos

`number`, `string`, `boolean`, `null`, `undefined` (+ `bigint`, `symbol`).
`typeof null === "object"` ← bug histórico.

### Variables

|         | reasignable | scope            |
| ------- | ----------- | ---------------- |
| `const` | ❌          | bloque           |
| `let`   | ✅          | bloque           |
| `var`   | ✅          | función (evitar) |

`const` por defecto. `const` protege la **referencia**, no el contenido (`arr.push()` muta).

### Objetos y arrays

```ts
const u = {
  nombre: "Ana",
  saludar() {
    return "hi";
  },
};
u.nombre; // dot
u["nombre"]; // bracket
// nombre = clave, "Ana" = valor, nombre:"Ana" = propiedad, saludar = método
```

### `{}` dual

- **Literal de objeto** en posición de expresión: `const x = {}`
- **Bloque de código** tras sentencia: `if (...) {}`

### Sentencias vs expresiones

- **Expresión** → produce valor. Se puede pasar como argumento.
- **Sentencia** → ejecuta acción. No se puede.

### Operadores

- Unarios (1): `!x`, `-x`, `typeof x`
- Binarios (2): `a + b`, `x === y`, `a && b`
- Ternario (3): `cond ? a : b`

Comparación: usa siempre `===` (no `==`).

### Funciones (3 formas)

```ts
function f(x) { return x }      // declaration · hoisting · nombre obligatorio
const f = function(x) { ... }   // expression
const f = (x) => x              // arrow · sin this propio
```

### Invocación

`saludar` = referencia. `saludar()` = ejecución (`()` es operador de llamada).
Callbacks: pasa la **referencia**, no la invoques.

### Parámetros vs argumentos

- **Parámetro**: en la firma (`function f(a, b)`)
- **Argumento**: en la llamada (`f(1, 2)`)

---

## 2. Condicionales

### Falsy (los 6 únicos)

`false`, `0`, `""`, `null`, `undefined`, `NaN`.
Todo lo demás es truthy: `[]`, `{}`, `"0"`, `"false"`.

### `==` vs `===`

Usa `===` siempre. `==` hace coerción (`0 == "0"` → `true`).

### Ternario

Expresión que devuelve valor. Para asignaciones simples.

```ts
const msg = esAdmin ? "admin" : "user";
```

### Anti-patrón booleano redundante

```ts
if (esActivo === true)
  if (esActivo)
    // ❌
    // ✅
    return x === true ? "sí" : "no"; // ❌
return x ? "sí" : "no"; // ✅
```

### Early return

Aplana anidamientos saliendo pronto.

```ts
function f(u) {
  if (!u) return;
  if (u.saldo <= 0) return;
  // lógica principal
}
```

### `??` vs `||`

- `||` → cae con cualquier falsy (`0`, `""`, `false`)
- `??` → cae solo con `null`/`undefined`

```ts
config.volumen ?? 50; // respeta 0
config.volumen || 50; // 0 → 50 (bug)
```

### Short-circuit

- `&&` para en el primer falsy
- `||` para en el primer truthy

```ts
usuario && <Perfil />          // render condicional
respuesta.nombre || "Anónimo"  // default
```

---

## 3. Sintaxis moderna (ES6+)

### Acceso: dot vs bracket

```ts
u.nombre; // dot · estático
u[campo]; // bracket · dinámico
config["max-width"]; // bracket · clave no válida como id
```

### Optional chaining `?.`

Cortocircuita devolviendo `undefined` si algo es nullish.

```ts
u?.direccion?.ciudad;
u?.saludar?.();
arr?.[0]?.nombre;
```

### Destructuring

```ts
// objetos
const { nombre, edad = 0 } = usuario;
const { a, ...resto } = obj;

// arrays (por posición)
const [x, , z] = [1, 2, 3];
const [primero, ...resto] = arr;

// en parámetros
function f({ nombre, edad = 0 }) { ... }
```

Default solo se aplica con `undefined` (no con `null`).

### Shorthand

```ts
const u = { nombre, edad };           // = { nombre: nombre, edad: edad }
const o = { saludar() { ... } };      // método shorthand
```

### Spread vs rest (`...`)

Mismo símbolo, posición opuesta:

- **Spread** (lado derecho · expande): `{ ...base, x: 1 }`, `[...a, ...b]`
- **Rest** (lado izquierdo · agrupa): `const { ...resto } = o`, `function f(...args)`

Spread → copia inmutable. Las propiedades posteriores sobrescriben.

### Arrow functions

```ts
const f = (x) => x * 2; // retorno implícito
const f = (x) => {
  return x;
}; // retorno explícito
const obj = (x) => ({ x }); // ¡paréntesis para objeto literal!
```

### Defaults y rest params

```ts
function saludar(n, saludo = "Hola") { ... }
function sumar(...nums) { return nums.reduce(...) }
```

### Funciones como valores

Pasa la referencia, no la envuelvas.

```ts
[1, 2, 3]
  .map(doble) // ✅
  [(1, 2, 3)].map((n) => doble(n)); // ❌ wrapper innecesario
```

---

## 4. Bucles

### `for` clásico

```ts
for (let i = 0; i < arr.length; i++) { ... }
```

Cuidado con off-by-one (`<` vs `<=`).

### `for...of` vs `for...in`

- `for...of` → **valores** de iterables (arrays, strings, Maps, Sets)
- `for...in` → **claves** enumerables (solo objetos)

```ts
for (const v of arr) { ... }     // valores
for (const k in obj) { ... }     // claves
```

⚠️ `for...in` con arrays: devuelve índices como **strings** y recoge propiedades heredadas.

### `while` / `do...while`

- `while` → condición antes (puede no ejecutarse)
- `do...while` → ejecuta al menos 1 vez

### Métodos de array

| Método    | Devuelve    | Uso                 |
| --------- | ----------- | ------------------- |
| `forEach` | `undefined` | efectos secundarios |
| `map`     | nuevo array | transformar         |
| `filter`  | nuevo array | filtrar             |
| `reduce`  | valor único | acumular            |

```ts
arr.map((n) => n * 2);
arr.filter((n) => n > 0);
arr.reduce((acc, n) => acc + n, 0);
```

### `break` y `continue`

- `break` → sale del bucle
- `continue` → siguiente iteración

❌ No funcionan en `forEach`/`map`/`filter`/`reduce` (son callbacks). Usa `for...of` si necesitas romper.

---

## Anti-patrones a evitar

| Anti-patrón                                 | Solución               |
| ------------------------------------------- | ---------------------- |
| `if (cond) return true; else return false;` | `return cond`          |
| `volumen \|\| 50` cuando `0` es válido      | `volumen ?? 50`        |
| `u && u.dir && u.dir.ciudad`                | `u?.dir?.ciudad`       |
| `for...in` sobre arrays                     | `for...of` o `forEach` |
| Mutar array con `splice` durante iteración  | `filter`               |
| `map` sin usar el resultado                 | `forEach`              |
| Acumular manualmente con `for`              | `reduce`               |
| `arr.map(n => fn(n))`                       | `arr.map(fn)`          |
| `() => { x: 1 }` (devuelve undefined)       | `() => ({ x: 1 })`     |

---

## Reglas de oro

1. `const` por defecto, `let` si reasignas, nunca `var`.
2. Siempre `===`, nunca `==`.
3. `??` cuando `0`/`""`/`false` son válidos.
4. Early return > anidamiento.
5. Pasa referencias, no envuelvas funciones sin razón.
6. Destructura en parámetros.
7. Métodos de array > bucles manuales (cuando aplica).
8. Spread para inmutabilidad, no muta el original.
