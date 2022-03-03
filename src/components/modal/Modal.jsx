import React, { useState, useEffect, useRef, useCallback } from 'react'

import './modal.scss'

export default function Modal({ children, active, id, onClose, bg }) {
  const [isActive, setIsActive] = useState(false)
  const modalRef = useRef()

  const onKeyPress = useCallback(
    (e) => {
      const parentDiv = document.querySelector('.active')
      if (e.key === 'Escape' && parentDiv) {
        modalRef.current.parentNode.classList.remove('active')
        if (onClose) onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    setIsActive(active)
    document.addEventListener('keydown', onKeyPress)
    return () => document.removeEventListener('keydown', onKeyPress)
  }, [active, onKeyPress])

  const closeModal = () => {
    modalRef.current.parentNode.classList.remove('active')
    if (onClose) onClose()
  }

  const outSideClick = (e) => {
    if (e.target !== modalRef.current) {
      modalRef.current.parentNode.classList.remove('active')
      if (onClose) onClose()
    }
  }

  return (
    <div
      id={id}
      className={`modal ${isActive ? 'active' : ''}`}
      onClick={outSideClick}>
      <div
        ref={modalRef}
        className='modal__wrap'
        style={{
          backgroundImage: `url(${bg})`,
        }}>
        <div className='modal__wrap__content'>{children}</div>
        <button className='modal__wrap__closeBtn' onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  )
}
