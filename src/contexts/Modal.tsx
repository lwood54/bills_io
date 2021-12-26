import * as React from "react";

// const AuthContext = React.createContext<AuthData>({} as AuthData);
const ModalContext = React.createContext({
  isOpen: false,
  toggleOpen: () => {},
});

export function AuthProvider({ children }: { children: any }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const value = {
    isOpen,
    toggleOpen: () => setIsOpen(!isOpen),
  };

  return (
    <ModalContext.Provider value={value}>
      {isOpen && children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return React.useContext(ModalContext);
}
