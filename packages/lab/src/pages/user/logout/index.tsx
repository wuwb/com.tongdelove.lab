import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem('logout', Date.now().toString());
    router.push('/login');
  }, [router]);

  return (<></>);
};

export default Logout;
