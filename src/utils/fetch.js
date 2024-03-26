import { configEnv } from "#configs/env.config.js";

import logger from "#utils/logger.js";

const URL = configEnv.URL;

export async function getCartByUserId(_id) {
  return fetch(`${URL}/api/v1/cart/user/${_id}`, {
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
      logger.error(err);
    });
}

export async function postNewCart(_id, productId) {
  return fetch(`${URL}/api/v1/cart`, {
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
      logger.error(err);
    });
}

export async function postProductToCart(_id, productId) {
  return fetch(`${URL}/api/v1/cart/${_id}/product/${productId}`, {
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
      logger.error(err);
    });
}

export async function getProductById(productId) {
  return fetch(`${URL}/api/v1/product/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.error(err);
    });
}
