# Human Compiler: Condicionales (6/7)

## SNIPPET 1 (1)

```typescript
const user = { name: "", age: 0 };

if ("") {
  console.log("Tiene nombre");
} else {
  console.log("No tiene nombre");
}
```

## SNIPPET 2 (1)

```typescript
const value = "5";

if (value == 5) {
  console.log("A");
} else if (value === 5) {
  console.log("B");
} else {
  console.log("C");
}
```

## SNIPPET 3 (1)

```typescript
function getDiscount(user) {
  if (user.isPremium) {
    return 20;
  } else if (user.orders > 10) {
    return 10;
  } else if (user.isPremium && user.orders > 10) {
    return 30;
  }
  return 0;
}

const user = { isPremium: true, orders: 15 };
console.log(getDiscount(user));
```

## SNIPPET 4 (1)

```typescript
const config = { volume: 0, theme: "" };

const volume = config.volume || 50;
const theme = config.theme ?? "dark";

console.log(volume);
console.log(theme);
```
 
## SNIPPET 5 (0,5)

```typescript
const a = 0 && "hello";
const b = 1 && "hello";
const c = "" || "default";
const d = "value" || "default";

const e = 1 && "";

console.log(a, b, c, d);
```

## SNIPPET 6 (0,5)

```typescript
const count = 0;
const message = count ? `Hay ${count} items` : "No hay items";
console.log(message);

const stock = null;
const display = stock ?? "Sin stock";
console.log(display);
```

## SNIPPET 7 (1)

```typescript
let x = 0;

true && x++;
false && x++;
true || x++;
false || x++;

console.log(x);
```
