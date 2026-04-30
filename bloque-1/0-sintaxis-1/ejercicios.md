# Ejercicios — Base sintaxis JS

> Objetivo: dado un fragmento de código, identificar y clasificar cada parte del lenguaje por su nombre correcto.

---

## Ejercicio 1 — Variables y literales

```ts
let ciudad = "Madrid";
const temperatura = 22;
let activo = true;
let descripcion;
let saludo = `Hola desde ${ciudad}`;
```

**Preguntas:**

1. Lista todos los **identificadores** que aparecen.
2. Lista todos los **literales** que aparecen e indica su tipo.
3. ¿Qué variable queda en `undefined` nada más declararse? ¿Por qué?
4. ¿Cuál de estas declaraciones no se puede reasignar? ¿Qué keyword lo indica?
5. ¿Qué tipo de literal es el valor de `saludo`? ¿Qué hace `${ciudad}` dentro?

<details>
<summary>Solución</summary>

1. Identificadores: `ciudad`, `temperatura`, `activo`, `descripcion`, `saludo` (y también `ciudad` reutilizado dentro del template).
2. Literales:
   - `"Madrid"` → string
   - `22` → number
   - `true` → boolean
   - `` `Hola desde ${ciudad}` `` → template literal (string)
3. `descripcion` queda como `undefined` porque se declara sin valor inicial.
4. `temperatura`, indicado por `const`.
5. Es un **template literal** (va entre backticks). `${ciudad}` es una **interpolación**: inserta el valor actual de la variable `ciudad` dentro del string. El resultado es `"Hola desde Madrid"`.

</details>

---

## Ejercicio 2 — Operadores

```ts
let x = 10;
x += 5;
let resultado = x * 2 - 3;
let esMayor = resultado > 18;
let texto = "El resultado es " + resultado;
```

**Preguntas:**

1. Identifica todos los **operadores** que aparecen e indica su tipo (aritmético, asignación, comparación...).
2. ¿Cuántos operandos tiene cada operador de la línea 3?
3. ¿Qué tipo de valor produce `esMayor`? ¿Por qué?
4. ¿Qué hace `+=` en la línea 2? Reescríbela sin usar `+=`.

<details>
<summary>Solución</summary>

1. Operadores:
   - `=` → asignación (líneas 1, 3, 4, 5)
   - `+=` → asignación compuesta (línea 2)
   - `*` → aritmético (línea 3)
   - `-` → aritmético (línea 3)
   - `>` → comparación (línea 4)
   - `+` → aritmético / concatenación de strings (línea 5)
2. La línea 3 tiene **tres** operadores: `=`, `*` y `-`. Los tres son **binarios** (dos operandos cada uno). `*` opera sobre `x` y `2`; `-` opera sobre el resultado de `x * 2` y `3`; `=` opera sobre `resultado` y toda la expresión `x * 2 - 3`.
3. `esMayor` es `boolean`. Los operadores de comparación siempre producen `true` o `false`.
4. `x += 5` equivale a `x = x + 5`.

</details>

---

## Ejercicio 3 — Sentencias vs expresiones

```ts
let edad = 17;
let categoria;

if (edad >= 18) {
  categoria = "adulto";
} else {
  categoria = "menor";
}

const etiqueta = edad >= 18 ? "adulto" : "menor";
```

**Preguntas:**

1. Las líneas 4–8 forman una **sentencia** o una **expresión**? ¿Puedes usar ese bloque como argumento de una función?
2. La línea 10, ¿es una sentencia o una expresión? ¿Qué valor produce?
3. Señala el **operador ternario** e identifica sus tres partes (condición, valor si verdadero, valor si falso).
4. Las `{}` que envuelven las asignaciones del `if` y del `else`, ¿son literales de objeto o bloques de código?

<details>
<summary>Solución</summary>

1. El `if/else` es una **sentencia**. No produce un valor, por lo que no se puede pasar como argumento: `console.log(if ...)` sería un `SyntaxError`.
2. La línea 10 contiene una **expresión** (el ternario) dentro de una declaración de variable. La expresión produce `"adulto"` o `"menor"`.
3. Operador ternario: `edad >= 18 ? "adulto" : "menor"`
   - Condición: `edad >= 18`
   - Valor si verdadero: `"adulto"`
   - Valor si falso: `"menor"`
4. Son **bloques de código**, porque aparecen tras una sentencia (`if`/`else`), no en posición de expresión.

</details>

---

## Ejercicio 4 — Funciones: partes y vocabulario

```ts
function calcularDescuento(precio, porcentaje) {
  const ahorro = precio * (porcentaje / 100);
  return precio - ahorro;
}

const formatear = function (valor) {
  return "Total: " + valor + "€";
};

const resultado = calcularDescuento(80, 25);
const mensaje = formatear(resultado);

const numeros = [1, 2, 3];

const log = console.log;

numeros.forEach(log);
numeros.forEach(console.log);
```

**Preguntas:**

1. Identifica los **parámetros** de cada función y los **argumentos** con los que se invocan.
2. Clasifica cada función (`function declaration`, `function expression`, `arrow function`). ¿Cómo las diferencias a simple vista?
3. Señala todas las apariciones del **operador de llamada (invocación)**.
4. Lista todos los **identificadores** que aparecen en el fragmento.

<details>
<summary>Solución</summary>

1. Parámetros:
   - `calcularDescuento`: `precio`, `porcentaje`
   - `formatear`: `valor`

   Argumentos:
   - `calcularDescuento(80, 25)` → `80`, `25`
   - `formatear(resultado)` → `resultado`

2. - `calcularDescuento` → **function declaration**: empieza con la palabra clave `function` seguida de un nombre propio, no está a la derecha de un `=`.
   - `formatear` → **function expression**: la función (anónima, sin nombre tras `function`) está como valor de una asignación (`const formatear = function (...) {...}`).
   - No hay arrow functions en este fragmento.
3. El operador de llamada `()` aparece en:
   - `calcularDescuento(80, 25)` (línea 11)
   - `formatear(resultado)` (línea 12)
4. Identificadores: `calcularDescuento`, `precio`, `porcentaje`, `ahorro`, `formatear`, `valor`, `resultado`, `mensaje`.

</details>

---

## Ejercicio 5 — Objetos y arrays

```ts
const prod = {};
const producto = {
  nombre: "Teclado",
  precio: 49.99,
  disponible: true,
  describir() {
    return producto.nombre + " — " + producto.precio + "€";
  },
  sumar: function (a, b) {
    return a + b;
  },
};

const etiquetas = ["oferta", "tech", "nuevo"];
etiquetas.push("recomendado");
console.log(etiquetas[0]);
```

**Preguntas:**

1. ¿Cuántas **propiedades** tiene `producto`? Lista sus claves y valores.
2. ¿Cuál de esas propiedades es un **método**? ¿Cómo lo diferencias del resto?
3. En `etiquetas`, ¿qué son `"oferta"`, `"tech"` y `"nuevo"`? ¿Cuál es el índice de `"tech"`?
4. `.push("recomendado")`: ¿`push` es un parámetro, un argumento o un método? ¿Y `"recomendado"`?

<details>
<summary>Solución</summary>

1. 4 propiedades:
   - `nombre`: `"Teclado"` (string)
   - `precio`: `49.99` (number)
   - `disponible`: `true` (boolean)
   - `describir`: función (method)
2. `describir` es un **método** porque su valor es una función.
3. Son los **elementos** del array. `"tech"` tiene índice `1` (los índices empiezan en `0`).
4. `push` es un **método** del array. `"recomendado"` es el **argumento** que se le pasa.

</details>

---

## Ejercicio 6 — Arrow functions y parámetros avanzados

```ts
const multiplicar = (a, b = 2) => a * b;

function combinar(separador, ...palabras) {
  return palabras.join(separador);
}

const doble = multiplicar(7);
const triple = multiplicar(7, 3);
const frase = combinar(" - ", "uno", "dos", "tres");
```

**Preguntas:**

1. ¿Qué tipo de función es `multiplicar`? ¿Dónde está el `return`?
2. `b = 2` en la definición de `multiplicar`: ¿es una asignación normal? ¿Cómo se llama esto?
3. ¿Qué valor produce `doble`? ¿Y `triple`?
4. En `combinar`, ¿qué significa `...palabras`? ¿Qué tipo de valor tiene `palabras` dentro de la función?
5. Identifica todos los **argumentos** en las invocaciones de las líneas 7–9.

<details>
<summary>Solución</summary>

1. Es una **arrow function**. El `return` es **implícito**: cuando el cuerpo es una sola expresión sin llaves, se devuelve directamente.
2. No es una asignación normal. Es un **parámetro con valor por defecto**: si no se pasa argumento para `b`, toma el valor `2`.
3. `doble` = `7 * 2` = `14`. `triple` = `7 * 3` = `21`.
4. `...palabras` es un **rest parameter**: agrupa todos los argumentos restantes en un **array**. Dentro de la función, `palabras` es `["uno", "dos", "tres"]`.
5. Argumentos:
   - `multiplicar(7)` → `7`
   - `multiplicar(7, 3)` → `7`, `3`
   - `combinar(" - ", "uno", "dos", "tres")` → `" - "`, `"uno"`, `"dos"`, `"tres"`

</details>

---

## Ejercicio 7 — Referencias vs invocaciones y callbacks

```ts
function mostrarMensaje(texto) {
  console.log("Mensaje: " + texto);
}

const boton = document.querySelector("#btn");

boton.addEventListener("click", mostrarMensaje);
boton.addEventListener("dblclick", mostrarMensaje());
```

**Preguntas:**

1. En la línea 7, ¿se ejecuta `mostrarMensaje` al llegar a esa línea? ¿Por qué?
2. En la línea 8, ¿qué se está pasando como segundo argumento? ¿Cuál es el problema?
3. ¿Cómo se llama pasar una función como argumento a otra función? ¿Necesita paréntesis?
4. ¿En cuántos sitios aparece `mostrarMensaje` como **referencia** y en cuántos como **invocación**?

<details>
<summary>Solución</summary>

1. **No se ejecuta**. `mostrarMensaje` sin paréntesis es una **referencia** (un puntero a la función). Se la pasamos al evento para que la ejecute más tarde, cuando ocurra el clic.
2. La línea 8 tiene dos problemas encadenados:
   - `mostrarMensaje()` **se ejecuta inmediatamente** al leer esa línea. En consola verás `"Mensaje: undefined"` nada más cargar el script (porque no se pasa argumento y `texto` es `undefined`).
   - Esa invocación devuelve `undefined` (la función no tiene `return`). Así que lo que se registra como callback del evento `dblclick` es `undefined`, no la función. Al hacer doble clic, no pasará nada.
3. Se llama **callback**. No lleva paréntesis: se pasa la **referencia**, no el resultado de ejecutarla.
4. Referencias: línea 7 (`mostrarMensaje` sin `()`). Invocaciones: línea 8 (`mostrarMensaje()`).

</details>

---

## Ejercicio 8 — Todo junto

```ts
const usuarios = [
  { nombre: "Ana", edad: 28, activo: true },
  { nombre: "Luis", edad: 16, activo: false },
  { nombre: "Sara", edad: 34, activo: true },
];

function filtrarActivos(lista) {
  return lista.filter((usuario) => usuario.activo);
}

const mayoresDeEdad = usuarios.filter((u) => u.edad >= 18);
const activosMayores = filtrarActivos(mayoresDeEdad);

console.log(activosMayores.length);
```

**Preguntas:**

1. `usuarios` es un array de objetos. ¿Cuántas **propiedades** tiene cada objeto? Lista sus claves.
2. En la línea 8, `.filter(...)` recibe una **arrow function** como argumento. ¿Cómo se llama este patrón?
3. `(usuario) => usuario.activo`: ¿Cuál es el parámetro? ¿Cuál es el valor de retorno (implícito)?
4. Clasifica cada línea del fragmento: ¿es una **sentencia** o contiene una **expresión** relevante?
5. Identifica todos los tipos de función que aparecen (`declaration`, `expression`, `arrow`).
6. ¿Qué valor imprime `console.log` al final? Razona la respuesta.

<details>
<summary>Solución</summary>

1. Cada objeto tiene 3 propiedades: `nombre`, `edad`, `activo`.
2. Se llama **callback**. Se pasa una función como argumento para que `filter` la ejecute en cada elemento.
3. Parámetro: `usuario`. Retorno implícito: `usuario.activo` (un booleano). `filter` incluye el elemento si el callback devuelve `true`.
4. Clasificación:
   - Líneas 1–5: sentencia de declaración con literal de array como expresión.
   - Líneas 7–9: sentencia de declaración de función (`function declaration`).
   - Línea 11: sentencia con expresión de llamada a método (`.filter(...)`).
   - Línea 12: sentencia con expresión de invocación de función.
   - Línea 14: sentencia con expresión de invocación de método.
5. Tipos de función:
   - `filtrarActivos` → `function declaration` (línea 7)
   - `(usuario) => usuario.activo` → `arrow function` (dentro de `filtrarActivos`)
   - `(u) => u.edad >= 18` → `arrow function` (línea 11)
6. `activosMayores` contiene los usuarios activos y mayores de edad: solo `Ana` (28, activo) y `Sara` (34, activo). `Luis` es menor de edad. Por tanto, `activosMayores.length` es `2`.

</details>

---

## Ejercicio 9 — Las dos caras de `{}`

```ts
const config = { debug: true, version: 1 };

function procesar(datos) {
  if (datos.activo) {
    const resumen = { id: datos.id, ok: true };
    return resumen;
  }
  return { id: datos.id, ok: false };
}

const r = procesar({ id: 42, activo: true });
```

**Preguntas:**

1. Localiza todas las apariciones de `{...}` en el fragmento (por línea).
2. Clasifica cada una como **literal de objeto** o **bloque de código**. Justifica brevemente cada clasificación.
3. En la invocación `procesar({ id: 42, activo: true })`, ¿qué papel juega el `{...}`? ¿Cómo se llama en relación a la función?
4. ¿Hay algún caso que te haya podido despistar a primera vista? ¿Por qué?

<details>
<summary>Solución</summary>

1. Hay 6 parejas de `{...}`:
   - Línea 1: `{ debug: true, version: 1 }`
   - Líneas 3–9: las `{}` que envuelven el cuerpo de `procesar`
   - Líneas 4–7: las `{}` que envuelven el cuerpo del `if`
   - Línea 5: `{ id: datos.id, ok: true }`
   - Línea 8: `{ id: datos.id, ok: false }`
   - Línea 11: `{ id: 42, activo: true }`

2. Clasificación:
   - Línea 1 → **literal de objeto**: aparece a la derecha de un `=`, posición de expresión.
   - Líneas 3–9 → **bloque de código**: cuerpo de una función.
   - Líneas 4–7 → **bloque de código**: cuerpo de un `if`.
   - Línea 5 → **literal de objeto**: valor asignado a `resumen`.
   - Línea 8 → **literal de objeto**: valor que devuelve `return` (posición de expresión).
   - Línea 11 → **literal de objeto**: es el argumento que se le pasa a `procesar`.

   Total: **4 literales de objeto** y **2 bloques de código**.

3. El `{ id: 42, activo: true }` de la línea 11 es un literal de objeto que se pasa como **argumento** a la función `procesar`. Dentro de la función, el parámetro `datos` toma ese valor.

4. El caso típico que despista: `return { ... }` (línea 8). A primera vista puede parecer que `{` abre un bloque de la función, pero en realidad va **después de `return`**, que exige una expresión a su derecha → por tanto es un literal de objeto. Regla mental: si lo que hay antes de `{` espera un valor, es literal; si es una sentencia (`if`, `else`, `function(...)`, `for`, etc.), es bloque.

</details>

---

## Ejercicio 10 — Operadores lógicos, `typeof` e igualdad

```ts
const edad = 20;
const nombre = "Ana";
const activo = true;

const adulto = edad >= 18 && activo;
const nombreValido = typeof nombre === "string" && nombre.length > 0;
const invitado = !activo || edad < 18;

console.log(5 == "5");
console.log(5 === "5");
```

**Preguntas:**

1. Identifica todos los **operadores lógicos** del fragmento. ¿Qué valor (`true`/`false`) produce cada una de las variables `adulto`, `nombreValido` e `invitado`?
2. En la expresión `typeof nombre === "string"`: ¿cuántos operadores hay? Nómbralos e indica su **aridad** (unario, binario, ternario). ¿Cuál se evalúa primero?
3. `!activo`: ¿qué operador es `!` y de qué aridad? ¿Qué valor produce aquí?
4. ¿Qué imprimen las líneas 9 y 10? ¿Por qué son distintas? ¿Cuál deberías usar siempre?

<details>
<summary>Solución</summary>

1. Operadores lógicos: `&&` (líneas 5 y 6), `||` (línea 7), `!` (línea 7).
   - `adulto` → `true`. `edad >= 18` es `true`, `activo` es `true`, `true && true` es `true`.
   - `nombreValido` → `true`. `typeof nombre === "string"` es `true`, `nombre.length > 0` es `true` (length es 3), `true && true` es `true`.
   - `invitado` → `false`. `!activo` es `false`, `edad < 18` es `false`, `false || false` es `false`.

2. Hay **dos operadores**:
   - `typeof` → **unario** (un solo operando: `nombre`).
   - `===` → **binario** (dos operandos: el resultado de `typeof nombre` y `"string"`).

   Se evalúa primero `typeof` (precedencia más alta y es unario). El flujo es: `typeof nombre` → `"string"`; luego `"string" === "string"` → `true`.

3. `!` es el operador de **negación lógica**, de aridad **unaria**. Invierte el valor booleano. Como `activo` es `true`, `!activo` es `false`.

4. - Línea 9: `5 == "5"` imprime `true`. El operador `==` (igualdad suelta) **convierte tipos** antes de comparar: el string `"5"` se convierte a número antes de comparar con `5`.
   - Línea 10: `5 === "5"` imprime `false`. El operador `===` (igualdad estricta) compara **valor y tipo**: un `number` nunca será igual a un `string`.

   Usa siempre `===`. El comportamiento de `==` es una fuente clásica de bugs.

</details>
