import React from 'react'
import '../home.css'
import {useGlobalContext} from './Context'
import {SvgRmu} from './SvgRmu'
import {SvgTeam} from './SvgTeam'

const Overlay = () => {
	const {stats} = useGlobalContext()

	const adj = new Array(stats[0])
	const calculateScore = (data, type) =>
		Object.values(data).reduce(
			(acc, curr) =>
				acc +
				parseInt(curr[`${type}scorepoints`]) +
				parseInt(curr[`${type}framepointsadj`]),
			0
		)
	const homeScore = calculateScore(adj, 'home')
	const awayScore = calculateScore(adj, 'away')

	const calculateFrames = (data, type) =>
		Object.values(data).reduce(
			(acc, curr) =>
				25 -
				(acc +
					parseInt(curr[`homescore`]) +
					parseInt(curr[`awayscore`])),
			0
		)
	const framesLeft = calculateFrames(adj)

	return <SvgTeam />
}
// {stats[0].awayframepointsadj===0 && stats[0].awayscorepoints===0 ? stats[0].awayscore : `${awayScore}`}
// {stats[0].homeframepointsadj===0 && stats[0].homescorepoints===0 ? stats[0].homescore : `${homeScore}`}
// {stats[0].homescorepoints>0 ? `${stats[0].homescore}` : ''}
// {stats[0].awayscorepoints>0 ? `${stats[0].awayscore}` : ''}
export {Overlay}
