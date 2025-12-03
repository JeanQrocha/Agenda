import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const isTokenValid = (token) => {
   try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
   } catch {
      return false;
   }
};

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(null);
   const [userId, setUserId] = useState(null);

   const login = (token) => {
      const decoded = jwtDecode(token);
      setToken(token);
      setUserId(decoded.id); // <<< ID DO USUÁRIO AQUI

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decoded.id);
   };

   const logout = () => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
   };

   useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && isTokenValid(storedToken)) {
         const decoded = jwtDecode(storedToken);

         setToken(storedToken);
         setUserId(decoded.id); // <<< RECUPERA AO RECARREGAR
      } else {
         localStorage.removeItem("token");
         localStorage.removeItem("userId");
      }
   }, []);

   return (
      <AuthContext.Provider value={{ token, userId, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
