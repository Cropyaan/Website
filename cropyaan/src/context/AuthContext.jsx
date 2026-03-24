import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

export const API_BASE = "http://localhost:8080/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cropyaan_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const register = useCallback(async ({ name, email, password }) => {
    const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    const { data } = res.data;
    _persist(data);
    return data;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const { data } = res.data;
    _persist(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cropyaan_user");
    localStorage.removeItem("cropyaan_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  function _persist(data) {
    localStorage.setItem("cropyaan_user", JSON.stringify(data));
    localStorage.setItem("cropyaan_token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data);
  }

  const storedToken = localStorage.getItem("cropyaan_token");
  if (storedToken && !axios.defaults.headers.common["Authorization"]) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}