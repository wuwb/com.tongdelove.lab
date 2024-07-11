import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { Navbar } from '@/components/common'
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import GlobalNav from '../GlobalNav';
import TopMenu from '@/components/common/TopMenu';
import { useAcceptCookies } from '@/hooks/useAcceptCookies';
import { Button } from 'antd';
import NotificationBanner from '../NotificationBanner';
import {useState} from "react";

const FeatureBar = dynamic(() => import('@/components/common/FeatureBar'), {
  loading: () => (
    <div className="w-80 h-80 flex items-center text-center justify-center p-3">
      <Spin />
    </div>
  ),
  ssr: true,
});

const Layout = (props) => {
  const { children, pageContext } = props;
const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const [bannerIsShown, setBannerIsShown] = useState(true);

  const navBarlinks = [
    {
      label: 'ALL',
      href: '/all',
    }
  ];
  const notificationBanner = {};
  return (
    <div>
      {/*{notificationBanner && bannerIsShown && (*/}
      {/*  <NotificationBanner*/}
      {/*    data={notificationBanner}*/}
      {/*    closeSelf={() => setBannerIsShown(false)}*/}
      {/*  />*/}
      {/*)}*/}
      {/* <GlobalNav /> */}
      <Header />
      {/* <Navbar links={navBarlinks} /> */}
      <main className="fit">{children}</main>
      {/* <Footer pages={props.pages} /> */}
      <Footer />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      />
    </div>
  );
}

export default Layout
