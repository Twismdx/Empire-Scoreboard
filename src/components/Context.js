import React, { useContext, useState, useEffect } from 'react'
import { useChannel, configureAbly } from '@ably-labs/react-hooks'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [time, setTime] = useState(null)
	const [p1Name, setp1Name] = useState(null)
	const [p2Name, setp2Name] = useState(null)
	const [p1Score, setp1Score] = useState(null)
	const [p2Score, setp2Score] = useState(null)
	const [clockStatus, setClockStatus] = useState(null)
	const [frameCount, setFrameCount] = useState(null)
	const [url, setUrl] = useState(null)
	const [link, setLink] = useState()
	// const singleUrl = 'https://www.poolstat.net.au/livestream/multimatch?api=1&ids='
	// const multiUrl = 'https://www.poolstat.net.au/livestream/multimatch?api=1&drid='
	const [matchId, setMatchId] = useState(null)
	const [compId, setCompId] = useState(null)
	const [selected, setSelected] = useState('Single')
	const [isLoading, setIsLoading] = useState(false)
	const [postDone, setPostDone] = useState(false)
	const [message, setMessage] = useState()
	const [copy, setCopy] = useState('')
	const [stats, setStats] = useState([])
	const [comps, setComps] = useState([])

	configureAbly({
		key: '9zzpLg.YrD7jw:RCOMB9Lq4mkx0-5Zn99PFY4iKEA1WtvpBWG-5fRkv0M',
		clientId: 'Overlay',
	})

	const [channel] = useChannel('PlayerData', (message) => {
		console.log(message.data.clockStatus)
		setTime(message.data.time)
		setp1Score(message.data.p1Score)
		setp2Score(message.data.p2Score)
		setClockStatus(message.data.clockStatus)
		setFrameCount(message.data.frameCount)
	})

	useEffect(() => {
		channel.publish('PlayerNames', [
			{
				p1Name: p1Name,
				p2Name: p2Name,
			},
		])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [p1Name, p2Name])

	return (
		<AppContext.Provider
			value={{
				p1Name,
				setp1Name,
				p2Name,
				setp2Name,
				p1Score,
				setp1Score,
				p2Score,
				setp2Score,
				clockStatus,
				setClockStatus,
				frameCount,
				setFrameCount,
				time,
				setTime,
				message,
				setMessage,
				isLoading,
				setIsLoading,
				stats,
				setStats,
				matchId,
				setMatchId,
				copy,
				setCopy,
				postDone,
				setPostDone,
				url,
				setUrl,
				selected,
				setSelected,
				link,
				setLink,
				compId,
				setCompId,
				comps,
				setComps,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppProvider, useGlobalContext }
