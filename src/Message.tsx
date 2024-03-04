import add_react_icon from './add-reaction.svg'
import { useEffect, useState } from "react";
import './message.css'
import like from './like.png'
import dislike from './dislike.png'
import love from './love.svg'
import haha from './haha.svg'
import wow from './wow.svg'
import sad from './sad.svg'
import angry from './angry.svg'

export default function Message({message, isOwner, onSetReaction, onShowReaction, children}) {
  const mapping = {
    'like': like,
    'dislike': dislike,
    'love': love,
    'haha': haha,
    'wow': wow,
    'sad': sad,
    'angry': angry
  }

  const [viewReaction, setViewReaction] = useState(false)

  let filterReaction = []
  message.reactions.forEach(reaction => {
    if (!filterReaction.includes(reaction.emo)) {
      filterReaction.push(reaction.emo)
    }
  })
	return (
        <article
          key={message._id}
          className={isOwner ? "message-mine" : ""}
        >
          <div>{message.author}</div>
          {message.type.localeCompare('text') == 0 ? <p>{message.body}</p> : <audio controls src={message.body} />}
          <img className="add_react_icon" src={add_react_icon} onClick={onSetReaction} />
          {message.reactions.length > 0 ? (
            <div className="msg_reaction" onClick={onShowReaction}>
              {filterReaction.map(reaction => (
                <img src={mapping[reaction]} className="reaction_icon" />
              ))}
            </div>
          ) : <></>}
          {children}
        </article>
	)
}