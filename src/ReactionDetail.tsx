import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import './reaction_detail.css'
import like from './like.png'
import dislike from './dislike.png'
import love from './love.svg'
import haha from './haha.svg'
import wow from './wow.svg'
import sad from './sad.svg'
import angry from './angry.svg'

const ReactionDetail = ({reactions, onCloseThis, id}) => {
	let getUser = useAction(api.users.getDataById) 
	const [all, setAll] = useState([])

	const getData = async (reactions) => {
		const promises = reactions.map(async (reaction) => {
			const userdata = await getUser({_id: reaction.user_id})
			return userdata
		})
		const users = await Promise.all(promises)
		for (let i = 0; i < reactions.length; i++) {
			reactions[i].username = users[i].name
		}
		setAll(reactions)
	}

	const likeArr = []
    const dislikeArr = []
    const loveArr = []
    const hahaArr = []
    const wowArr = []
    const sadArr = []
    const angryArr = []
    useEffect(() => {
    	getData(reactions)
    }, [])
	const mapping = {
	    'like': like,
	    'dislike': dislike,
	    'love': love,
	    'haha': haha,
	    'wow': wow,
	    'sad': sad,
	    'angry': angry
	}
	return (
		<div id={id} className="reaction_detail">
			<p onClick={onCloseThis} style={{cursor: "pointer", marginLeft: "auto"}}>Close</p>
			{all?.map(reaction => (
				<div className="reaction_detail_item">
					<span>{reaction.username}</span>
					<img className="emo_icon" src={mapping[reaction.emo]} />
				</div>
			))}
		</div>
	)
}

export default ReactionDetail