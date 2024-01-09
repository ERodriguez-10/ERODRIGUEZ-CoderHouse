import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;

export async function getUserByEmail(userEmail) {
  return fetch(`http://localhost:8080/api/sessions/user/${userEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const { _id } = data.data;
      return _id;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getCartByUserId(_id) {
  return fetch(`http://localhost:8080/api/carts/user/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.cartSelected;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function postNewCart(_id, productId) {
  return fetch(`http://localhost:8080/api/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products: [productId], userId: _id }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function postProductToCart(_id, productId) {
  return fetch(`http://localhost:8080/api/carts/${_id}/product/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
