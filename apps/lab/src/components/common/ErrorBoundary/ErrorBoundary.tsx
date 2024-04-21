import React from 'react'

export const ErrorBoundary = (props: any) => {
  const { children } = props
  const [hasError, setError] = React.useState(false)

  const handleTryAgain = (error: any) => {
    setError(false)
  }

  if (hasError) {
    return (
      <div>
        <h2>Oops, there is an error!</h2>
        <button type="button" onClick={handleTryAgain}>
          Try again?
        </button>
      </div>
    )
  }

  return props.children
}
