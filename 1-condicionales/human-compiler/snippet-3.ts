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
