const SERVER_URL = `https://demo5782565.mockable.io/`;
const LOGIN_PATH = "login";

export const loadData = () => {
  return fetch(SERVER_URL).then(
    (res) => res.json(),
    (err) => window.console.log(err)
  );
};

export const authorize = (data) => {
  const init = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(SERVER_URL + LOGIN_PATH, init).then(
    (res) => res.json(),
    (err) => window.console.log(err)
  );
};
