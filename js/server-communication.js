const SERVER_URL = `http://demo5782565.mockable.io/`;

export const loadData = (path = SERVER_URL) => {
  return fetch(path).then(
    (res) => res.json(),
    (err) => window.console.log(err));
};