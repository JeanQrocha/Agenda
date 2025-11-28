import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => { // Função para verificar se o token é válido
   try {
      const decoded = jwtDecode(token); // Decodifica o token JWT
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      return decoded.exp > currentTime; // Verifica se o token expirou
   } catch (error) {
      return false; // Retorna falso se o token for inválido
   }
}


export const AuthContext = createContext(); // Criando o contexto de autenticação

export const AuthProvider = ({ children }) => { // Componente provedor de autenticação
   const [token, setToken] = useState(null); // Estado para armazenar o token de autenticação
   
   // const [role, setRole] = useState(null); // Estado para armazenar o papel do usuário

   const login = (token) => { // Função para fazer login
      setToken(token) // Define o token no estado  
      localStorage.setItem('token', token) // Armazena o token no localStorage
   }

   const logout = () => { // Função para fazer logout
      setToken(null) // Remove o token do estado
      localStorage.removeItem('token') // Remove o token do localStorage
   }
   useEffect(() => {
      const storedToken = localStorage.getItem('token'); // Pega o token do localStorage
      if (storedToken && isTokenValid(storedToken)) {  // Verifica se o token é válido
         setToken(storedToken); // Define o token no estado se for válido
      } else {
         localStorage.removeItem('token'); // Remove o token inválido do localStorage
      }
   }, []); // Executa apenas uma vez quando o componente é montado

   return (
      <AuthContext.Provider value={{ token, login, logout }}>
         {children}
      </AuthContext.Provider>  // -> Renderiza os componentes filhos // ->>Fornece o contexto de autenticação para os componentes filhos // ->>> Finaliza o provedor de contexto
   );
}