import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem('logout', Date.now().toString());
    router.push('/login');
  }, [router]);

  return (<></>);
};

export default Logout;
