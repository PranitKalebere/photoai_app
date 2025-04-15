export function isAuthenticated() {
  // In a real app, you'd check for a valid token or session
  // Here we're just checking if user data exists in localStorage
  const user = localStorage.getItem('user');
  return !!user;
}

export function saveUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem('user');
}

export function getUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}