

export const checkTokenExpirationMiddleware = store => next => action => 
{
  const token =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user"))["token"];
  if (jwtDecode(token).exp < Date.now() / 1000) {
    next(action);
    localStorage.clear();
  }
  next(action);
};