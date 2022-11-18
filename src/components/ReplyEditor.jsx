import { useRef, useEffect } from "react"

const ReplyEditor = ({ text, error, handleChange, handleSubmit, currentUserImage, replyingTo }) => {
  const refContainer = useRef()

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.focus()
    }
  }, [])

  return (
    <div className='w-full h-max p-4 bg-white rounded-md transition-all sm:p-6'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative sm:flex-row transition-all'>
        <textarea ref={refContainer} value={text} onChange={handleChange} pattern="[A-Za-z]*" placeholder={`Replying to ${replyingTo}`} className={`${error ? 'border-red-700' : 'border-lightGray'} resize-none w-full min-h-[5.5rem] border rounded-md focus:border-moderateBlue outline-none px-4 py-2 caret-moderateBlue placeholder-grayishBlue sm:ml-14 sm:min-h-[6rem] transition-all`} />
        <button className={`w-max h-max px-6 py-2 bg-moderateBlue uppercase text-white rounded-md cursor-pointer hover:bg-moderateBlueHover active:scale-95 transition-all self-end sm:self-start`}>reply</button>
        <img src={currentUserImage} alt="user avatar" className='h-8 w-8 rounded-full absolute bottom-[0.17rem] left-2 sm:top-[0.17rem] sm:bottom-0 sm:left-0 transition-all sm:h-10 sm:w-10' />
      </form>
    </div>
  )
}

export default ReplyEditor