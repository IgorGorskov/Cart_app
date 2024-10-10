import { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';

const MainContext = createContext<MainContextType | undefined>(undefined);

interface MainContextType {
  isAuthed: boolean | undefined;
  login: (user: User) => void;
  logout: () => void;
  user: User | undefined
}

interface MainProviderProps {
    children: ReactNode; 
  }

interface User {
  userid: string,
  email: string,
  name: string
}

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
    const [isAuthed, setIsAuthed] = useState(false)
    const [user, setUser] = useState<undefined | User>(undefined)

    useEffect(()=>{
      const storageUser = sessionStorage.getItem("user")
      if(storageUser){
        const parseUser = JSON.parse(storageUser)
        setUser(parseUser)
        setIsAuthed(true)
      }
    },[])

    const login = (user: User) => {
      setIsAuthed(true)
      sessionStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }
    
    const logout = () => {
      sessionStorage.removeItem('user')
      setUser(undefined)
      setIsAuthed(false)
    }

    return (
        <MainContext.Provider value={{ isAuthed, login, logout, user }}>
          {children}
        </MainContext.Provider>
      ); 
}

export const useAuth = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useAuth must be used within a MainProvider');
  }
  return context;
};
