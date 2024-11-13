import React from 'react'

const Dialog = ({ open, children }) => {
  return (
    <>
      {
        open && (
          <div className='flex justify-center relative'>
            <div className='fixed inset-0 z-10 bg-black/80'>
            </div>
            <div className='z-10 absolute bg-slate-800 text-white p-5 top-20 rounded-lg w-11/12 max-w-md'>
              {children}
            </div>
          </div>
        )
      }
    </>
  )
}

export default Dialog