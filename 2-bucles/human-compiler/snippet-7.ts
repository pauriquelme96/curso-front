const items = [1, 2, 3, 4, 5];

for (let i = 0; i < items.length; i++) {
  if (items[i] % 2 === 0) {
    items.splice(i, 1);
  }
}

console.log(items);
