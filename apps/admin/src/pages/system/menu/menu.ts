import { useCallback, useEffect, useState } from 'react';

export default function useAuthModel() {
  const [menu, setMenu] = useState({
    userid: 'test',
  });

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null);
  }, []);

  const fetchUser = useCallback(() => {
    setMenu({
      userid: 'test2',
    });
  }, []);

  useEffect(() => {
    const menus = menuService.query();
    setMenu(menus);
    return () => {};
  });

  return {
    user,
    signin,
    signout,
    fetchUser,
  };
}
