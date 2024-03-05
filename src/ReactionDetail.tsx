import { useQuery, useMutation } from "convex/react";
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
	const all = []
	const likeArr = []
    const dislikeArr = []
    const loveArr = []
    const hahaArr = []
    const wowArr = []
    const sadArr = []
    const angryArr = []
    console.log(reactions)
    reactions?.forEach(reaction => {
    	all.push(reaction)
	 	if (reaction.emo == 'like') likeArr.push(reaction)
	 	if (reaction.emo == 'dislike') dislikeArr.push(reaction)
	 	if (reaction.emo == 'love') loveArr.push(reaction)
	 	if (reaction.emo == 'haha') hahaArr.push(reaction)
	 	if (reaction.emo == 'wow') wowArr.push(reaction)
	 	if (reaction.emo == 'sad') sadArr.push(reaction)
	 	if (reaction.emo == 'angry') angryArr.push(reaction)
    })
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
					<span>{reaction.user_id}</span>
					<img className="emo_icon" src={mapping[reaction.emo]} />
				</div>
			))}
		</div>
	)
}

export default ReactionDetail