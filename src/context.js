import React, { Component } from "react"
import { randomInt, complete } from "./algorithms/helpers"
import {
	bubbleSort,
	insertionSort,
	selectionSort,
	heapSort,
	mergeSort,
	quickSort
} from "./algorithms/sortingalgorithms"

const SortingContext = React.createContext()

const DEFAULT = -1
const COMPARE = 0
const SWAPPING = 1
const SWAPPED = 2
const PUT1 = 3
const PUT2 = 4
const PUTCOLOR = 5
const COMPLETE = 6

class SortingProvider extends Component {
	constructor(props) {
		super(props)
		this.state = {
			arr: [],
			arr_cols: [],
			arr_vals: [],
			actions: [],
			arr_cols_sorted: [],
			num_bars: "100",
			speed: "150",
			gradient: "b92b271565C0",
			swap_color: "black",
			compare_color: "yellow",
			max_speed: 2000,
			max_bars: 250,
			min_speed: 5,
			min_bars: 4
		}
	}

	handleChange = event => {
		const target = event.target
		const value = target.value
		const name = event.target.name
		if (name !== "speed") {
			this.setState(
				{
					[name]: value
				},
				this.generateArray
			)
		} else {
			this.setState(
				{
					[name]: value
				},
				() => console.log("updated speed")
			)
		}
	}

	componentDidMount() {
		console.log("generating array")
		this.generateArray()
	}

	generateArray = () => {
		this.setState({
			arr: [],
			arr_cols: [],
			arr_vals: [],
			actions: [],
			arr_cols_sorted: []
		})
		const container = document.getElementById("bars-container")
		container.classList.remove("complete")
		const arr = [],
			arr_nums = []
		let arr_cols_temp = []
		let min = 650,
			max = 0
		for (let i = 0; i < parseInt(this.state.num_bars); ++i) {
			let x = randomInt(5, 450)
			if (x < min) {
				min = x
			}
			if (x > max) {
				max = x
			}
			arr_nums.push(x)
		}
		const sortedArr = arr_nums.slice().sort((a, b) => a - b)
		const gradientRGB = this.processColorValues(this.state.gradient)
		const col1RGB = gradientRGB[0]
		const col2RGB = gradientRGB[1]
		arr_cols_temp = this.interpolateColors(col1RGB, col2RGB)
		// const colsDiffRGB = [
		// 	col2RGB[0] - col1RGB[0],
		// 	col2RGB[1] - col1RGB[1],
		// 	col2RGB[2] - col1RGB[2]
		// ]
		// console.log(colsDiffRGB)
		// // console.log(colsDiffRGB)
		// let stepsPercent = 100 / parseInt(this.state.num_bars)
		// for (let i = 0; i < parseInt(this.state.num_bars); ++i) {
		// 	const r =
		// 		colsDiffRGB[0] > 0
		// 			? this.pad(
		// 					Math.round(
		// 						(colsDiffRGB[0] / 100) * (stepsPercent * (i + 1))
		// 					).toString(16),
		// 					2
		// 			  )
		// 			: this.pad(
		// 					Math.round(
		// 						col1RGB[0] + (colsDiffRGB[0] / 100) * (stepsPercent * (i + 1))
		// 					).toString(16),
		// 					2
		// 			  )
		// 	const g =
		// 		colsDiffRGB[1] > 0
		// 			? this.pad(
		// 					Math.round(
		// 						(colsDiffRGB[1] / 100) * ((i + 1) * stepsPercent)
		// 					).toString(16),
		// 					2
		// 			  )
		// 			: this.pad(
		// 					Math.round(
		// 						col1RGB[1] + (colsDiffRGB[1] / 100) * (stepsPercent * (i + 1))
		// 					).toString(16),
		// 					2
		// 			  )
		// 	const b =
		// 		colsDiffRGB[2] > 0
		// 			? this.pad(
		// 					Math.round(
		// 						(colsDiffRGB[2] / 100) * ((i + 1) * stepsPercent)
		// 					).toString(16),
		// 					2
		// 			  )
		// 			: this.pad(
		// 					Math.round(
		// 						col1RGB[2] + (colsDiffRGB[2] / 100) * (stepsPercent * (i + 1))
		// 					).toString(16),
		// 					2
		// 			  )

		// 	// console.log("r: " + r + ", g: " + g + ", b: " + b)
		// 	arr_cols_temp.push(`#${r}${g}${b}`)
		// }
		console.log(arr_cols_temp)
		let n = parseInt(this.state.num_bars)
		const arr_cols_ordered = []
		const arr_vals = []
		const arr_cols_sorted = arr_cols_temp.slice()
		while (n > 0) {
			let x = randomInt(0, n - 1)
			// console.log(x)
			arr.push({
				val: sortedArr[x],
				color: arr_cols_temp[x]
			})
			arr_cols_ordered.push(arr_cols_temp[x])
			arr_vals.push(sortedArr[x])
			// console.log("pushing")
			sortedArr.splice(x, 1)
			arr_cols_temp.splice(x, 1)
			--n
		}
		// for (let i = 0; i < n; ++i) {
		// 	arr.push({
		// 		val: sortedArr[i],
		// 		color: arr_cols[i]
		// 	})
		// }
		// console.log(arr)
		this.setState({
			arr,
			arr_cols: arr_cols_ordered,
			arr_vals,
			arr_cols_sorted
		})
	}

	processColorValues(val) {
		const r1 = val.substr(0, 2)
		const g1 = val.substr(2, 2)
		const b1 = val.substr(4, 2)
		const r2 = val.substr(6, 2)
		const g2 = val.substr(8, 2)
		const b2 = val.substr(10, 2)
		// console.log("processColorValue: r: " + r + ", g:" + g + ", b: " + b)
		return [
			`${parseInt(r1, 16)}, ${parseInt(g1, 16)}, ${parseInt(b1, 16)}`,
			`${parseInt(r2, 16)}, ${parseInt(g2, 16)}, ${parseInt(b2, 16)}`
		]
	}

	interpolateColors = (color1, color2) => {
		const stepFactor = 1 / (this.state.num_bars - 1)
		const interpolatedColorArray = []
		color1 = color1.match(/\d+/g).map(Number)
		color2 = color2.match(/\d+/g).map(Number)

		for (var i = 0; i < this.state.num_bars; i++) {
			interpolatedColorArray.push(
				`rgb(${this.interpolateColor(color1, color2, stepFactor * i)})`
			)
		}

		return interpolatedColorArray
	}

	interpolateColor = (color1, color2, factor) => {
		let result = color1.slice()
		for (var i = 0; i < 3; i++) {
			result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]))
		}
		return result
	}

	pad(n, width, z) {
		z = z || "0"
		n = n + ""
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
	}

	bubbleSortHelper = () => {
		console.log("bubble sorting")
		console.log(this.state)
		bubbleSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(this.state.max_speed / parseInt(this.state.speed) / 50, 1)
		)
		this.animate()
	}

	selectionSortHelper = () => {
		selectionSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(this.state.max_speed / parseInt(this.state.speed) / 50, 1)
		)
		this.animate()
	}

	insertionSortHelper = () => {
		insertionSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(this.state.max_speed / parseInt(this.state.speed) / 50, 1)
		)
		this.animate()
	}

	heapSortHelper = () => {
		heapSort(
			this.state.arr_vals,
			0,
			this.state.num_bars - 1,
			this.state.actions,
			Math.max(this.state.max_speed / parseInt(this.state.speed) / 50, 1)
		)
		this.animate()
	}

	mergeSortHelper = () => {
		// console.log(this.state.arr_vals)
		mergeSort(
			this.state.arr_vals,
			this.state.arr_cols,
			this.state.actions,
			Math.max(this.state.max_speed / parseInt(this.state.speed) / 50, 1)
		)
		// console.log(this.state.actions)

		// complete(this.state.actions)
		this.animate()
	}

	quickSortHelper = () => {
		quickSort(
			this.state.arr_vals,
			0,
			this.state.arr_vals.length - 1,
			this.state.actions,
			1
		)
		// let actions = this.state.actions.slice()
		// for (let i = 0; i < this.state.arr_vals.length - 1; ++i) {
		// 	actions.push([-1, i + 1, i])
		// }
		// this.setState({ actions })
		complete(this.state.actions)
		this.animate()
	}

	animate() {
		if (this.state.actions.length === 0) {
			return
		}
		const btns = document.getElementsByClassName("btn")

		for (let i = 0; i < btns.length; ++i) {
			btns[i].disabled = true
		}

		const bars = document.getElementsByClassName("bar")
		for (let i = 0; i < this.state.actions.length; ++i) {
			const action = this.state.actions[i][0]
			const first = this.state.actions[i][1]
			// console.log(action)
			let bar1Style = bars[first].style
			const second = this.state.actions[i][2]
			let bar2Style
			if (action !== PUTCOLOR && action !== PUT2 && action !== PUT1) {
				bar2Style = bars[second].style
			}
			// console.log(cancel)
			// if (cancel) {
			// 	setTimeout(() => {
			// 		console.log("canceling")
			// 		this.setState({ actions: [] })
			// 		for (let i = 0; i < btns.length; ++i) {
			// 			btns[i].disabled = false
			// 		}
			// 		cancel = false
			// 		return
			// 	}, i * ANIMATION_SPEED_MS)
			// } else
			if (action === COMPARE) {
				setTimeout(() => {
					bar1Style.backgroundColor = this.state.compare_color
					bar2Style.backgroundColor = this.state.compare_color
				}, i * parseInt(this.state.speed))
			} else if (action === SWAPPING) {
				setTimeout(() => {
					bar1Style.backgroundColor = this.state.swap_color
					bar2Style.backgroundColor = this.state.swap_color
				}, i * parseInt(this.state.speed))
			} else if (action === SWAPPED) {
				setTimeout(() => {
					const arr_cols = this.state.arr_cols.slice()
					const temp_color = arr_cols[first]
					arr_cols[first] = arr_cols[second]
					arr_cols[second] = temp_color
					this.setState({ arr_cols })
					const temp = bar1Style.height
					bar1Style.height = bar2Style.height
					bar2Style.height = temp
					bar1Style.backgroundColor = arr_cols[first]
					bar2Style.backgroundColor = arr_cols[second]
				}, i * parseInt(this.state.speed))
			} else if (action === PUT1) {
				setTimeout(() => {
					bar1Style.backgroundColor = this.state.swap_color
				}, i * parseInt(this.state.speed))
			} else if (action === PUT2) {
				setTimeout(() => {
					bar1Style.height = `${second}px`
				}, i * parseInt(this.state.speed))
			} else if (action === PUTCOLOR) {
				setTimeout(() => {
					let color = this.state.arr_cols_sorted[
						this.state.arr_vals.indexOf(second)
					]

					bar1Style.backgroundColor = `${color}`
				}, i * parseInt(this.state.speed))
			} else if (action === DEFAULT) {
				setTimeout(() => {
					let arr_cols = this.state.arr_cols.slice()
					// console.log(arr_cols)
					const gradientColVal = parseInt(this.state.gradient.substr(0, 6), 16)
					const firstColVal = parseInt(arr_cols[first].substr(1, 6), 16)
					const secondColVal = parseInt(arr_cols[second].substr(1, 6), 16)
					if (
						bar1Style.height === bar2Style.height &&
						Math.abs(firstColVal - gradientColVal) <
							Math.abs(secondColVal - gradientColVal)
					) {
						let temp_color = arr_cols[first]
						arr_cols[first] = arr_cols[second]
						arr_cols[second] = temp_color
					}
					this.setState({ arr_cols })
					bar1Style.backgroundColor = arr_cols[first]
					bar2Style.backgroundColor = arr_cols[second]
				}, i * parseInt(this.state.speed))
			} else if (action === COMPLETE) {
				setTimeout(() => {
					const container = document.getElementById("bars-container")
					container.classList.add("complete")
					for (let i = 0; i < btns.length; ++i) {
						btns[i].disabled = false
					}
				}, i * parseInt(this.state.speed) + 750)
			}
		}

		// console.log(this.state.arr_cols)
		this.setState({
			actions: []
		})
		// generate.removeAttribute("disabled")
	}

	render() {
		return (
			<SortingContext.Provider
				value={{
					...this.state,
					handleChange: this.handleChange,
					generateArray: this.generateArray,
					bubbleSort: this.bubbleSortHelper,
					insertionSort: this.insertionSortHelper,
					selectionSort: this.selectionSortHelper,
					heapSort: this.heapSortHelper,
					mergeSort: this.mergeSortHelper,
					quickSort: this.quickSortHelper
				}}
			>
				{this.props.children}
			</SortingContext.Provider>
		)
	}
}

const SortingConsumer = SortingContext.Consumer

export function withSortingConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<SortingConsumer>
				{value => <Component {...props} context={value} />}
			</SortingConsumer>
		)
	}
}

export { SortingProvider, SortingConsumer, SortingContext }
