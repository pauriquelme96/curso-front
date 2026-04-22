# Complejidad

¿Para qué programamos? El objetivo de programar es **resolver un problema**. Ya sea mostrar una lista de productos, calcular un precio con descuento o enviar un email de confirmación — siempre hay un problema detrás.

Entonces, ¿qué es lo que nos impide resolver ese problema de forma clara y mantenible? **La complejidad.**

---

## ¿Qué es la complejidad?

La complejidad es **la dificultad de entender o trabajar con un código**. No tiene que ver con lo avanzado que sea, sino con lo difícil que resulta leerlo, cambiarlo o explicarlo a otra persona.

Un código complejo te obliga a tener muchas cosas en la cabeza al mismo tiempo. Tienes que rastrear variables, entender flujos enrevesados y anticipar efectos secundarios. Y cuanto más tienes que pensar para entender un trozo de código, más complejo es.

Hay varios tipos de complejidad, y distinguirlos es clave para saber contra cuál merece la pena luchar.

### Complejidad esencial

Es la complejidad que **viene del propio problema**. No la puedes eliminar porque es inherente a lo que estás resolviendo.

Si tu aplicación tiene que manejar zonas horarias, permisos por roles y estados de pago... eso es complejo. Independientemente de lo limpio que escribas el código: el problema en sí ya es difícil.

```ts
// Calcular el precio final con impuestos, descuentos y cupones
// es esencialmente complejo. El negocio lo requiere.
function calcularPrecioFinal(
  precio: number,
  impuesto: number,
  descuento: number,
  cupon: number | null,
): number {
  const precioConDescuento = precio * (1 - descuento);
  const precioConCupon = cupon
    ? precioConDescuento - cupon
    : precioConDescuento;
  return precioConCupon * (1 + impuesto);
}
```

No podemos simplificar esto eliminando el cupón o el impuesto — el negocio lo necesita. Lo que sí podemos hacer es **no añadir complejidad extra** por encima.

### Complejidad accidental

Es la complejidad que **nosotros añadimos** con nuestra implementación. No viene del problema, viene de cómo lo resolvemos. Y esta **sí se puede reducir o eliminar**.

```ts
// ❌ Complejidad accidental: el código hace lo mismo pero de forma innecesariamente enrevesada
function calcularPrecioFinal(
  precio: number,
  impuesto: number,
  descuento: number,
  cupon: number | null,
): number {
  let resultado = precio;
  if (descuento > 0) {
    resultado = resultado - resultado * descuento;
  } else {
    resultado = resultado;
  }
  if (cupon !== null && cupon !== undefined) {
    if (cupon > 0) {
      resultado = resultado - cupon;
    }
  }
  let impuestoCalculado = resultado * impuesto;
  resultado = resultado + impuestoCalculado;
  return resultado;
}
```

El problema que resuelve es exactamente el mismo. Pero este código es más largo, más difícil de seguir y más fácil de romper. Toda esa complejidad extra es **accidental**: la hemos puesto nosotros.

### Complejidad heredada

Es la complejidad que **viene de código que no controlamos**: código legacy, librerías de terceros, decisiones antiguas del proyecto o APIs mal diseñadas.

```ts
// La API te devuelve los datos en un formato raro
// y no puedes cambiarla. Tienes que adaptarte.
type RespuestaAPI = {
  usr_nm: string;
  usr_rl: number; // 1 = admin, 2 = user, 3 = guest... documentación? qué es eso
  acc_st: string; // "A" = activo, "I" = inactivo, "S" = suspendido
};
```

No puedes cambiar esa API, pero sí puedes **aislar esa complejidad** en un punto concreto de tu código (un adapter, un mapper) para que no se propague al resto.

---

## Simplicidad

Cuando quitas todo lo que sobra y dejas solo lo esencial, el código se vuelve simple. Pero ojo: **simple no es sinónimo de básico o trivial**. Un código puede ser simple y a la vez resolver un problema complejo.

> Simple = pocas cosas entrelazadas
> (Rich Hickey)

Un `Array.reduce()` que calcula un total es simple. Una función de 5 líneas que gestiona permisos correctamente es simple. Lo simple no es fácil de escribir — es el resultado de **pensar bien** antes de teclear.

### La trampa

La trampa más común es confundir estos conceptos:

- **Simple ≠ Básico.** Código simple puede resolver problemas sofisticados.
- **Complejo ≠ Avanzado.** Código complejo no te hace mejor developer, te hace la vida más difícil.

Veamos las 4 combinaciones posibles:

#### Simple + Básico: problema fácil, código claro

```ts
function sumar(a: number, b: number): number {
  return a + b;
}
```

El problema es trivial y el código también. No hay mérito especial — cualquiera lo escribiría así.

#### Simple + Avanzado: problema difícil, código claro ✅

```ts
// Aplicar una lista de descuentos en orden de prioridad,
// asegurando que no se acumulen más allá de un máximo
function aplicarDescuentos(
  precio: number,
  descuentos: Descuento[],
  maxDescuento: number,
): number {
  const descuentoTotal = descuentos
    .sort((a, b) => b.prioridad - a.prioridad)
    .reduce(
      (acumulado, d) => Math.min(acumulado + d.porcentaje, maxDescuento),
      0,
    );

  return precio * (1 - descuentoTotal);
}
```

El problema es avanzado (prioridades, acumulación con límite), pero la solución se lee de arriba a abajo sin esfuerzo. **Este es el objetivo: resolver problemas difíciles con código simple.**

#### Complejo + Básico: problema fácil, código enrevesado ❌

```ts
// Solo suma dos números... pero mira cómo
function sumar(a: number, b: number): number {
  let resultado = 0;
  if (a !== null && a !== undefined) {
    if (b !== null && b !== undefined) {
      resultado = a + b;
    } else {
      resultado = a;
    }
  } else {
    if (b !== null && b !== undefined) {
      resultado = b;
    } else {
      resultado = 0;
    }
  }
  return resultado;
}
```

El problema es básico, pero alguien ha añadido complejidad accidental innecesaria. Es el caso más triste: código difícil de leer que ni siquiera resuelve algo interesante.

#### Complejo + Avanzado: problema difícil, código enrevesado ❌

```ts
// Los mismos descuentos con prioridad, pero con complejidad accidental
function aplicarDescuentos(p: number, ds: any[], mx: number): number {
  let r = p;
  let td = 0;
  ds.sort((a: any, b: any) => b.prioridad - a.prioridad);
  for (let i = 0; i < ds.length; i++) {
    if (td + ds[i].porcentaje <= mx) {
      td = td + ds[i].porcentaje;
    } else {
      if (mx - td > 0) {
        td = mx;
      }
    }
  }
  if (td > 0) {
    r = r - r * td;
  } else {
    r = r;
  }
  return r;
}
```

Aquí la complejidad del problema se multiplica por la complejidad del código. El resultado: nadie quiere tocarlo, nadie lo entiende a la primera, y cuando algo falla, buena suerte encontrando el bug.

---

La diferencia clave: **simple y complejo hablan de cómo está escrito el código**. Básico y avanzado hablan de **qué problema resuelve**. Lo ideal es resolver problemas avanzados con código simple.

|                                  | **Básico** (problema fácil) | **Avanzado** (problema difícil) |
| -------------------------------- | --------------------------- | ------------------------------- |
| **Simple** (código claro)        | Correcto, pero sin mérito   | ✅ El objetivo                  |
| **Complejo** (código enrevesado) | ❌ El caso más triste       | ❌ Nadie quiere tocarlo         |

Cuando alguien dice "este código es muy avanzado" para justificar que nadie lo entiende... probablemente es código complejo, no avanzado. El mejor código es el que cualquier persona del equipo puede leer y modificar con confianza.

---

## ¿Qué causa complejidad?

La complejidad accidental no aparece de golpe. Se acumula decisión a decisión, línea a línea. Estas son las causas más comunes:

- **Nombres confusos:** variables como `d`, `tmp`, `data2` que no dicen nada sobre lo que representan.
- **Funciones que hacen demasiado:** una función que valida, transforma, guarda y envía un email. ¿Cuál es su responsabilidad?
- **Anidamiento excesivo:** `if` dentro de `if` dentro de `if` que te obligan a mantener un mapa mental de las condiciones.
- **Código duplicado:** la misma lógica copiada en tres sitios. Cambias uno y te olvidas de los otros dos.
- **Acoplamiento fuerte:** un cambio en un archivo rompe cinco archivos más porque todo depende de todo.

```ts
// ❌ Varias causas de complejidad juntas
function proc(d: any) {
  let r = "";
  if (d) {
    if (d.t === 1) {
      if (d.a) {
        r = d.n + " OK";
      }
    }
  }
  return r;
}

// ✅ El mismo código, sin complejidad accidental
function formatearUsuarioActivo(usuario: Usuario): string {
  if (!usuario || usuario.tipo !== 1 || !usuario.activo) {
    return "";
  }

  return `${usuario.nombre} OK`;
}
```

---

## ¿Cómo detectar complejidad?

Antes de poder reducir la complejidad, hay que verla. Estas preguntas te ayudan a detectarla cuando lees o escribes código:

- **¿Puedo explicar esta función en una frase?** Si necesitas decir "hace X, pero también Y, y además Z", probablemente hace demasiado.
- **¿Puedo leerla sin hacer scroll?** Si tienes que desplazarte para ver la función entera, es una señal.
- **¿Entendería esto alguien que no lo ha escrito?** Si la respuesta es "depende" o "con contexto", el código no se explica solo.
- **¿Cuántas cosas tengo que recordar para seguir el flujo?** Si necesitas rastrear más de 2-3 variables a la vez, hay demasiadas cosas entrelazadas.
- **¿Me da miedo cambiar esto?** El miedo a tocar código es el síntoma más claro de complejidad oculta.

No se trata de reglas rígidas. Son preguntas para entrenar la intuición. Con el tiempo, detectar complejidad accidental se vuelve automático.

---

## ¿Qué precio pagamos?

La complejidad accidental no es gratis. Se paga con **deuda técnica**, que se manifiesta de muchas formas:

- **Bugs:** el código es tan difícil de entender que introduces errores al tocarlo.
- **Miedo a tocar código:** "esto funciona, no lo toques". Suena familiar? Eso es deuda técnica hablando.
- **Onboarding lento:** una persona nueva tarda semanas en entender el proyecto porque nadie puede explicar cómo funciona.
- **Velocidad decreciente:** al principio se va rápido, pero cada feature nueva tarda más porque hay que esquivar minas por todas partes.
- **Inestabilidad:** un cambio pequeño provoca fallos en cascada en sitios inesperados.

La deuda técnica es como la deuda financiera: un poco es manejable, pero si se acumula sin control, los intereses te comen.

---

## ¿Cómo evitamos la complejidad?

No podemos eliminar la complejidad esencial ni siempre la heredada, pero sí podemos **reducir la complejidad accidental** con un conjunto de prácticas y principios:

- **Naming:** elegir nombres que comunican intención. Quien lea `calcularPrecioFinal` no necesita mirar dentro para saber qué hace.
- **Funciones pequeñas:** cada función hace una sola cosa. Si no la puedes describir en una frase, probablemente hace demasiado.
- **Early returns / guard clauses:** sacar los casos excepcionales al principio para aplanar el anidamiento y dejar el camino principal limpio.
- **Modularización:** separar el código en piezas con responsabilidades claras, para que un cambio no te obligue a tocar cinco archivos.
- **Principios SOLID:** guías de diseño para que tu código sea flexible y mantenible a medida que crece.
- **Clean code:** un conjunto de prácticas para escribir código que se lee como prosa, no como un acertijo.
- **Patrones de diseño:** soluciones probadas a problemas que aparecen una y otra vez.

No hace falta aplicar todo desde el día uno. El primer paso es el más importante: **ser consciente de que la complejidad accidental existe** y que cada línea que escribes es una decisión entre añadirla o evitarla.

A lo largo de este curso vamos a ir viendo estas prácticas aplicadas a código real.
