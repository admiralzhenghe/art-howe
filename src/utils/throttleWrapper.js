export default function throttleWrapper(callback, limit) {
  let expire = Date.now() + limit;
  return function (...args) {
    if (Date.now() > expire) {
      callback(...args);
      expire = Date.now() + limit;
    }
  };
}
