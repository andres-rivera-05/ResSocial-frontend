import React,{ createContext, useState } from 'react'

const UserContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [ usuario, setUsuario]= useState(null)

  return (
      <UserContext.Provider value={{ usuario, setUsuario }}>
          {children}
      </UserContext.Provider>
  )
}

export default UserContext;