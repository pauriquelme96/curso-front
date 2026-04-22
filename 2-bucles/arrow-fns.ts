const user = {
  name: "Alice",
  email: "alice@email.com",
  key: true,
};

function getProp(key: string) {
  console.log(user[key]);
}

getProp("name");
getProp("email");
