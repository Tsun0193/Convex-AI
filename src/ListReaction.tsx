import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import './listReaction.css'
import like from './like.png'
import dislike from './dislike.png'
import love from './love.svg'
import haha from './haha.svg'
import wow from './wow.svg'
import sad from './sad.svg'
import angry from './angry.svg'

const ListReaction = ({ msg_id, user_id, callback }) => {
	const updateReaction = useMutation(api.messages.updateReaction)
	return (
		<div className="list_reaction">
			<img 
				src={like}
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "like"})
					callback()
				}} 
			/>
			<img 
				src={dislike}
				className="icon_reaction" 
				onClick={async () => {
					console.log('hello')
					await updateReaction({_id: msg_id, user_id: user_id, emo: "dislike"})
					callback()
				}} 
			/>
			<img 
				src={love}
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "love"})
					callback()
				}} 
			/>
			<img 
				src={haha}
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "haha"})
					callback()
				}} 
			/>
			<img 
				src={wow}
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "wow"})
					callback()
				}} 
			/>
			<img 
				src={sad}
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "sad"})
					callback()
				}} 
			/>
			<img 
				src={angry} 
				className="icon_reaction" 
				onClick={async () => {
					await updateReaction({_id: msg_id, user_id: user_id, emo: "angry"})
					callback()
				}} 
			/>
		</div>
	)
}

export default ListReaction