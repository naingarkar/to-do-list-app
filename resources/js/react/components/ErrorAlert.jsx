import React from 'react'

const ErrorAlert = ({ open, children, onClose }) => {
  return (
    <>
      {
        open && (
          <div className='flex justify-center relative'>
            <div className='fixed inset-0 z-10 bg-black/80'>
            </div>
            <div className='z-50 absolute bg-red-500 text-white p-5 top-20 rounded-lg w-11/12 max-w-md'>
              <button onClick={onClose} className='absolute top-5 right-5 text-sm'>
              X
              </button>
              {children}
            </div>
          </div>
        )
      }
    </>
  )
}

export default ErrorAlert