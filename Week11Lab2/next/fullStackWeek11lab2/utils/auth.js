export const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user && user !== 'null' && user !== '{}';
  }
  return false;
};

export const isAdmin = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }
  return false;
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  return {};
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export const checkAuth = () => {
  return isLoggedIn();
};
