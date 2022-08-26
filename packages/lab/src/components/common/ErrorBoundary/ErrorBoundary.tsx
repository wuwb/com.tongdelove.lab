import React from 'react';

export const ErrorBoundary = (props: any) => {
    const { children } = props;
    const [hasError, setError] = React.useState(false);

    const handleError = (error: any) => {
        setError(true);
    };

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return (
        <>
            {children}
        </>
    );
}
