# Human Compiler: Sintaxis moderna ES6+ (5/5)

## SNIPPET 1 — Destructuring + spread/rest en objetos (1)

```typescript
const usuario = { nombre: "Leo", edad: 30, email: "leo@ejemplo.com" };

const { nombre, ...resto } = usuario;
const copia = { ...resto, nombre: "Ana" };

console.log(nombre);
console.log(copia);
console.log(usuario.nombre);
```

## SNIPPET 2 — Optional chaining (`?.`) (0,66)

```typescript
const datos = {
  usuario: {
    direccion: {
      ciudad: "Madrid",
    },
  },
};

const ciudad = datos.usuario?.direccion?.ciudad;
const cp = datos.usuario.direccion.cp;
const pais = datos.pais?.nombre;

console.log(ciudad);
console.log(cp);
console.log(pais);
```

## SNIPPET 3 — Destructuring + spread/rest en arrays (0,75)

```typescript
const nums = [10, 20, 30, 40, 50];

const [a, , b, ...resto] = nums;

const combinado = [...resto, 0, ...nums];

console.log(a);
console.log(b);
console.log(resto);
console.log(combinado);
```

## SNIPPET 4 — Arrow functions, retorno implícito y defaults

```typescript
const doble = (n: number) => n * 2;

const crearPunto = (x: number, y: number) => ({ x, y });

const saludar = (nombre: string, saludo = "Hola") => `${saludo}, ${nombre}!`;

console.log(doble(5));
console.log(crearPunto(3, 7));
console.log(saludar("Leo"));
console.log(saludar("Ana", "Buenas"));
```

## SNIPPET 5 — Funciones como valores (higher-order)

```typescript
const multiplicador = (factor: number) => (n: number) => n * factor;

const porTres = multiplicador(3);
const porDiez = multiplicador(10);

const resultado = [1, 2, 3].map(porTres);
const filtrado = resultado.filter((n) => n > 4);
const total = filtrado.reduce((acc, n) => acc + n, 0);

console.log(resultado);
console.log(filtrado);
console.log(total);
```
