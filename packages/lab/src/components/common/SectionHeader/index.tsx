import React from 'react';
import cx from 'classnames';

type Props = {
    data: {
        title: string;
        paragraph: string;
    };
    children?: any;
    tag?: any;
    className?: string;
}

const SectionHeader = ({
    className,
    data,
    children,
    tag,
    ...props
}: Props) => {
    const classes = cx('section-header', className);
    const Component = tag;

    return (
        <>
            {(data.title || data.paragraph) &&
                <div
                    {...props}
                    className={classes}
                >
                    <div className="container-xs">
                        {children}
                        {data.title &&
                            <Component className={
                                cx(
                                    'mt-0',
                                    data.paragraph ? 'mb-16' : 'mb-0'
                                )}>{data.title}</Component>
                        }
                        {data.paragraph &&
                            <p className="m-0">{data.paragraph}</p>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default SectionHeader;
