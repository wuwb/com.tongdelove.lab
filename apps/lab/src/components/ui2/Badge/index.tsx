import cx from 'clsx';
import styles from './Badge.module.scss';

type Props = {
    color?: string | "primary";
    variant?: "solid" | "light" | "dot";
    size?: "sm" | "md";
    className?: string;
    badgeContent?: any;
    children: any;
}

const sizesClasses = {
    sm: "badge-sm",
    md: "badge-md",
};

const variantClasses = {
    solid: "badge-solid",
    outline: "badge-outline",
    light: "badge-light",
    dot: "badge-dot",
};

export const Badge = (props: Props) => {
    const {
        color,
        variant,
        size,
        className,
        ...rest
    } = props;
    return (
        <span
            className={cx(styles.badge, className, [
                sizesClasses[size],
                variantClasses[variant],
            ])}
            {...rest}
        >
            {props.children}
        </span>
    );
}
