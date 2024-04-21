import React from 'react'

function SectionHeading({ title, subTitle }) {
  return (
    <div>
      <h2 className="text-center text-[2.635em] font-black">{title}</h2>
      <p className="mt-4 text-center text-xl text-gray-500">{subTitle}</p>
    </div>
  )
}

export default SectionHeading
