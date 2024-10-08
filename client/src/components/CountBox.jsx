import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#ebc428] rounded-t-[10px] w-full text-center truncate shadow-secondary">{value}</h4>
      <p className="font-epilogue font-normal text-[16px] text-white bg-[#ffde59] px-3 py-2 w-full rounded-5xl text-center shadow-secondary">{title}</p>
    </div>
  )
}

export default CountBox