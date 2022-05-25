import Markdown from "react-markdown";
import cx from "classnames";
import CloseIcon from '@mui/icons-material/Close';

export const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
    return (
        <div
            className={cx(
                "text-white px-2 py-2",
                {
                    "bg-blue-600": type === "info",
                    "bg-orange-600": type === "warning",
                    "bg-red-600": type === "alert",
                }
            )}
        >
            <div className="container flex flex-row justify-between items-center ">
                <div className="rich-text-banner flex-1">
                    <Markdown>{text}</Markdown>
                </div>
                <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0">
                    <CloseIcon className="h-6 w-auto" color="#fff" />
                </button>
            </div>
        </div>
    );
}
