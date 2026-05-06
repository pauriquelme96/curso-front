# Examen — JS Fundamentos · Soluciones

> Guía de corrección para el examen `examen-js-fundamentos.md`.
> Total: **10 pt**.

| Sección | Formato                 | Puntos |
| ------- | ----------------------- | ------ |
| A       | Identificar conceptos   | 0,5    |
| B       | Tipo test               | 1,5    |
| C       | Human Compiler          | 4,0    |
| D       | Pimp my Code (refactor) | 4,0    |
|         | **Total**               | **10** |

---

## Sección A — Identificar conceptos _(0,5 pt)_

**A1.** _(0,1 pt)_

- (1) `{ a: 1 }` → **literal de objeto** (aparece en posición de expresión, lado derecho de la asignación)
- (2) `{ x = 1 }` → **bloque de código** (aparece tras una sentencia `if`)

> Misma sintaxis, significado distinto según el contexto.

---

**A2.** _(0,1 pt)_

- `nombre` → **clave** (key) de la propiedad
- `"Ana"` → **valor** (un literal de string)
- `nombre: "Ana"` → **propiedad** (par clave-valor)

---

**A3.** _(0,1 pt)_

- `saludar` es una **referencia** a la función (la función como valor, sin ejecutar).
- `saludar()` es la **invocación**: los `()` son el operador de llamada que la ejecuta.
- En `addEventListener` queremos pasar la referencia para que la llame el navegador en el momento del evento. Si pasáramos `saludar()`, le estaríamos pasando el **resultado** de ejecutarla ya.

---

**A4.** _(0,1 pt)_

- **Unarios** (1 operando): `!`, `typeof`
- **Binarios** (2 operandos): `===`, `&&`
- **Ternario** (3 operandos): `?:`
- `+` puede ser **unario** (`+x` para coerción) o **binario** (`a + b`); en uso habitual, binario.

---

**A5.** _(0,1 pt)_

| #   | Código                                 | Tipo       |
| --- | -------------------------------------- | ---------- |
| (1) | `{ ...base, edad: 31 }`                | **spread** |
| (2) | `const { nombre, ...resto } = usuario` | **rest**   |
| (3) | `function sumar(...numeros)`           | **rest**   |
| (4) | `[...arr1, ...arr2]`                   | **spread** |

> Regla: **rest** aparece en el lado izquierdo (recoge), **spread** en el lado derecho (expande).

---

## Sección B — Tipo test _(1,5 pt)_

| #   | Respuesta | Por qué                                                                                                           |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| B1  | **c**     | Solo hay 6 valores falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. `[]` y `{}` son truthy.                 |
| B2  | **c**     | Bug histórico: `typeof null === "object"`. `null` sigue siendo primitivo pese a esto.                             |
| B3  | **b**     | `\|\|` trata `0` como falsy y devuelve el lado derecho. Para preservar `0`, usar `??`.                            |
| B4  | **b**     | `for...in` da los índices como **strings** y recoge además propiedades enumerables heredadas. Usar `for...of`.    |
| B5  | **c**     | El default solo se aplica con `undefined`. `null` se considera un valor explícito y pasa tal cual.                |
| B6  | **b**     | Optional chaining devuelve `undefined` (no `null`) cuando algún paso intermedio es nullish.                       |
| B7  | **b**     | Sin paréntesis, `{ x: 1 }` se interpreta como bloque de código. Hay que envolverlo en `()` para forzar expresión. |
| B8  | **c**     | `forEach` recibe un callback: `break` no es legal dentro de una función. Para poder romper, usa `for...of`.       |
| B9  | **b**     | `const` protege la **referencia**, no el contenido. `arr.push(4)` muta el array, no reasigna la variable.         |
| B10 | **b**     | En spread, las propiedades posteriores sobrescriben a las anteriores. El orden importa.                           |

---

## Sección C — Human Compiler _(4 pt)_

### C1 _(0,5 pt)_

```
123
2
4
string
```

- `1 + "2" + 3`: izquierda a derecha. `1 + "2"` → `"12"` (string concat, el number se coerciona). `"12" + 3` → `"123"`.
- `"3" - 1`: `-` solo opera entre números, fuerza coerción. `"3"` → `3`, `3 - 1` → `2`.
- `+"3" + 1`: el unario `+` coerciona a número. `+"3"` → `3`, luego `3 + 1` → `4`.
- `typeof typeof null`: `typeof null` → `"object"` (string). `typeof "object"` → `"string"`. **`typeof typeof X` siempre es `"string"`**, porque `typeof` siempre devuelve un string.

---

### C2 _(0,5 pt)_

```
A
C
E
false
false
```

- `lista = []` → truthy → **A**.
- `lista.length` es `0` → falsy → no imprime B.
- `config.titulo` es `"0"` (un **string no vacío**, así que es **truthy**) → **C**.
- `config.count` es `0` (number) → falsy → no imprime D.
- `config.tags = []` → truthy → **E**.
- `!!config.count` → `!!0` → `false`.
- `!config.titulo` → `!"0"` → `false` (porque `"0"` es truthy, su negación es `false`).

> Trampa clave: `"0"` (string) y `0` (number) tienen veracidad opuesta.

---

### C3 _(0,5 pt)_

```
calculating
calculating
calculating
42 0 42 42
```

- `a = 0 || getDefault()`: `0` es falsy → evalúa `getDefault()` → imprime `"calculating"`, devuelve `42` → `a = 42`.
- `b = 0 ?? getDefault()`: `0` **NO es nullish**, así que `??` cortocircuita y **no llama** a `getDefault` → `b = 0`.
- `c = null ?? getDefault()`: `null` es nullish → ejecuta `getDefault()` → imprime, devuelve `42` → `c = 42`.
- `d = "" || getDefault()`: `""` es falsy → ejecuta → imprime, devuelve `42` → `d = 42`.

> Total: 3 prints de `"calculating"` antes del `console.log` final `42 0 42 42`.

---

### C4 _(0,5 pt)_

```
10 null 0
```

- `a` recibe `undefined` → se aplica el default → `a = 10`.
- `b` recibe `null` → **el default NO se aplica** (solo con `undefined`) → `b = null`.
- `c` recibe `0` → no es `undefined` → `c = 0`.

---

### C5 _(0,75 pt)_

```
vacío
undefined
click
undefined
```

- `data.items?.length ?? "vacío"`: `data.items` es `null`, `?.` cortocircuita → `undefined`. Luego `undefined ?? "vacío"` → `"vacío"`.
- `data.items?.[0]?.nombre`: `data.items` es `null`, todo lo demás cortocircuita → `undefined`.
- `data.config.handler?.()`: `handler` existe (no es nullish), `?.()` lo invoca → `"click"`.
- `data.missing?.deep`: `data.missing` es `undefined`, cortocircuita → `undefined`.

---

### C6 _(0,75 pt)_

```
0012
string
```

- `for...in` sobre un array entrega los **índices como strings**: `"0"`, `"1"`, `"2"`.
- `resultado` arranca en `0` (number).
- `0 + "0"`: `+` con un operando string fuerza concatenación → `"00"`.
- `"00" + "1"` → `"001"`.
- `"001" + "2"` → `"0012"`.
- `typeof "0012"` → `"string"`.

> Doble trampa: (1) `for...in` da strings, (2) `number + string` concatena.

---

### C7 _(0,5 pt)_

```
[ 1, 4, 5 ]
```

Traza:

| i   | `items` antes     | `items[i]`          | acción                | `items` después   |
| --- | ----------------- | ------------------- | --------------------- | ----------------- |
| 0   | `[1, 2, 4, 5, 6]` | `1` impar           | nada                  | `[1, 2, 4, 5, 6]` |
| 1   | `[1, 2, 4, 5, 6]` | `2` par             | `splice(1)`           | `[1, 4, 5, 6]`    |
| 2   | `[1, 4, 5, 6]`    | `5` impar           | nada _(¡saltó el 4!)_ | `[1, 4, 5, 6]`    |
| 3   | `[1, 4, 5, 6]`    | `6` par             | `splice(3)`           | `[1, 4, 5]`       |
| 4   | `[1, 4, 5]`       | `i ≥ length` → sale |                       |

El `4` se cuela porque al borrar el `2`, todos los elementos se desplazan una posición a la izquierda, pero el índice `i` sigue avanzando. Por eso este patrón es un anti-patrón clásico — usar `filter` o iterar al revés.

---

## Sección D — Pimp my Code _(4 pt)_

> Hay varias soluciones válidas para cada ejercicio. Lo que se evalúa es que aplique correctamente las técnicas vistas en clase y mantenga el comportamiento. Cada ejercicio vale **1 pt**.

---

### D1 _(1 pt)_

**Solución (early return):**

```ts
function puedeCancelar(pedido: Pedido): boolean {
  if (pedido.estado === "enviado") return true;
  if (pedido.estado === "pendiente") return pedido.cliente.email !== "";
  return false;
}
```

**Solución alternativa (expresión booleana directa):**

```ts
function puedeCancelar(pedido: Pedido): boolean {
  return (
    pedido.estado === "enviado" ||
    (pedido.estado === "pendiente" && pedido.cliente.email !== "")
  );
}
```

**Criterios de evaluación:**

- ✅ Eliminar el anti-patrón `if (cond) return true; else return false;` _(0,5 pt)_
- ✅ Aplanar el `if/else` anidado con early return o expresión única _(0,5 pt)_

---

### D2 _(1 pt)_

**Solución:**

```ts
function descripcionEstado(pedido: Pedido): string {
  const { estado } = pedido;

  if (estado === "cancelado") return "Pedido cancelado";
  if (estado === "entregado") return "Pedido entregado";
  if (estado === "pendiente") return "Pedido pendiente";

  const ciudad = pedido.cliente.direccion?.ciudad;
  return ciudad ? `Pedido en camino a ${ciudad}` : "Pedido enviado";
}
```

**Criterios de evaluación:**

- ✅ Aplanar el `if/else` anidado con early return _(0,3 pt)_
- ✅ Optional chaining (`?.`) en `direccion?.ciudad` _(0,3 pt)_
- ✅ Template literal en vez de concatenación con `+` _(0,2 pt)_
- ✅ Destructuring de `estado` (o cualquier mejora de legibilidad) _(0,2 pt)_

---

### D3 _(1 pt)_

**Solución:**

```ts
function calcularTotal(pedido: Pedido): number {
  const subtotal = pedido.productos.reduce(
    (acc, { precio, cantidad }) => acc + precio * cantidad,
    0,
  );
  const descuento = pedido.cupon?.descuento ?? 0;
  return subtotal * (1 - descuento / 100);
}
```

**Criterios de evaluación:**

- ✅ `for(i++)` + acumulador manual → `reduce` _(0,4 pt)_
- ✅ Destructuring `{ precio, cantidad }` en el callback _(0,2 pt)_
- ✅ `?.` + `??` en lugar del doble `if` para el cupón _(0,4 pt)_

---

### D4 _(1 pt)_

**Solución (con `for...of`):**

```ts
function pedidosPorCliente(pedidos: Pedido[]): Record<string, Pedido[]> {
  const resultado: Record<string, Pedido[]> = {};

  for (const pedido of pedidos) {
    const { email } = pedido.cliente;
    resultado[email] = [...(resultado[email] ?? []), pedido];
  }

  return resultado;
}
```

**Solución alternativa (con `reduce`):**

```ts
function pedidosPorCliente(pedidos: Pedido[]): Record<string, Pedido[]> {
  return pedidos.reduce<Record<string, Pedido[]>>((acc, pedido) => {
    const { email } = pedido.cliente;
    return { ...acc, [email]: [...(acc[email] ?? []), pedido] };
  }, {});
}
```

**Criterios de evaluación:**

- ✅ Cambiar `for(i++)` por `for...of` o `reduce` _(0,3 pt)_
- ✅ Destructuring del email _(0,2 pt)_
- ✅ Sustituir `if (!resultado[...])` por `??` _(0,3 pt)_
- ✅ Tipar el resultado correctamente (`Record<string, Pedido[]>`) en vez de `any` _(0,2 pt)_

---

## Resumen — Conceptos clave evaluados

- **Sintaxis base:** `{}` dual, propiedad/clave/valor, función vs invocación, operadores y operandos, `typeof null`, coerción con `+` y `-`, mutación con `const`, hoisting indirecto.
- **Condicionales:** falsy values exactos, `||` vs `??`, anti-patrón booleano (`return true; else return false`), early return, short-circuit evaluation con efectos secundarios.
- **Sintaxis moderna ES6+:** destructuring (con defaults y `null` vs `undefined`), spread vs rest según posición, optional chaining (`?.`, `?.[]`, `?.()`), nullish coalescing (`??`), template literals, arrow functions con retorno implícito de objeto.
- **Bucles:** `for...in` vs `for...of` (string keys, propiedades heredadas), `forEach` no admite `break`, mutación durante iteración con `splice`, `reduce` para acumular y agrupar, métodos encadenados.
