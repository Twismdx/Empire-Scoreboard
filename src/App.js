import { useEffect, useState } from 'react'
import './home.css'
import MatchCard from './components/MatchCard'
import { Multi } from './components/Multi'
import { SvgTeam } from './components/SvgTeam'
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
		comps,
		setComps,
	} = useGlobalContext()

	const [isReady, setIsReady] = useState(false)
	const [cards, setCards] = useState(false)
	const [vnea, setVnea] = useState(false)
	const [ebasa, setEbasa] = useState(false)

	const fetchEBASA = async () => {
		try {
			const response = await axios.post(
				'https://www.poolstat.net.au/cslapi/v1/compstoday',
				{
					// orgid: 33,
				}
			)
			setComps(response.data)
			setCards(true)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const fetchVNEA = async () => {
		try {
			const response = await axios.post(
				'https://www.poolstat.net.au/cslapi/v1/compstoday',
				{
					orgid: 122,
				}
			)
			setComps(response.data)
			setCards(true)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		if (vnea === true) {
			let timeout

			const fetchData = async () => {
				await fetchVNEA()
				timeout = setTimeout(fetchData, 30000)
			}
			fetchData()

			return () => {
				if (timeout) {
					clearTimeout(timeout)
				}
			}
		} else if (ebasa === true) {
			let timeout

			const fetchData = async () => {
				await fetchEBASA()
				timeout = setTimeout(fetchData, 30000)
			}
			fetchData()

			return () => {
				if (timeout) {
					clearTimeout(timeout)
				}
			}
		}
	}, [vnea, ebasa])

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

	const fetchMatchData = async () => {
		try {
			const response = await axios.post(
				`https://www.poolstat.net.au/livestream/multimatch?key=Y6tS35_9cysvUkpxXEYD0f2L8qiHZidj&api=1&ids=${matchId}`
			)
			var res = Object.keys(response.data).map(function (key) {
				return response.data[key]
			})
			setStats(res)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		if (isReady) {
			let timeout

			const fetchData = async () => {
				await fetchMatchData()
				timeout = setTimeout(fetchData, 30000)
			}
			fetchData()

			return () => {
				if (timeout) {
					clearTimeout(timeout)
				}
			}
		}
	}, [isReady])

	useEffect(() => {
		if (matchId) {
			setIsReady(true)
		} else setIsReady(false)
	}, [matchId])

	if (cards === true) {
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
								id={matchKeys[index]}
								stats={comps}
								cid={mapStats[0][0]}
							/>
						))}
					</div>
				</div>
			</>
		)
	} else if (isReady === true && stats[0]) {
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
					<SvgTeam />
				</div>
			</>
		)
	} else if (cards === false) {
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
					<div style={{ margin: '10px' }}>
						<button onClick={() => setEbasa(true)}>EBASA</button>
					</div>
					<div style={{ margin: '10px' }}>
						<button onClick={() => setVnea(true)}>VNEA</button>
					</div>
				</div>
			</>
		)
	}
}

export default App
