import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Message from './Message.tsx'
import ListReaction from './ListReaction'
import ReactionDetail from './ReactionDetail'
import ReactRecorder from './ReactRecorder'

// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

export default function App() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);

  const [newMessageText, setNewMessageText] = useState("");
  const [showListReaction, setShowListReaction] = useState("");

  const [showVoice, setShowVoice] = useState(false)

  const [reactDetail, setReactDetail] = useState(undefined)

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <main className="chat">
      {showVoice && <ReactRecorder className="voice_box" callback={(url) => {
        sendMessage({type: 'voice', body: url, author: NAME, reactions: [] })
      }} />}
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      <div className="box-chat">
        {messages?.map((message) => (
          <Message 
            message={message}
            isOwner={message.author === NAME}
            onSetReaction={() => {
              if (message._id == showListReaction) {
                setShowListReaction("")
              } else setShowListReaction(message._id)
            }}
            onShowReaction={() => {
              console.log(message.reactions)
              setReactDetail(message.reactions)
            }}
          >
            {showListReaction == message._id ? (
              <ListReaction
                msg_id={message._id} 
                user_id={NAME} 
                callback={() => setShowListReaction("")} />) : <></>}
          </Message>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({type: 'text', body: newMessageText, author: NAME, reactions: [] });
          setNewMessageText("");
        }}>
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
        />
        <div 
          onClick={() => {
            console.log(showVoice)
            setShowVoice(!showVoice)
          }} 
          className='voice' 
          type="submit" 
          disabled={!newMessageText}
        >
          Send
        </div>
        <button className='submit' type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>

      {reactDetail ? <ReactionDetail 
                              reactions={reactDetail} 
                              id={"showReactionDetail"}
                              onCloseThis={() => setReactDetail(undefined)} /> : <></>}
    </main>
  );
}
