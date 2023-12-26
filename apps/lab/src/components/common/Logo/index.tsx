import { Link } from '@/components/ui/Link';
import { Box } from '@mantine/core'
import cx from 'clsx';
import { useTranslation } from 'next-i18next';

export function Logo(props) {
  const { t } = useTranslation();

  return (
    <div className={cx(props.className, 'flex items-center flex-1 md:flex-initial')} href="/">
      <div className="bg-red-400 text-white rounded-full w-10 h-10 text-center leading-10">HAI</div>
      <div>
        海维包装实验室
      </div>
    </div>
  );
}
