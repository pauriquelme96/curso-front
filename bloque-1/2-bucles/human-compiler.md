# Human Compiler: Bucles

## SNIPPET 1 (1)

```typescript
const frutas = ["manzana", "pera", "uva"];

for (const i in frutas) {
  console.log(typeof i, i);
}
```

## SNIPPET 2 (1)

```typescript
const nums = [1, 2, 3, 4, 5];

const resultado = nums.filter((n) => n % 2 === 0).map((n) => n * 10);

console.log(resultado);
console.log(nums);
```

## SNIPPET 3 (1)

```typescript
let i = 5;
const salida: string[] = [];

while (i > 0) {
  if (i === 3) {
    i--;
    continue;
  }
  salida.push(`val-${i}`);
  i--;
}

console.log(salida);
```

## SNIPPET 4

```typescript
const palabras = ["hola", "mundo", "js"];

const resultado = palabras.reduce((acc, palabra) => {
  acc[palabra] = palabra.length;
  return acc;
}, {});

console.log(resultado);
```

## SNIPPET 5

```typescript
const nombres = ["Ana", "Luis", "Marta"];
const salida: string[] = [];

for (let i = 0; i <= nombres.length; i++) {
  salida.push(nombres[i]);
}

console.log(salida);
```

## SNIPPET 6

```typescript
const numeros = [10, 20, 30, 40, 50];
let suma = 0;

for (const n of numeros) {
  if (suma > 40) {
    break;
  }
  suma += n;
}

console.log(suma);
```

## SNIPPET 7

```typescript
const items = [1, 2, 3, 4, 5];

for (let i = 0; i < items.length; i++) {
  if (items[i] % 2 === 0) {
    items.splice(i, 1);
  }
}

console.log(items);
```

## SNIPPET 8

```typescript
const nums = [1, 2, 3, 4, 5];
const resultado: number[] = [];

nums.forEach((n) => {
  if (n === 3) {
    return;
  }
  resultado.push(n * 2);
});

console.log(resultado);
```
