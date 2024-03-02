import add_react_icon from './add-reaction.svg'
import './message.css'
import like from './like.png'
import dislike from './dislike.png'
import love from './love.svg'
import haha from './haha.svg'
import wow from './wow.svg'
import sad from './sad.svg'
import angry from './angry.svg'

export default function Message({message, isOwner, onSetReaction, children}) {
  const mapping = {
    'like': like,
    'dislike': dislike,
    'love': love,
    'haha': haha,
    'wow': wow,
    'sad': sad,
    'angry': angry
  }
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
          <p>{message.body}</p>
          <img className="add_react_icon" src={add_react_icon} onClick={onSetReaction} />
          {message.reactions.length > 0 ? (
            <div className="msg_reaction">
              {filterReaction.map(reaction => (
                <img src={mapping[reaction]} className="reaction_icon" />
              ))}
            </div>
          ) : <></>}
          {children}
        </article>
	)
}