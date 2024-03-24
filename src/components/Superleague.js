import React, { useEffect } from 'react'
import '../home.css'
import { useGlobalContext } from './Context'

const Superleague = ({ resetView }) => {
	const { stats, liveStatus } = useGlobalContext()

	const calcSuperleagueFrames = () => {
		const total = stats[0]?.homescore + stats[0]?.awayscore
		const frames = 36 - total

		return frames
	}

	useEffect(() => {
		if (liveStatus === '3') {
			resetView()
		}
	}, [liveStatus])

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			width='80vw'
			height='55vh'
			viewBox='0 -240 1260 400'
		>
			<defs>
				<filter
					id='luminosity-noclip'
					x={-1.5}
					y={-2}
					width={1254}
					height={66}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask'
					x={-1.5}
					y={-2}
					width={1254}
					height={66}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-2'
					x={-2.5}
					y={-2}
					width={545}
					height={65}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-2'
					x={-2.5}
					y={-2}
					width={545}
					height={65}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-2)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-3'
					x={707.5}
					y={-1}
					width={545}
					height={64}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-3'
					x={707.5}
					y={-1}
					width={545}
					height={64}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-3)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-9'
					x={380}
					y={-1}
					width={95}
					height={59.5}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-9'
					x={380}
					y={1}
					width={95}
					height={59.5}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-9)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-8'
					x={783}
					y={-1}
					width={95}
					height={59.5}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-8'
					x={783}
					y={1}
					width={95}
					height={59.5}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-8)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-4'
					x={-2.5}
					y={-2}
					width={1254}
					height={25}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-4'
					x={-2.5}
					y={-2}
					width={1254}
					height={25}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-4)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-5'
					x={28.5}
					y={59}
					width={484}
					height={34}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-5'
					x={28.5}
					y={59}
					width={484}
					height={34}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-5)',
						}}
					></g>
				</mask>
				<filter
					id='luminosity-noclip-6'
					x={738.5}
					y={59}
					width={484}
					height={34}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodColor='#fff'
						result='bg'
					/>
					<feBlend
						in='SourceGraphic'
						in2='bg'
					/>
				</filter>
				<mask
					id='mask-6'
					x={738.5}
					y={59}
					width={484}
					height={34}
					maskUnits='userSpaceOnUse'
				>
					<g
						style={{
							filter: 'url(#luminosity-noclip-6)',
						}}
					></g>
				</mask>
			</defs>
			<g
				id='Layer_2'
				stats-name='Layer 2'
			>
				<g id='Container'>
					<g id='blackBar'>
						<g
							style={{
								mask: 'url(#mask)',
							}}
						>
							<rect
								x={0.5}
								width={1250}
								height={62}
								rx={10}
							/>
						</g>
					</g>
					<g id='redBar'>
						<g
							style={{
								mask: 'url(#mask-2)',
							}}
						>
							<rect
								y={0.5}
								width={540}
								height={60}
								rx={10}
								style={{
									fill: '#940708',
								}}
							/>
						</g>
					</g>
					<g id='blueBar'>
						<g
							style={{
								mask: 'url(#mask-3)',
							}}
						>
							<rect
								x={710}
								y={1}
								width={540}
								height={59.5}
								rx={10}
								style={{
									fill: '#090064',
								}}
							/>
						</g>
					</g>
					<g id='blackScore1'>
						<g
							style={{
								mask: 'url(#mask-9)',
							}}
						>
							<rect
								x={380}
								y={1}
								width={92}
								height={59.5}
								rx={20}
								style={{
									fill: '#000',
								}}
							/>
						</g>
					</g>
					<g id='blackScore2'>
						<g
							style={{
								mask: 'url(#mask-8)',
							}}
						>
							<rect
								x={783}
								y={1}
								width={92}
								height={59.5}
								rx={20}
								style={{
									fill: '#000',
								}}
							/>
						</g>
					</g>
					<g id='gloss'>
						<g
							style={{
								mask: 'url(#mask-4)',
								opacity: '1',
							}}
						>
							<path
								d='M1249.5,20.5H0v-10A10,10,0,0,1,10,.5H1239.5a10,10,0,0,1,10,10Z'
								style={{
									fill: '#fff',
									opacity: '0.1',
								}}
							/>
						</g>
					</g>
					<g id='whiteLeft'>
						<g
							style={{
								mask: 'url(#mask-5)',
							}}
						>
							<rect
								x={30.5}
								y={61}
								width={480}
								height={30}
								rx={10}
								style={{
									fill: '#ccc',
								}}
							/>
						</g>
					</g>
					<g id='whiteRight'>
						<g
							style={{
								mask: 'url(#mask-6)',
							}}
						>
							<rect
								x={740.5}
								y={61}
								width={480}
								height={30}
								rx={10}
								style={{
									fill: '#ccc',
								}}
							/>
						</g>
					</g>
					<text
						textAnchor='end'
						fill='white'
						transform='translate(520 40)'
						style={{
							fontSize: 33,
							fontFamily: 'extraBold',
							textAlign: 'center',
						}}
					></text>
					<text
						textAnchor='start'
						transform='translate(727 40)'
						fill='white'
						style={{
							fontSize: 33,
							fontFamily: 'extraBold',
							textAlign: 'center',
						}}
					></text>
					<text
						textAnchor='middle'
						transform='translate(624 44)'
						fill='white'
						style={{
							fontSize: 33,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].compname ===
						'Super League 2024 (Premier Grade)'
							? calcSuperleagueFrames()
							: ''}
					</text>
					<text
						textAnchor='middle'
						transform='translate(624 12)'
						fill='white'
						style={{
							fontSize: 12,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].compname ===
						'Super League 2024 (Premier Grade)'
							? 'Frames Left'
							: ''}
					</text>
					<text
						textAnchor='left'
						transform='translate(45.61 82)'
						style={{
							fontSize: 18,
							fontFamily: 'xxBold',
							textAlign: 'center',
						}}
					>
						{stats[0].venuename}
					</text>
					<text
						textAnchor='right'
						transform='translate(1035 82)'
						style={{
							fontSize: 18,
							fontFamily: 'xxBold',
							textAlign: 'center',
						}}
					>
						{stats[0].timezone}
					</text>
					<text
						textAnchor='middle'
						transform='translate(423 40)'
						fill='white'
						style={{
							fontSize: 33,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].homescore}
					</text>
					<text
						textAnchor='middle'
						transform='translate(828 40)'
						fill='white'
						style={{
							fontSize: 33,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].awayscore}
					</text>
					<text
						textAnchor='middle'
						transform='translate(192.61 40)'
						fill='white'
						style={{
							fontSize: 26,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].hometeamlabel}
					</text>
					<text
						textAnchor='middle'
						transform='translate(1060.61 40)'
						fill='white'
						style={{
							fontSize: 26,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{stats[0].awayteamlabel}
					</text>
					<text
						textAnchor='middle'
						transform='translate(639.86 82)'
						fill='white'
						style={{
							fontSize: 33,
							fontFamily: 'semiBold',
							textAlign: 'center',
						}}
					>
						{}
					</text>
					<text
						textAnchor='middle'
						transform='translate(527.11 82)'
						style={{
							fontSize: 33,
							fontFamily: 'semiaBold',
							textAlign: 'center',
						}}
					>
						{}
					</text>
					<text
						textAnchor='middle'
						transform='translate(850.61 82)'
						style={{
							fontSize: 18,
							fontFamily: 'xxBold',
							textAlign: 'center',
						}}
					>
						{stats[0].compname}
					</text>
					<text
						textAnchor='right'
						transform='translate(335.61 82)'
						style={{
							fontSize: 18,
							fontFamily: 'xxBold',
							textAlign: 'center',
						}}
					>
						ls.poolstat.net.au
					</text>
				</g>
			</g>
		</svg>
	)
}
// {stats[0].awayframepointsadj===0 && stats[0].awayscorepoints===0 ? stats[0].awayscore : `${awayScore}`}
// {stats[0].homeframepointsadj===0 && stats[0].homescorepoints===0 ? stats[0].homescore : `${homeScore}`}
// {stats[0].homescorepoints>0 ? `${stats[0].homescore}` : ''}
// {stats[0].awayscorepoints>0 ? `${stats[0].awayscore}` : ''}
export { Superleague }
