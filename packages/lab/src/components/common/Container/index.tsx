import { WithChildren } from '@/helper/WithChildren';
import { FC } from 'react';

export const Container: FC<WithChildren> = (props) => {
    return (
        <div className="container mx-auto px-5">{props.children}</div>
    );
}
