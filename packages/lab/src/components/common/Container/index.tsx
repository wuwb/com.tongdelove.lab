import cx from 'clsx';
import { FC } from 'react';

type Props = {

}

export const Container: FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={cx('container mx-auto', props.className)}>{props.children}</div>
    );
}
