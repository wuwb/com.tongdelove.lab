import { WithChildren } from '@/helper/WithChildren';
import { FC } from 'react';
import cx from 'clsx';

type Props = {

}

export const Container: FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={cx('container mx-auto px-5', props.className)}>{props.children}</div>
    );
}
