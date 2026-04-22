const config = { volume: 0, theme: "" };

const volume = config.volume || 50;
const theme = config.theme ?? "dark";

console.log(volume);
console.log(theme);
