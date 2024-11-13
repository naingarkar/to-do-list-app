import React from 'react'

const PrimaryButton = ({ text, onClick }) => {
  return (
    <button 
      className='bg-blue-600 px-5 py-1 hover:bg-blue-400 rounded-lg'
      onClick={onClick}
    >
      { text }
    </button>
  )
}

export default PrimaryButton