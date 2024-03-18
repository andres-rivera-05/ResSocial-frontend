import React,{ createContext, useState, useEffect } from 'react'

const UserContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [ usuario, setUsuario]= useState(null)

     useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            setUsuario(JSON.parse(storedUsuario));
        }
    }, []);

    // Función para actualizar el usuario y guardar en el localStorage
    const actualizarUsuario = (nuevoUsuario) => {
        setUsuario(nuevoUsuario);
        localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    };

  return (
      <UserContext.Provider value={{ usuario, actualizarUsuario }}>
          {children}
      </UserContext.Provider>
  )
}

export default UserContext;