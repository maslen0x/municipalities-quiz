import React from 'react'

const Label = ({ label, children, className }) => {
  return (
    <label className={className}>
      <p>{label}</p>
      {children}
    </label>
  )
}

export default Label