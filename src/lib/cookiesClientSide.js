import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const getCookieCS = (name, options = {}) => {
  return getCookie(name, options);
};

export const setCookieCS = (name, value, options = {}) => {
  return setCookie(name, value, options);
};

export const deleteCookieCS = (name, options = {}) => {
  return deleteCookie(name, options);
};