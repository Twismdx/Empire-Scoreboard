import React, { useState, useEffect } from 'react'
import '../home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalContext } from './Context'
import axios from 'axios'

const RadioCard = ({ home, away, startTime, liveStatus, mid, league }) => {
	const { setMatchId, compId, matchId, setView, setStats, setLiveStatus } =
		useGlobalContext()

	let intervalId

	async function getStats() {
		axios
			.post(`https://twism.vercel.app/ids`, null, {
				params: {
					matchId: matchId,
					compId: compId,
				},
			})
			.then(function (response) {
				var res = Object.keys(response.data).map(function (key) {
					return response.data[key]
				})
				setStats(res)
			})
			.catch((err) => console.warn(err))
	}

	async function handleClick() {
		await setMatchId(mid)
		await getStats()
		intervalId = setInterval(getStats, 15000)
		if (league === 'SuperLeague') {
			setView('SuperLeague')
		} else if (league === 'VegasLeague') {
			setView('VegasLeague')
		}
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
