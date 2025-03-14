import env from "react-dotenv";
import { data } from "react-router";

const login = (email: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${env.API_URl}/api/login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      return response;
    })
    .catch((error) => console.error(error));
};

const logout = () => {
  sessionStorage.removeItem("user");
};
const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

export const userService = {
  login,
  logout,
};
