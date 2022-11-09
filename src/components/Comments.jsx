import React, { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useGlobalContext } from '../utils/appContext'
import CommentCard from './CommentCard'

const Comments = () => {
  const { data } = useGlobalContext()

  const refContainer = useRef()

  useEffect(() => {
    if (refContainer.current) {
      autoAnimate(refContainer.current);
    }
  }, [refContainer]);

  return (
    <>
      {data.comments?.map((comment) => (
        <div key={comment.id} className='w-full gap-4 flex flex-col h-max sm:gap-5 transition-all'>
          <CommentCard
            {...comment}
          />
          {comment.replies?.length > 0 && (
            <div ref={refContainer} className="flex border-l-2 border-grayishBlueBorder pl-4 flex-col gap-4 sm:gap-5 sm:ml-11 sm:pl-11 transition-all">
              {
                comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    {...reply}
                  />
                ))
              }
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Comments