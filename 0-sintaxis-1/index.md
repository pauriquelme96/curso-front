# Base sintaxis JS

> Objetivo: reconocer y nombrar correctamente cada parte del lenguaje al leer código JS. No buscamos dominar peculiaridades, sino tener el vocabulario para señalar un trozo de código y decir "esto es X".

---

## Comentarios

Un comentario es texto que el motor JS ignora completamente. Sirve para documentar o deshabilitar código temporalmente.

```ts
// Comentario de una línea

/*
  Comentario
  de varias líneas
*/
```

> Escribe comentarios para explicar el _por qué_, no el _qué_. Si el código necesita un comentario para entenderse, probablemente se puede reescribir más claro.

---

## Identificadores

Un **identificador** es el nombre que le das a algo en JS: una variable, una función, un parámetro, una propiedad, una clase...

Reglas:

- Pueden contener letras, dígitos, `_` y `$`.
- No pueden empezar por dígito.
- Distinguen mayúsculas (`edad` ≠ `Edad`).
- No pueden ser palabras reservadas (`let`, `return`, `function`, `class`...).

```ts
let nombre;       // ✅
let _privado;     // ✅
let $precio;      // ✅
let 1usuario;     // ❌ empieza por dígito
let return;       // ❌ palabra reservada
```

> Convención JS: `camelCase` para variables y funciones, `PascalCase` para clases, `UPPER_SNAKE_CASE` para constantes globales.

---

## Literales

Un **literal** es la forma de escribir un valor directamente en el código. Cada tipo de valor tiene su forma literal:

```ts
42                 // literal numérico
"hola"             // literal de string (comillas dobles)
'mundo'            // literal de string (comillas simples)
`Hola ${nombre}`   // literal de template (backticks) — permite interpolación
true               // literal booleano
null               // literal nulo
{ x: 1, y: 2 }     // literal de objeto
[1, 2, 3]          // literal de array
```

> "Literal" = aparece tal cual escrito en el código, sin cálculo previo. Un identificador _referencia_ un valor; un literal _es_ el valor.

---

## Tipos de datos primitivos

Un **tipo primitivo** es el valor más básico que puede existir en JS. Son inmutables.

| Tipo        | Ejemplo literal                 |
| ----------- | ------------------------------- |
| `number`    | `42`, `3.14`, `-7`              |
| `string`    | `"hola"`, `'mundo'`, `` `JS` `` |
| `boolean`   | `true`, `false`                 |
| `null`      | `null`                          |
| `undefined` | `undefined`                     |

```ts
typeof 42; // "number"
typeof "hola"; // "string"
typeof true; // "boolean"
typeof null; // "object"  ← bug histórico de JS, null ES primitivo
typeof undefined; // "undefined"
```

> `null` y `undefined` representan "ausencia de valor" con matices distintos: `undefined` = nunca se asignó; `null` = se asignó explícitamente como vacío.

También existen `bigint` (números enteros gigantes: `9007199254740991n`) y `symbol` (identificadores únicos: `Symbol("id")`). Raramente los verás en frontend.

---

## Declaración de variables

Una **declaración de variable** reserva un nombre (identificador) en memoria y, opcionalmente, le asigna un valor inicial.

```ts
let edad; // declaración sin valor → undefined
let nombre = "Ana"; // declaración con inicialización
const PI = 3.14; // constante: no se puede reasignar
var legado = true; // forma antigua, evitar
```

### `const` vs `let` vs `var`

|             | `const`     | `let`       | `var`   |
| ----------- | ----------- | ----------- | ------- |
| Reasignable | ❌          | ✅          | ✅      |
| Scope       | bloque `{}` | bloque `{}` | función |

> Regla práctica: usa `const` por defecto. Cambia a `let` solo si sabes que el valor va a cambiar. Nunca uses `var` (lo verás en código legacy).

---

## Objetos y arrays

Los valores no primitivos más comunes. Ambos son "objetos" internamente, pero con sintaxis y propósito diferentes.

### Objeto

Colección de pares `clave: valor`:

```ts
const usuario = {
  nombre: "Ana",
  edad: 30,
  activo: true,
};

usuario.nombre; // "Ana"  — acceso por punto
usuario["edad"]; // 30     — acceso por corchetes
```

Cada par es una **propiedad**. `nombre` es la **clave**, `"Ana"` es el **valor**. Si el valor de una propiedad es una función, se llama **método**:

```ts
const usuario = {
  nombre: "Ana",
  saludar() {
    return "Hola";
  }, // saludar es un método
};

usuario.saludar(); // invocación de método
```

### Array

Colección ordenada de valores, accesible por índice:

```ts
const colores = ["rojo", "verde", "azul"];

colores[0]; // "rojo"
colores.length; // 3  — propiedad
colores.push("amarillo"); // método
```

Cada posición es un **elemento**. El primer índice es `0`.

> ⚠️ `{}` tiene **dos significados distintos** según el contexto:
>
> - **Literal de objeto**, cuando aparece en una expresión: `const x = {}`, `fn({})`.
> - **Bloque de código**, cuando aparece como sentencia: `if (...) {}`, `function() {}`.
>
> Misma sintaxis, significado distinto. Lo veremos al diferenciar sentencias y expresiones.

---

## Bloques de código `{}`

Un **bloque** es un conjunto de sentencias encerradas entre llaves. Define un nuevo scope léxico cuando se usa con `let`/`const`.

```ts
{
  const x = 10;
  console.log(x); // 10
}

console.log(x); // ❌ ReferenceError — x no existe fuera del bloque
```

Los bloques aparecen en funciones, condicionales, bucles, clases, etc. Identificar si unas `{}` son un bloque o un literal de objeto es una habilidad clave que entrenaremos en la siguiente sección.

---

## Sentencias vs expresiones

Esta distinción es fundamental para leer JS con soltura.

- Una **expresión** produce un valor.
- Una **sentencia** realiza una acción (no necesariamente devuelve un valor útil).

```ts
// Expresiones — producen un valor
3 + 4                  // 7
"hola".length          // 5
esAdmin ? "sí" : "no"  // "sí" o "no"
llamarFuncion()        // el valor devuelto por la función

// Sentencias — realizan una acción
let x = 5;              // declaración
if (x > 0) { ... }      // condicional
for (let i = 0; ...) {} // bucle
return x;


```

> Una expresión puede usarse donde se espera un valor (como argumento, dentro de otra expresión...). Una sentencia no.

```ts
// ✅ expresión como argumento
console.log(3 + 4);

// ❌ sentencia como argumento — SyntaxError
console.log(let x = 5);
```

Esto también explica el doble significado de `{}`:

```ts
const x = { a: 1 }; // { } en posición de expresión → literal de objeto
if (cond) {
  a = 1;
} // { } tras una sentencia → bloque de código
```

---

## Operadores

Un **operador** transforma o combina valores (**operandos**) para producir un nuevo valor. Un operador + sus operandos forman una expresión.

Por número de operandos:

- **Unario** — un operando: `!x`, `-x`, `typeof x`
- **Binario** — dos operandos: `a + b`, `x === y`
- **Ternario** — tres operandos: solo existe uno, `cond ? a : b`

### Aritméticos

```ts
5 + 2; // 7
5 - 2; // 3
5 * 2; // 10
5 / 2; // 2.5
5 % 2; // 1   (resto)
5 ** 2; // 25  (potencia)
```

### Asignación

```ts
let x = 10;
x += 5; // x = x + 5 → 15
x -= 3; // x = x - 3 → 12
x *= 2; // x = x * 2 → 24
```

### Comparación

```ts
5 === 5; // true  — igualdad estricta (valor y tipo)
5 !== "5"; // true  — desigualdad estricta
5 > 3; // true
5 <= 5; // true
```

> Existe también `==` (igualdad suelta), que convierte tipos antes de comparar y produce resultados confusos (`0 == ""` es `true`). Lo verás en código legacy. Usa siempre `===`.

### Lógicos

```ts
true && false; // false — AND: verdadero si ambos son truthy
true || false; // true  — OR:  verdadero si al menos uno es truthy
!true; // false — NOT: invierte el booleano
```

### Ternario

```ts
const estado = edad >= 18 ? "adulto" : "menor";
```

Único operador con tres operandos. Es la versión en forma de expresión del `if/else`: produce un valor.

### Typeof

```ts
typeof 42; // "number"
typeof "hola"; // "string"
typeof undefined; // "undefined"
```

---

## Funciones

Una **función** es un bloque de código reutilizable con nombre. Puede recibir datos de entrada (**parámetros**) y devolver un resultado.

### Declaración de función (function declaration)

```ts
function saludar(nombre) {
  return "Hola, " + nombre;
}
```

Siempre tiene nombre. Se puede llamar antes de su línea en el archivo (tiene _hoisting_).

### Expresión de función (function expression)

```ts
const saludar = function (nombre) {
  return "Hola, " + nombre;
};
```

La función es el lado derecho de una asignación. Puede ser anónima o tener nombre interno.

### Arrow function

```ts
const saludar = (nombre) => {
  return "Hola, " + nombre;
};
```

Sintaxis concisa. Si el cuerpo es una sola expresión, el `return` es implícito. Tiene particularidades con `this` que veremos más adelante.

### Comparativa rápida

|          | Declaration | Expression | Arrow    |
| -------- | ----------- | ---------- | -------- |
| Sintaxis | verbosa     | media      | concisa  |
| Nombre   | obligatorio | opcional   | opcional |

> Las tres son "funciones". Lo importante ahora es reconocer su forma al verlas escritas.

---

## Invocación (llamada)

Hay que distinguir la **función** (su definición) de su **invocación** (el acto de ejecutarla). Los paréntesis `()` son el operador de llamada:

```ts
function saludar(nombre) {
  return "Hola, " + nombre;
}

saludar; // referencia a la función (no la ejecuta)
saludar("Ana"); // invocación — los () la ejecutan
```

La diferencia importa mucho al pasar funciones como argumento (callbacks):

```ts
boton.addEventListener("click", saludar); // ✅ pasa la función
boton.addEventListener("click", saludar()); // ❌ pasa el resultado de ejecutarla ya
```

---

## Parámetros y argumentos

- **Parámetro**: el nombre que aparece en la definición de la función (es una variable local).
- **Argumento**: el valor concreto que se pasa al invocar.

```ts
//               ↓ parámetros
function sumar(a, b) {
  return a + b;
}

sumar(3, 5);
//    ↑ argumentos
```

### Valor por defecto

```ts
function saludar(nombre = "desconocido") {
  return "Hola, " + nombre;
}

saludar(); // "Hola, desconocido"
saludar("Lucía"); // "Hola, Lucía"
```

### Rest params (`...`)

Cuando no sabes cuántos argumentos vas a recibir:

```ts
function sumarTodos(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}

sumarTodos(1, 2, 3, 4); // 10
```

> Un **parámetro** vive en la firma de la función. Un **argumento** vive en la invocación. Son conceptos distintos aunque se confunden habitualmente.
