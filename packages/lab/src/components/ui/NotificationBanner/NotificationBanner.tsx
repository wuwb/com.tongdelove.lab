// import Markdown from 'react-markdown';
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';

export const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
  return (
    <div
      className={cx('px-2 py-2 text-white', {
        'bg-blue-600': type === 'info',
        'bg-orange-600': type === 'warning',
        'bg-red-600': type === 'alert',
      })}
    >
      <div className="container flex flex-row items-center justify-between ">
        <div className="rich-text-banner flex-1">
          {/* <Markdown>{text}</Markdown> */}
        </div>
        <button onClick={closeSelf} className="flex-shrink-0 px-1 py-1">
          <CloseIcon className="h-6 w-auto" />
        </button>
      </div>
    </div>
  );
};
