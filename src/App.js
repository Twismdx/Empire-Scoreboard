import { useEffect, useState, useRef, useMemo } from 'react'
import './home.css'
import MatchCard from './components/MatchCard'
import { Multi } from './components/Multi'
import { Superleague } from './components/Superleague'
import { Vegasleague } from './components/Vegasleague'
import { SuperLeagueKO } from './components/SuperLeagueKO'
import { VegasLeagueKO } from './components/VegasLeagueKO'
import { useGlobalContext } from './components/Context'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { RadioCard } from './components/RadioCard'
import data from './data.json'

function App() {
	const {
		stats,
		setStats,
		matchId,
		setMatchId,
		compId,
		setCompId,
		comps,
		setComps,
		view,
		setView,
		liveStatus,
		setLiveStatus,
	} = useGlobalContext()

	const [league, setLeague] = useState(null)
	let intervalId

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
			const cid = Object.keys(response).map((key) => key)[0]
			setComps(response.data)
			setCompId(cid)
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
			const cid = Object.keys(response).map((key) => key)[0]

			setCompId(cid)
			setComps(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	async function handleVNEA() {
		await fetchVNEA()
		intervalId = setInterval(fetchVNEA, 30000)
		setLeague('VegasLeague')
		setView('cards')
	}

	async function handleEBASA() {
		await fetchEBASA()
		intervalId = setInterval(fetchEBASA, 30000)
		setLeague('SuperLeague')
		setView('cards')
	}

	const resetView = () => {
		setStats(null)
		setMatchId(null)
		if (league === 'SuperLeague') {
			handleEBASA()
		} else if (league === 'VegasLeague') {
			handleVNEA()
		}
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
	const matchKeys = useMemo(() => {
		const keys = []
		Object.entries(comps).forEach((item, index) => {
			const matchkeydata = Object.entries(item[1].matches)
			const itemKeys = matchkeydata.map(([key, value]) => key)
			keys.push(...itemKeys)
		})
		return keys
	}, [comps])

	useEffect(() => console.log(matchKeys), [matchKeys])

	// const fetchMatchData = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			`https://www.poolstat.net.au/livestream/multimatch?key=Y6tS35_9cysvUkpxXEYD0f2L8qiHZidj&api=1&ids=${matchId}`
	// 		)
	// 		var res = Object.keys(response.data).map(function (key) {
	// 			return response.data[key]
	// 		})

	// 		// Update the ref instead of the state
	// 		statsRef.current = res
	// 	} catch (error) {
	// 		console.error('Error:', error)
	// 	}
	// }

	useEffect(() => console.log(view), [view])

	if (view === 'cards') {
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
								mid={matchKeys[index]}
								home={match[1].home.teamname}
								away={match[1].away.teamname}
								startTime={match[1].matchtime}
								liveStatus={match[1].livestatus}
								league={league}
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
	} else if (view === 'VegasLeague' && stats[0] && stats[0].grade === 'H/C') {
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
					<Vegasleague />
				</div>
			</>
		)
	} else if (view === 'VegasLeague' && stats[0] && stats[0].grade !== 'H/C') {
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
					<VegasLeagueKO />
				</div>
			</>
		)
	} else if (
		view === 'SuperLeague' &&
		stats[0] &&
		stats[0].grade === 'Premier'
	) {
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
					<Superleague />
				</div>
			</>
		)
	} else if (
		view === 'SuperLeague' &&
		stats[0] &&
		stats[0].grade !== 'Premier'
	) {
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
					<SuperLeagueKO />
				</div>
			</>
		)
	}
}

export default App
