export function login(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    data: {email, password},
  };
}
