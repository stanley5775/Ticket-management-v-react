// auth helpers: simulate login/signup and session storage
const SESSION_KEY = "ticketapp_session";
const USER_KEY = "ticketapp_userstore"; // store registered users

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setSession(tokenObj) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(tokenObj));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!getSession();
}
// simple user store: save users in localStorage
export function registerUser({email, password}){
  const raw = localStorage.getItem(USER_KEY);
  const users = raw ? JSON.parse(raw) : [];
  if(users.find(u => u.email === email)){
    throw new Error('User already exists');
  }
  users.push({email, password});
  localStorage.setItem(USER_KEY, JSON.stringify(users));
  return true;
}

export function loginUser({ email, password }) {
  const raw = localStorage.getItem(USER_KEY);
  const users = raw ? JSON.parse(raw) : [];
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    throw new Error("Invalid credentials");
  }
  // create simple token
  const token = { token: btoa(email + ":" + Date.now()), email };
  setSession(token);
  return token;
}

// create example test user if none
export function ensureTestUser() {
  const raw = localStorage.getItem(USER_KEY);
  const users = raw ? JSON.parse(raw) : [];
  if (!users.find((u) => u.email === "test@ticketapp.local")) {
    users.push({ email: "test@ticketapp.local", password: "Password123!" });
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }
}
