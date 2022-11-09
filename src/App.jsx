import React, { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

import Modal from './components/Modal'
import Editor from './components/Editor'
import Comments from './components/Comments'

function App() {
  const refContainer = useRef()

  useEffect(() => {
    if (refContainer.current) {
      autoAnimate(refContainer.current);
    }
  }, [refContainer]);

  return (
    <div className="bg-lightGray w-full min-h-screen py-5 px-4 font-rubik flex flex-col gap-4">
      <Modal />
      <main ref={refContainer} className="w-full sm:max-w-[45rem] sm:min-h-[40rem] sm:m-auto space-y-4 sm:space-y-5">
        <Comments />
        <Editor />
      </main>
    </div>
  )
}

export default App
