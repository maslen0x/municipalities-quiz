import React from 'react'

const Popup = ({ className, onSubmit, onClose, btnText = '', children }) => {
  return (
    <div className={`${className} popup`}>
      <form onSubmit={onSubmit} className="popup__body">
        <button type="button" onClick={onClose} aria-label="Закрыть окно" className="popup__close" />
        {children}
        {btnText && <button className="popup__btn btn">{btnText}</button>}
      </form>
    </div>
  )
}

export default Popup
