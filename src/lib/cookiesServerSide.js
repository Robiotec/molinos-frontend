import {cookies} from 'next/headers'

export function getCookie(name) {
  return cookies().get(name);
}

export async function setCookie(name, value, options = {}) {
  cookies().set(name, value, options);
}

export async function deleteCookie(name) {
  return cookies().delete(name);
}