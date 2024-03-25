import React, { useState, useEffect } from 'react'
import '../home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalContext } from './Context'
import axios from 'axios'

const RadioCard = ({
	home,
	away,
	id,
	cid,
	liveStatus,
	resetView,
	setView,
	league,
	fetchEBASA,
	fetchVNEA,
}) => {
	const {
		setMatchId,
		setCompId,
		cards,
		setCards,
		isReady,
		setIsReady,
		isLoading,
		setIsLoading,
		stats,
		setStats,
		comps,
		setLiveStatus,
	} = useGlobalContext()

	function Post(matchId, compId) {
		axios
			.post(`https://twism.vercel.app/ids`, null, {
				params: {
					matchId,
					compId,
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

	useEffect(() => {
		Post(id, cid)
		const interval = setInterval(() => {
			Post(id, cid)
		}, 15000)
		return () => {
			clearInterval(interval)
		}
	}, [id, cid])

	const handleClick = () => {
		setMatchId(id)
		setCompId(cid)
		Post(id, cid)
		if (league === 'SuperLeague') {
			setView('superleague')
			fetchEBASA()
		} else if (league === 'VegasLeague') {
			setView('vegasleague')
			fetchVNEA()
		}
		setLiveStatus(liveStatus)
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
