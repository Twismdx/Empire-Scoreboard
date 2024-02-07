import React from 'react'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
} from '@nextui-org/react'

import '../home.css'

const MatchCard = ({
	home,
	away,
	startTime,
	matchId,
	stats,
	orgCode,
	compId,
	onClick,
}) => {
	return (
		<div className='main-container'>
			<Card className='card'>
				<CardHeader className='card-header'>
					<div className='card-div'>
						<p className='card-text'>{home}</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<p className='card-body'>Vs.</p>
				</CardBody>
				<Divider />
				<CardFooter className='card-footer'>
					<div className='card-div'>
						<p className='card-text'>{away}</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export default MatchCard
