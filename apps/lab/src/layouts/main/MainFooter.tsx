import type { FC } from 'react';
import FooterWaves from '@/public/images/layout/footer-waves.svg';

export const MainFooter: FC = () => {
  return (
    <div className="grid">
      <div className={'bgImage'}>
        <FooterWaves className="absolute w-full block object-cover" />
      </div>
    </div>
  );
};
