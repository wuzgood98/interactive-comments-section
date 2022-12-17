import React, { useContext, useState } from "react";
import commentsData from '../../data.json'

import useLocalStorage from "./useLocalStorage";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useLocalStorage("comments", commentsData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null)
  const [editCommentId, setEditCommentId] = useState(null)
  const [replyId, setReplyId] = useState(null)
  const [error, setError] = useState(false);

  const increment = (id) => {
    data.comments?.map((comment) => {
      if (comment.id === id) {
        return comment.score++
      } else {
        if (comment.replies?.length > 0) {
          return comment.replies?.map((reply) => reply.id === id && reply.score++)
        }
      }
    })
    setData({ ...data })
  }

  const decrement = (id) => {
    data.comments?.map((comment) => {
      if (comment.id === id) {
        return comment.score--
      } else {
        if (comment.replies?.length > 0) {
          return comment.replies?.map((reply) => reply.id === id && reply.score--)
        }
      }
    })
    setData({ ...data })
  }

  const editComment = (editId, newContent) => {
    data.comments?.map((comment) => {
      if (comment.id === editId) {
        comment.content = newContent
      } else {
        if (comment.replies?.length > 0) {
          comment.replies?.map((reply) => {
            if (reply.id === editId) {
              reply.content = newContent
            }
          })
        }
      }
    })
    setData({ ...data })
  }

  const deleteComment = (id) => {
    data.comments?.map((comment) => {
      if (comment.id === id) {
        data.comments = data.comments?.filter((comment) => comment.id !== id)
      } else {
        if (comment.replies?.length > 0) {
          comment.replies?.map((reply) => {
            if (reply.id === id) {
              comment.replies = comment.replies?.filter((reply) => reply.id !== id)
            }
          })
        }
      }
    })

    setData({ ...data })
  }

  const reply = (id, text, username, setIsReplying) => {
    if (!text) {
      setError(true)
      return;
    }
    const temp = {
      id: new Date().getTime().toString(),
      content: text,
      createdAt: Date.now(),
      score: 0,
      replyingTo: username,
      user: { ...data.currentUser },
    }
    data.comments?.map((comment) => {
      if (comment.id === id) {
        comment.replies = [...comment.replies, temp]
      } else if (comment.replies.length > 0) {
        comment.replies?.map((reply) => {
          if (reply.id === id) {
            comment.replies = [...comment.replies, temp]
          }
        })
      }
    })
    setData({ ...data })
    setError(false)
    setIsReplying(false)
  }

  const timeStamp = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    let interval = seconds / 31536000
    if (interval > 1) {
      return Math.floor(interval) + ` ${interval < 2 ? "year" : "years"}`
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ` ${interval < 2 ? "month" : "months"}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ` ${interval < 2 ? "day" : "days"}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ` ${interval < 2 ? "hour" : "hours"}`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ` ${interval < 2 ? "min" : "mins"}`;
    }
    return Math.floor(seconds) + " sec";
  }

  return (
    <AppContext.Provider
      value={
        {
          data,
          setData,
          isModalOpen,
          setIsModalOpen,
          deleteCommentId,
          setDeleteCommentId,
          increment,
          decrement,
          editCommentId,
          setEditCommentId,
          editComment,
          deleteComment,
          replyId,
          setReplyId,
          reply,
          error,
          timeStamp,
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
