# Condicionales

## Truthy y falsy

En JavaScript, cualquier valor puede evaluarse como booleano en un contexto condicional. Los valores **falsy** son exactamente estos seis:

```ts
(false, 0, "", null, undefined, NaN);
```

Todo lo demás es **truthy**, incluidos `[]`, `{}` y `"0"`.

```ts
if ("hola") console.log("truthy"); // se ejecuta
if (0) console.log("falsy"); // NO se ejecuta
if ([]) console.log("truthy"); // se ejecuta (¡cuidado!)
```

---

## `==` vs `===`

- `===` (igualdad estricta): compara valor **y tipo**. Úsalo siempre.
- `==` (igualdad abstracta): convierte los tipos antes de comparar. Comportamiento sorprendente.

```ts
0 == "0"; // true  ← coerción de tipos
0 === "0"; // false ← tipos distintos
null == undefined; // true
null === undefined; // false
```

> Regla práctica: usa siempre `===` a menos que tengas una razón muy concreta para no hacerlo.

---

## Ternario vs if/else

El **operador ternario** es una expresión (devuelve un valor), mientras que `if/else` es una sentencia.

```ts
// if/else
let mensaje;
if (esAdmin) {
  mensaje = "Bienvenido, admin";
} else {
  mensaje = "Bienvenido, usuario";
}

// ternario equivalente
const mensaje = esAdmin ? "Bienvenido, admin" : "Bienvenido, usuario";
```

Úsalo cuando el resultado cabe en una línea y es fácil de leer. Evita ternarios anidados.

---

## Anti-patrón del booleano redundante

Comparar un booleano con `true`/`false` es redundante:

```ts
// ❌ redundante
if (esActivo === true) { ... }
return estaLogueado === true ? "sí" : "no";

// ✅ correcto
if (esActivo) { ... }
return estaLogueado ? "sí" : "no";
```

La misma lógica aplica al negar: usa `!valor` en vez de `valor === false`.

---

## Early return

Salir pronto de una función elimina anidamiento y hace el código más legible.

```ts
// ❌ anidado
function procesarPago(usuario: Usuario) {
  if (usuario) {
    if (usuario.saldo > 0) {
      // lógica principal...
    }
  }
}

// ✅ early return
function procesarPago(usuario: Usuario) {
  if (!usuario) return;
  if (usuario.saldo <= 0) return;

  // lógica principal sin anidamiento
}
```

---

## Nullish coalescing (`??`) vs logical OR (`||`)

- `||` devuelve el lado derecho si el izquierdo es **falsy** (incluye `0`, `""`, `false`).
- `??` devuelve el lado derecho solo si el izquierdo es **`null` o `undefined`**.

```ts
const volumen = configuracion.volumen ?? 50;
// Si volumen es 0, lo respeta → 0

const volumen = configuracion.volumen || 50;
// Si volumen es 0, lo sobreescribe → 50  ← bug silencioso
```

Usa `??` cuando `0`, `""` o `false` son valores válidos.

---

## Short-circuiting

Los operadores `&&` y `||` no siempre evalúan los dos operandos:

- `&&` se detiene en el **primer falsy**.
- `||` se detiene en el **primer truthy**.

```ts
// Renderizado condicional (patrón común en React)
const elemento = usuario && <Perfil usuario={usuario} />;

// Valor por defecto
const nombre = respuesta.nombre || "Anónimo";

// Ejecutar algo solo si existe
usuario?.admin && ejecutarAccionAdmin();
```

Esto también se usa para evitar errores al acceder a propiedades de valores que podrían ser `null`.
