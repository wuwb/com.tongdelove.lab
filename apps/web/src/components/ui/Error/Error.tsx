import React from 'react'
import './Error.module.css'

interface ErrorProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorProps): React.ReactElement => (
  <div className="ErrorMessage">{message}</div>
)

export default Error
