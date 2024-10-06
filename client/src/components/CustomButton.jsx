import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold shadow-secondary text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] -mr-10 ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton