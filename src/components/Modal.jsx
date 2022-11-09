import React from 'react'

import { useGlobalContext } from '../utils/appContext'

const Modal = () => {
  const { isModalOpen, setIsModalOpen, deleteComment, deleteCommentId } = useGlobalContext()

  const handleClick = () => {
    setIsModalOpen(false)
    deleteComment(deleteCommentId)
  }

  return (
    <section className={`${isModalOpen ? 'z-10 opacity-100' : '-z-10 opacity-0'} fixed top-0 right-0 left-0 bottom-0 h-screen w-screen font-rubik transition-all`}>
      <div className="w-full h-full px-5 flex items-center justify-center bg-black/30">
        <div className={`${isModalOpen ? 'scale-100' : 'scale-90'} w-full h-max px-7 py-6 flex flex-col items-start gap-4 bg-white rounded-lg sm:max-w-[24rem] sm:py-7 transition-transform ease-easeOutIn`}>
          <h1 className="text-darkBlue font-bold text-xl sm:text-2xl">Delete comment</h1>
          <p className="text-grayishBlue font-normal text-left">
            Are you sure you want to delete this comment? This will remove the comment and can't be undone.
          </p>
          <div className="flex items-center w-full gap-3">
            <button onClick={() => setIsModalOpen(false)} className="text-center text-sm sm:text-base text-white bg-grayishBlue font-medium uppercase px-4 py-3 w-1/2 rounded-lg select-none transition-transform active:scale-95">no, cancel</button>
            <button onClick={handleClick} className="text-center text-sm sm:text-base text-white bg-softRed font-medium uppercase px-4 py-3 w-1/2 rounded-lg select-none transition-transform active:scale-95">yes, delete</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modal