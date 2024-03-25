import { useEffect, useState, useRef } from 'react'
import './home.css'
import MatchCard from './components/MatchCard'
import { Multi } from './components/Multi'
import { Superleague } from './components/Superleague'
import { Vegasleague } from './components/Vegasleague'
import { useGlobalContext } from './components/Context'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { RadioCard } from './components/RadioCard'

function App() {
	const {
		stats,
		setStats,
		isLoading,
		setIsLoading,
		matchId,
		setMatchId,
		compId,
		setCompId,
		comps,
		setComps,
		view,
		setView,
		isReady,
		setIsReady,
	} = useGlobalContext()

	const [league, setLeague] = useState('VegasLeague')

	const fetchEBASA = async () => {
		try {
			const response = await axios.post(
				'https://twism.vercel.app/compstoday',
				null,
				{
					params: {
						orgid: 33,
					},
				}
			)
			const id = Object.keys(response).map((key) => key)[0]
			setComps(response.data)
			setCompId(id)
			setLeague('SuperLeague')
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const fetchVNEA = async () => {
		try {
			const response = await axios.post(
				'https://twism.vercel.app/compstoday',
				null,
				{
					params: {
						orgid: 122,
					},
				}
			)
			const id = Object.keys(response).map((key) => key)[0]
			setCompId(id)
			setComps(response.data)
			setLeague('VegasLeague')
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const handleVNEA = () => {
		fetchVNEA()
		setView('match')
	}

	const handleEBASA = () => {
		fetchEBASA()
		setView('match')
	}

	const resetView = () => {
		setView('default')
	}

	const mapStats = Object.entries(comps).map((item) => item)

	const matchesArray = mapStats.map(([_, compData]) => compData)

	const liveArray = Object.entries(matchesArray).reduce(
		(liveMatches, [itemKey, itemValue]) => {
			if (itemValue.matches && typeof itemValue.matches === 'object') {
				const matches = Object.entries(itemValue.matches).map(
					([, matchValue]) => matchValue
				)
				matches.forEach((match) => {
					if (
						match?.home?.livestatus === '2' ||
						(match?.home?.livestatus === '1' &&
							match?.away?.livestatus === '2') ||
						match?.away?.livestatus === '1'
					) {
						liveMatches.push({ ...match })
					}
				})
			}
			return liveMatches
		},
		[]
	)

	const live = Object.entries(liveArray)
	const matchKeys = []

	Object.entries(comps).forEach((item, index) => {
		const matchkeydata = Object.entries(item[1].matches)
		const keys = matchkeydata.map(([key, value]) => key)
		matchKeys.push(...keys)
	})

	// const fetchMatchData = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			`https://www.poolstat.net.au/livestream/multimatch?key=Y6tS35_9cysvUkpxXEYD0f2L8qiHZidj&api=1&ids=${matchId}`
	// 		)
	// 		var res = Object.keys(response.data).map(function (key) {
	// 			return response.data[key]
	// 		})

	// 		// Update the ref instead of the state
	// 		statsRef.current = res;
	// 	} catch (error) {
	// 		console.error('Error:', error)
	// 	}
	// }

	useEffect(() => console.log(view), [view])

	if (view === 'match') {
		return (
			<>
				<Helmet>
					<style>
						{
							'body { background-image: none; background-color: transparent !important; }'
						}
					</style>
				</Helmet>
				<div className='box'>
					<span className='box-text'>Select a Match</span>
					<div className='card-main-container'>
						{live.map((match, index) => (
							<RadioCard
								key={matchKeys[index]}
								home={match[1].home.teamname}
								away={match[1].away.teamname}
								startTime={match[1].matchtime}
								liveStatus={match[1].livestatus}
								id={matchKeys[index]}
								stats={comps}
								cid={mapStats[0][0]}
								setView={setView}
								league={league}
								fetchEBASA={fetchEBASA}
								fetchVNEA={fetchVNEA}
							/>
						))}
					</div>
				</div>
			</>
		)
	} else if (view === 'default') {
		return (
			<>
				<Helmet>
					<style>
						{
							'body { background-image: none; background-color: transparent !important; }'
						}
					</style>
				</Helmet>
				<div className='box'>
					<div
						onClick={handleEBASA}
						style={{ margin: '10px' }}
					>
						<button onClick={handleEBASA}>EBASA</button>
					</div>
					<div
						onClick={handleVNEA}
						style={{ margin: '10px' }}
					>
						<button onClick={handleVNEA}>VNEA</button>
					</div>
				</div>
			</>
		)
	} else if (view === 'vegasleague' && stats[0]) {
		return (
			<>
				<Helmet>
					<style>
						{
							'body { background-image: none; background-color: transparent !important; }'
						}
					</style>
				</Helmet>
				<div className='container-3'>
					<Vegasleague resetView={resetView} />
				</div>
			</>
		)
	} else if (view === 'superleague' && stats[0]) {
		return (
			<>
				<Helmet>
					<style>
						{
							'body { background-image: none; background-color: transparent !important; }'
						}
					</style>
				</Helmet>
				<div className='container-3'>
					<Superleague resetView={resetView} />
				</div>
			</>
		)
	}
}

export default App
