import React from 'react'

const Unauthorised = () => {
  return (
    <div className=" bg-white flex flex-col items-center justify-center">
      <h1 className=" text-base font-semibold">Unauthorized</h1>
      <p className=" text-base">
        You do not have permission to access this page.
      </p>
      <a href="/" className=" text-base text-blue-600 hover:underline">
        Go back home
      </a>
    </div>
  )
}

export default Unauthorised