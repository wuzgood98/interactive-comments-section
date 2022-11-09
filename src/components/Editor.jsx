import React, { useState } from 'react'
import useSetState from '../utils/useSetState'
import { useGlobalContext } from '../utils/appContext'
import tempImg from '../assets/images/image-juliusomo.png'

const Editor = () => {
  const [text, setText] = useSetState('')
  const { data, setData } = useGlobalContext()
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment()
  }

  const addComment = () => {
    if (!text) {
      setError(true)
      return;
    }
    const tempComment = {
      id: new Date().getTime(),
      content: text,
      createdAt: Date.now(),
      score: 0,
      user: { ...data.currentUser },
      replies: [],
    }
    data.comments.push(tempComment)
    setData({ ...data })
    setError(false)
    setText("")
  }

  const handleChange = (e) => setText(e.target.value)

  return (
    <div className='w-full h-max p-4 bg-white rounded-md transition-all sm:p-6'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative sm:flex-row transition-all'>
        <textarea value={text} onChange={handleChange} placeholder='Add a comment...' className={`${error ? 'border-red-700 animate-shake' : "border-lightGray"} resize-none w-full min-h-[5.5rem] border rounded-md focus:border-moderateBlue outline-none px-4 py-2 caret-moderateBlue placeholder-grayishBlue sm:ml-14 sm:min-h-[6rem] transition-all`} />
        <button type='submit' className={`w-max h-max px-6 py-2 bg-moderateBlue uppercase text-white rounded-md cursor-pointer hover:bg-moderateBlueHover active:scale-95 transition-all self-end sm:self-start`}>send</button>
        <img src={data?.currentUser?.image?.png || tempImg} alt="user avatar" className='h-8 w-8 rounded-full absolute bottom-[0.17rem] left-2 sm:top-[0.17rem] sm:bottom-0 sm:left-0 transition-all sm:h-10 sm:w-10' />
      </form>
    </div>
  )
}

export default Editor