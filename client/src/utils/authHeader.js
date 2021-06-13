export default function authHeader() {
  const user = localStorage.getItem('currentUser');

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}