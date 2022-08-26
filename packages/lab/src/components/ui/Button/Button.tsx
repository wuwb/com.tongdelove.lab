import * as React from 'react';
import cx from "classnames";
import { Loader } from "../Loader";
import { Spinner } from '../Spinner';
import styles from './styles.module.css';

export const SpinnerButton = React.forwardRef(
    ({ }, ref) => {
        return (
            <button ref={() => ref} >
                <Spinner />
            </button>
        );
    }
);

export const DangerButton = (props) => {
    const { type, onClick, children } = props;
    return (
        <button className={styles['btn-danger']} type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export const AppearanceButton = ({
    button,
    appearance,
    compact = false,
    handleClick,
    loading = false,
    type,
}) => {
    return (
        <button link={button} onClick={handleClick} type={type}>
            <div
                className={cx(
                    // Common classes
                    "flex w-full justify-center lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
                    // Full-size button
                    {
                        "px-8 py-4": compact === false,
                    },
                    // Compact button
                    {
                        "px-6 py-2": compact === true,
                    },
                    // Specific to when the button is fully dark
                    {
                        "bg-primary-600 text-white border-primary-600":
                            appearance === "dark",
                    },
                    // Specific to when the button is dark outlines
                    {
                        "text-primary-600 border-primary-600":
                            appearance === "dark-outline",
                    },
                    // Specific to when the button is fully white
                    {
                        "bg-white text-primary-600 border-white": appearance === "white",
                    },
                    // Specific to when the button is white outlines
                    {
                        "text-white border-white": appearance === "white-outline",
                    }
                )}
            >
                {loading && <Loader />}
                {button.text}
            </div>
        </button>
    )
}

type IButtonProps = {
    xl?: boolean;
    children: string;
};

export function Button2(props: IButtonProps) {
    const btnClass = cx({
        btn: true,
        'btn-xl': props.xl,
        'btn-base': !props.xl,
        'btn-primary': true,
    });

    return (
        <div className={btnClass}>
            {props.children}
        </div>
    );
}

export const Button = (props) => {
    return (
        <div className="btn btn-primary">
            {props.children}
        </div>
    );
}
