"use client";
import React, { createContext, useContext } from "react";

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient debe usarse dentro de un ClientProvider");
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  // ClientContext simplificado - ahora MenuContext maneja categorías y productos
  // Este contexto se mantiene por compatibilidad si se necesita en el futuro
  return (
    <ClientContext.Provider
      value={{
        socialLinks: [], // Se puede usar desde JSON o API si es necesario
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
