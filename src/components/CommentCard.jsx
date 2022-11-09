import React, { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useGlobalContext } from '../utils/appContext'

import { Plus, Minus, ReplyButton, DeleteButton, EditButton } from './Buttons'
import ReplyEditor from './ReplyEditor'
import useSetState from '../utils/useSetState'


const CommentCard = ({ content, user, createdAt, score, id, replyingTo }) => {
  const { data, setIsModalOpen, setDeleteCommentId, editCommentId, setEditCommentId, increment, decrement, editComment, reply, error, timeStamp } = useGlobalContext()
  const [text, setText] = useSetState("")
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [username, setUsername] = useState("")

  const refContainer = useRef()

  useEffect(() => {
    if (refContainer.current) {
      autoAnimate(refContainer.current);
    }
  }, [refContainer]);

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    reply(id, text, username, setIsReplying)
    setText("")
  }

  const toggleReplying = () => {
    setIsReplying((prevState) => !prevState)
    const temp = data.comments?.find((comment) => comment.id === id) ?? data.comments?.map((comment) => comment.replies?.find((reply) => reply.id === id))
    const tempUsername = Array.isArray(temp) ? temp.filter((item) => item !== undefined)[0].user.username : temp.user.username
    setUsername(tempUsername)
  }

  const toggleEditing = (id) => {
    setIsEditing((prevState) => !prevState)
    const temp = data.comments?.find((comment) => comment.id === id) ?? data.comments?.map((comment) => comment.replies?.find((reply) => reply.id === id))
    const tempData = Array.isArray(temp) ? temp.filter((item) => item !== undefined)[0] : temp
    const textContent = replyingTo ? `@${replyingTo} ${tempData.content}` : tempData.content
    setText(textContent)
    setEditCommentId(tempData.id)
  }

  const edit = (e) => {
    e.preventDefault()
    const content = text.replace(`@${replyingTo}`, '').trim()
    editComment(editCommentId, content)
    setText('');
    setIsEditing(false)
  }

  const openModal = (id) => {
    setIsModalOpen(true)
    const temp = data.comments?.find((comment) => comment.id === id) ?? data.comments?.map((comment) => comment.replies?.find((reply) => reply.id === id))
    let tempId = Array.isArray(temp) ? temp.filter((item) => item !== undefined)[0].id : temp.id
    setDeleteCommentId(tempId)
  }

  return (
    <div ref={refContainer} className='flex flex-col gap-4'>
      <div ref={refContainer} className='w-full h-max p-4 bg-white rounded-md sm:flex sm:gap-5 sm:p-6 transition-all'>
        {/* score */}
        <div className="hidden items-center gap-2 bg-veryLightGray sm:gap-4 px-3 py-2 rounded-md w-max h-[6rem] sm:flex flex-col">
          <Plus increment={() => increment(id)} />
          <span className='text-moderateBlue font-semibold select-none w-4 text-center'>{score}</span>
          <Minus decrement={() => decrement(id)} />
        </div>
        {/* main content */}
        <div className="w-full">
          <div className="space-y-4">
            <div className="w-full flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center flex-wrap sm:flex-nowrap">
                <img src={user.image.png} alt="user-avatar" className='h-8 w-8' />
                <p className="text-darkBlue font-bold lowercase">{user.username}</p>
                {data.currentUser.username === user.username && (
                  <p className="text-white text-sm px-2 font-normal lowercase bg-moderateBlue rounded-sm -ml-2 text-center">you</p>
                )}
                <p className="text-grayishBlue">
                  {typeof createdAt === "number"
                    ? `${timeStamp(createdAt)} ago`
                    : createdAt}
                </p>
              </div>
              {
                data.currentUser.username !== user.username
                  ? (
                    <ReplyButton action={toggleReplying} hidden='hidden' breakpoint='sm:flex' />
                  )
                  : (
                    <div className='hidden items-center gap-4 sm:flex'>
                      <DeleteButton action={() => openModal(id)} />
                      <EditButton action={() => toggleEditing(id)} />
                    </div>
                  )
              }
            </div>


            {
              isEditing ?
                (
                  <form onSubmit={edit} className='flex gap-4 flex-col w-full'>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder='Add a comment...'
                      className="border-lightGray resize-none w-full min-h-[5.5rem] border rounded-md focus:border-moderateBlue outline-none px-4 py-2 caret-moderateBlue placeholder-grayishBlue  sm:min-h-[6rem] transition-all"
                    />
                    <button className="w-max h-max px-6 py-2 self-end bg-moderateBlue uppercase text-white rounded-md cursor-pointer hover:bg-moderateBlueHover active:scale-95 transition-all">update</button>
                  </form>
                ) :
                (
                  <p className="text-grayishBlue mb-4 sm:mb-0 text-left transition-all">
                    {replyingTo &&
                      (<span className='text-moderateBlue font-semibold'>
                        {`@${replyingTo}`}
                      </span>)} {content || "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."}
                  </p>
                )
            }

            <div className="flex justify-between items-center w-full flex-wrap gap-3 sm:gap-0 sm:hidden">
              <div className="flex items-center justify-around gap-3 bg-veryLightGray px-2 py-1 rounded-md w-max h-[2.5rem]">
                <Plus increment={() => increment(id)} />
                <span className='text-moderateBlue font-semibold select-none w-4 text-center'>{score}</span>
                <Minus decrement={() => decrement(id)} />
              </div>
              {
                data.currentUser.username !== user.username
                  ? (
                    <ReplyButton action={toggleReplying} />
                  )
                  : (
                    <div className='flex items-center gap-3'>
                      <DeleteButton action={() => openModal(id)} />
                      <EditButton action={() => toggleEditing(id)} />
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <ReplyEditor
          text={text}
          currentUserImage={data.currentUser?.image.png}
          error={error}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(e)}
        />
      )}

    </div>
  )
}

export default CommentCard
