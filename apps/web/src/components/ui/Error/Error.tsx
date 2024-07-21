import React from 'react'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="ErrorMessage">{message}</div>
)
