# Pimp my code: Condicionales

---

# Info

```ts
type Usuario = {
  nombre: string;∫
  rol: string;
  edad: number | null;
  saldo: number;
  activo: boolean;
};
```

# Code 1

```ts
function esAdmin(usuario: Usuario): boolean {
  if (usuario.rol == "admin") {
    return true;
  } else {
    return false;
  }
}
```

# Code 2

```ts
function obtenerEdad(usuario: Usuario): number {
  return usuario.edad || 18;
}
```

# Code 3

```ts
function saludar(usuario: Usuario): string {
  let saludo;

  if (usuario.activo === true) {
    if (usuario.rol === "admin") {
      if (usuario.nombre) {
        saludo = "Hola, " + usuario.nombre + ". Tienes acceso total.";
      }
    }
  }

  return saludo;
}
```

# Code 4

```ts
function puedeRetirar(usuario: Usuario, cantidad: number): string {
  if (usuario.saldo > 0) {
    if (usuario.activo) {
      if (cantidad <= usuario.saldo) {
        return "Retiro autorizado";
      } else {
        return "Saldo insuficiente";
      }
    } else {
      return "Cuenta inactiva";
    }
  } else {
    return "Sin saldo";
  }
}
```
