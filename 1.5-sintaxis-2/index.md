# Sintaxis moderna (ES6+)

## Acceso a propiedades: dot vs bracket notation

Hay dos formas de acceder a una propiedad de un objeto:

```ts
const usuario = {
  nombre: "Leo",
  edad: () => "hola",
  address: {
    ciudad: "Madrid",
    pais: "España",
  }
};



usuario.nombre; // string
usuario.edad // number
usuario.address -> { ciudad: "Madrid", pais: "España" }
usuario.address.ciudad; // "Madrid"

usuario.nombre; // dot notation    → estático
usuario[edad > 18 ? "edad" : "nombre"]; // bracket notation → dinámico

function getProp() {
  return "edad";
}
```

La **dot notation** solo funciona cuando la clave es un identificador válido y la conoces en tiempo de escritura. La **bracket notation** acepta cualquier string (o expresión) y permite acceder a la propiedad de forma **dinámica**.

```ts
// Clave dinámica (no la conoces hasta runtime)
const campo = "edad";
usuario[campo]; // 30

// Clave con caracteres no válidos para dot notation
const config = { "max-width": 800 };
config["max-width"]; // ✅
config.max - width; // ❌ error de sintaxis
```

> Regla práctica: usa dot notation por defecto. Solo recurre a brackets si la clave es dinámica o no es un identificador válido.

---

## Optional chaining (`?.`)

Accede a propiedades anidadas sin petar si algún nivel intermedio es `null` o `undefined`.

```ts
// ❌ verboso y frágil
const ciudad = usuario && usuario.direccion && usuario.direccion.ciudad;

// ✅ optional chaining
const ciudad = usuario?.direccion?.ciudad;
```

Si en algún punto de la cadena el valor es `null`/`undefined`, la expresión devuelve `undefined` en vez de lanzar un error.

También funciona con llamadas a funciones y acceso por índice:

```ts
usuario?.saludar?.(); // solo llama si saludar existe
usuarios?.[0]?.nombre; // acceso seguro a array
```

> No abuses. Si un valor **debería** existir siempre, usar `?.` oculta bugs. Úsalo para propiedades genuinamente opcionales.

---

## Destructuring de objetos

Extraer propiedades de un objeto en variables, en una sola línea:

```ts
const usuario = { nombre: "Leo", edad: 30, email: "leo@ejemplo.com" };

// ❌ repetitivo
const nombre = usuario.nombre;
const edad = usuario.edad;

// ✅ destructuring
const { nombre, edad } = usuario;
```

---

## Shorthand properties

Cuando el nombre de la variable coincide con la clave del objeto, puedes omitir la repetición:

```ts
const nombre = "Leo";
const edad = 30;

// ❌ repetitivo
const usuario = { nombre: nombre, edad: edad };

// ✅ shorthand
const usuario = { nombre, edad, email: "ian@ejemplo.com" };
```

También funciona con métodos:

```ts
// ❌
const obj = {
  saludar: () => {
    return "hola";
  },
};

// ✅ shorthand method
const obj = {
  saludar() {
    return "hola";
  },
};
```

---

## Spread y rest en objetos (`...`)

Mismo operador, dos usos según el contexto.

### Spread: expandir un objeto dentro de otro

```ts
const base = { nombre: "Leo", edad: 30 };
const extendido = { ...base, email: "leo@ejemplo.com" };
// { nombre: "Leo", edad: 30, email: "leo@ejemplo.com" }
```

Úsalo para **crear copias inmutables** en vez de mutar:

```ts
// ❌ muta el original
usuario.edad = 31;

// ✅ nuevo objeto, original intacto
const actualizado = { ...usuario, edad: 31 };
```

> Las propiedades posteriores sobrescriben a las anteriores. El orden importa.

### Rest: agrupar las propiedades "sobrantes"

```ts
const { nombre, ...resto } = usuario;
// nombre: "Leo"
// resto: { edad: 30, email: "leo@ejemplo.com" }
```

Patrón muy útil para **quitar** una propiedad de un objeto sin mutarlo.

---

## Destructuring de arrays

Igual que en objetos, pero por **posición** en vez de por nombre:

```ts
const coords = [40.4, -3.7];
const [lat, lng] = coords;

// Saltarse elementos con comas
const [primero, , tercero] = [1, 2, 3];

// Valores por defecto
const [a = 0, b = 0] = [10];
// a: 10, b: 0
```

Uso típico: desempaquetar el retorno de `useState` en React, `entries()` de un Map, etc.

```ts
const [count, setCount] = useState(0);

for (const [key, value] of Object.entries(objeto)) {
  // ...
}
```

---

## Spread y rest en arrays

### Spread: expandir elementos

```ts
const a = [1, 2];
const b = [3, 4];
const combinado = [...a, ...b]; // [1, 2, 3, 4]

// Copia (shallow) de un array
const copia = [...original];

// Insertar en medio
const conCero = [...a, 0, ...b]; // [1, 2, 0, 3, 4]
```

### Rest: agrupar elementos

```ts
const [primero, ...resto] = [1, 2, 3, 4];
// primero: 1
// resto: [2, 3, 4]
```

> Rest solo puede aparecer **al final** del patrón, tanto en arrays como en argumentos de función.

---

## Arrow functions vs function declaration

Dos formas de declarar funciones con diferencias importantes.

```ts
// function declaration
function sumar(a: number, b: number) {
  return a + b;
}

// arrow function
const sumar = (a: number, b: number) => a + b;
```

> Regla práctica: usa **arrow functions por defecto**. Usa `function` cuando necesites hoisting, métodos de objeto con `this`, o generadores.

---

## Parámetros por defecto y rest params

### Defaults

```ts
function saludar(nombre: string, saludo = "Hola") {
  return `${saludo}, ${nombre}`;
}

saludar("Leo"); // "Hola, Leo"
saludar("Leo", "Buenas"); // "Buenas, Leo"
```

El default se aplica solo si el argumento es `undefined` (no con `null`, `0`, `""`).

### Rest params

Agrupa argumentos variables en un array:

```ts
function sumar(...numeros: number[]) {
  return numeros.reduce((acc, n) => acc + n, 0);
}

sumar(1, 2, 3, 4); // 10
```

Sustituye al viejo `arguments`, que no existe en arrow functions.

---

## Destructuring en parámetros

Puedes destructurar directamente en la firma de la función. Muy común cuando una función recibe un objeto de opciones:

```ts
// ❌ acceso manual
function crearUsuario(opciones: Opciones) {
  const nombre = opciones.nombre;
  const edad = opciones.edad ?? 0;
  // ...
}

// ✅ destructuring en el parámetro
function crearUsuario({ nombre, edad = 0 }: Opciones) {
  // ...
}
```

Lo mismo con arrays:

```ts
function distancia([x1, y1]: Punto, [x2, y2]: Punto) {
  return Math.hypot(x2 - x1, y2 - y1);
}
```

> Patrón muy frecuente en componentes de React: `function Boton({ texto, onClick }: Props)`.

---

## Retorno implícito vs explícito

Las arrow functions tienen dos formas de devolver un valor:

```ts
// Retorno explícito (con llaves y return)
const doble = (n: number) => {
  return n * 2;
};

// Retorno implícito (sin llaves, sin return)
const doble = (n: number) => n * 2;
```

El retorno implícito solo funciona con **una sola expresión**. En cuanto necesites varias líneas, lógica intermedia, o un `if`, pasa a retorno explícito.

### El truco de devolver un objeto literal

Esto **no funciona** como esperas:

```ts
const crearPunto = (x: number, y: number) => {
  (x, y);
};
// ❌ las llaves se interpretan como cuerpo de función, no como objeto
```

Solución: envolver el objeto en paréntesis.

```ts
const crearPunto = (x: number, y: number) => ({ x, y });
// ✅ los paréntesis fuerzan que se interprete como expresión
```

---

## Funciones como valores

En JavaScript las funciones son **valores de primera clase**: se pueden asignar a variables, pasar como argumentos y devolver desde otras funciones.

```ts
// Pasar como argumento (callback)
[1, 2, 3].map((n) => n * 2); // [2, 4, 6]
[1, 2, 3].filter((n) => n > 1); // [2, 3]
boton.addEventListener("click", manejar); // pasar la referencia

// Devolver una función desde otra
const multiplicador = (factor: number) => (n: number) => n * factor;
const porTres = multiplicador(3);
porTres(5); // 15
```

### Anti-patrón: envolver una función cuando no hace falta

```ts
// ❌ wrapper innecesario
[1, 2, 3].map((n) => doble(n));

// ✅ pasar la referencia directamente
[1, 2, 3].map(doble);
```

Solo envuélvela si necesitas transformar los argumentos o añadir lógica extra.
