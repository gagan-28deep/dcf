import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUser, getUserToken, removeUserData } from '../../utils/cookie';


const userAuthContext = React.createContext();

export function UserAuthContextProvider({ children }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [handleLoading, setHandleLogin] = React.useState(false)
  const [signinOpen, setSigninOpen] = useState(false)
  const [TabChange, setTabChange] = useState(2)


  const getUserData = React.useCallback(async () => {
    console.log('useCallback')
    await getUser().then(res => {
      setUser(res);
      if (user) {
        setHandleLogin(false)
      }
    }).catch((error) => {
      console.log('error', error)
      if (user) {
        setHandleLogin(false)
      }
      // logout();
    });
  }, [user, location]);

  React.useEffect(() => {
    getUserData();
  }, [location]);


  const getUserTokenData = async () => {
    await getUserToken().then(res => {
      setToken(res);
      if (token) {
        setHandleLogin(false)
      }
    }).catch((error) => {
      if (token) {
        setHandleLogin(false)
      }
      console.log('error', error)
      // logout();
    });
  };


  React.useEffect(() => {
    getUserTokenData();
  }, [location]);

  React.useEffect(() => {
    if (handleLoading) {
      getUserData();
    }
  }, [handleLoading]);


  React.useEffect(() => {
    if (handleLoading) {
      getUserTokenData();
    }
  }, [handleLoading]);

  const logout = async () => {
    await removeUserData();
    await getUserData();
    await getUserTokenData();
  };

  return (
    <userAuthContext.Provider
      value={{
        user,
        token,
        logout,
        setHandleLogin,
        setSigninOpen,
        signinOpen,
        setTabChange,
        TabChange
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return React.useContext(userAuthContext);
}
