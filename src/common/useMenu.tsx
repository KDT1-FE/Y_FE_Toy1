import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState = {
  isMenuOpen: false,
  setMenuOpen: () => {},
};

export const MenuContext = createContext<MenuContextType>(initialState);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setMenuOpen }}>{children}</MenuContext.Provider>
  );
};
