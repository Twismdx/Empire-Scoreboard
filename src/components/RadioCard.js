import React, { useState, useEffect } from 'react'
import '../home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalContext } from './Context'

const RadioCard = ({ home, away, id, cid }) => {
	const { matchId, setMatchId, compId, setCompId } = useGlobalContext()

	const handleClick = () => {
		setMatchId(id)
		setCompId(cid)
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
