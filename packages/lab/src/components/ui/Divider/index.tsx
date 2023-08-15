import { FC } from 'react';
import type { WithChildren } from '@/helper/WithChildren';

type Props = any

export const Divider: FC = (props: Props & WithChildren) => {
    return (
        <div className="h-px w-full my-4">
            {props.children}
        </div>
    );
}
