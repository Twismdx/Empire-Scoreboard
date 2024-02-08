import React, { useState, useEffect } from 'react'
import '../home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalContext } from './Context'
import axios from 'axios'

const RadioCard = ({ home, away, id, cid }) => {
	const {
		matchId,
		setMatchId,
		compId,
		setCompId,
		cards,
		setCards,
		isReady,
		setIsReady,
		isLoading,
		setIsLoading,
		stats,
		setStats,
	} = useGlobalContext()

	function Post() {
		axios
			.post(
				`https://www.poolstat.net.au/livestream/multimatch?key=Y6tS35_9cysvUkpxXEYD0f2L8qiHZidj&api=1&ids=${matchId}`
			)
			.then(function (response) {
				var res = Object.keys(response.data).map(function (key) {
					return response.data[key]
				})
				setStats(res)
			})
			.catch((err) => console.warn(err))
	}

	const handleClick = () => {
		setMatchId(id)
		setCompId(cid)
		setCards(false)
		Post()
		setIsLoading(true)
	}

	return (
		<div
			className='card-container'
			style={{ backgroundColor: '#1C1C1C' }}
			onClick={handleClick}
		>
			{/* <div className='card'> */}
			<div className='contentContainer'>
				<p
					className='title'
					style={{ color: '#ffffff', textAlign: 'left' }}
					numberOfLines={1}
				>
					{home}
				</p>
				<div className='divider' />
				<p
					className='description'
					style={{ color: '#BB86FC' }}
					numberOfLines={3}
				>
					vs
				</p>
				<div className='divider' />
				<p
					className='title'
					style={{ color: '#ffffff', textAlign: 'right' }}
					numberOfLines={1}
				>
					{away}
				</p>
			</div>
		</div>
	)
}

export { RadioCard }
