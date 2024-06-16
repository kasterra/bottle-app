import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "./errors";

const API_URL = import.meta.env.VITE_API_URL;

export async function reAuth(access_token: string, refresh_token: string) {
  const response = await fetch(`${API_URL}/reissue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      RefreshToken: `Bearer ${refresh_token}`,
    },
  });

  const json = await response.json();

  switch (response.status) {
    case 201:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 409:
      throw new ConflictError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function register(
  name: string,
  password: string,
  passwordConfirm: string,
  email: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, passwordConfirm, email }),
  });

  const json = await response.json();

  switch (response.status) {
    case 201:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 409:
      throw new ConflictError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function login(name: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });

  const json = await response.json();

  switch (response.status) {
    case 201:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 404:
      throw new NotFoundError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function getAllBottles(
  token: string,
  page: number,
  size: number,
  sort: "asc" | "desc"
) {
  const response = await fetch(
    `${API_URL}/bottles?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await response.json();

  switch (response.status) {
    case 200:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 404:
      throw new NotFoundError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function getBottle(token: string, bottleId: string) {
  const response = await fetch(`${API_URL}/bottles/${bottleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  switch (response.status) {
    case 200:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 404:
      throw new NotFoundError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function createBottle(
  token: string,
  title: string,
  content: string
) {
  const response = await fetch(`${API_URL}/bottles/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  const json = await response.json();

  switch (response.status) {
    case 201:
      return json;
    case 400:
      throw new BadRequestError(json.message);
    case 401:
      throw new UnauthorizedError(json.message);
    case 500:
      throw new InternalServerError(json.message);
  }
}

export async function deleteBottle(token: string, bottleId: string) {
  const response = await fetch(`${API_URL}/bottles/delete/${bottleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  switch (response.status) {
    case 204:
      return;
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 500:
      throw new InternalServerError();
  }
}
