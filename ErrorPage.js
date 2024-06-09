import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    let routingError = useRouteError()
    console.log(routingError)
  return (
    <div className='text-center fs-1 mt-5 bg-warning'>
        <h1 className='text-danger'>{routingError.status} - {routingError.data}</h1>
    </div>
  )
}

export default ErrorPage