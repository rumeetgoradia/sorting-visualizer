import React, { Component } from "react"
import "./styles/sortingvisualizer.css"
import {
	bubbleSort,
	insertionSort,
	selectionSort,
	heapSort,
	mergeSort
} from "../algorithms/sortingalgorithms"

import { randomInt, complete } from "../algorithms/helpers"

// Change this value for the speed of the animations.
const MAXIMUM_ANIMATION_SPEED_MS = 1000
const ANIMATION_SPEED_MS = 1

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 16

// This is the main color of the array bars.
const COMPARE_COLOR = "yellow"

// This is the color of array bars that are being compared throughout the animations.
const SWAP_COLOR = "black"

const GRADIENT_1 = "0000ff"
const GRADIENT_2 = "ff3300"

// const GRADIENT_1 = "ff0000"
// const GRADIENT_2 = "0000ff"

const DEFAULT = -1
const COMPARE = 0
const SWAPPING = 1
const SWAPPED = 2
const PUT1 = 3
const PUT2 = 4
const COMPLETE = 5

export default class SortingVisualizer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			arr: [],
			arr_cols: [],
			arr_vals: [],
			actions: []
		}
	}

	componentDidMount() {
		this.generateArray()
	}

	generateArray() {
		this.setState({ arr: [], arr_cols: [], arr_vals: [], actions: [] })
		const container = document.getElementById("bars-container")
		container.classList.remove("complete")
		const arr = [],
			arr_nums = [],
			arr_cols_temp = []
		let min = 650,
			max = 0
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
			let x = randomInt(5, 650)
			if (x < min) {
				min = x
			}
			if (x > max) {
				max = x
			}
			arr_nums.push(x)
		}
		const sortedArr = arr_nums.slice().sort((a, b) => a - b)
		const col1RGB = this.processColorValue(GRADIENT_1)
		const col2RGB = this.processColorValue(GRADIENT_2)
		const colsDiffRGB = [
			col2RGB[0] - col1RGB[0],
			col2RGB[1] - col1RGB[1],
			col2RGB[2] - col1RGB[2]
		]
		// console.log(colsDiffRGB)
		let stepsPercent = 100 / NUMBER_OF_ARRAY_BARS
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
			const r =
				colsDiffRGB[0] > 0
					? this.pad(
							Math.round(
								(colsDiffRGB[0] / 100) * (stepsPercent * (i + 1))
							).toString(16),
							2
					  )
					: this.pad(
							Math.round(
								col1RGB[0] + (colsDiffRGB[0] / 100) * (stepsPercent * (i + 1))
							).toString(16),
							2
					  )
			const g =
				colsDiffRGB[1] > 0
					? this.pad(
							Math.round(
								(colsDiffRGB[1] / 100) * ((i + 1) * stepsPercent)
							).toString(16),
							2
					  )
					: this.pad(
							Math.round(
								col1RGB[1] + (colsDiffRGB[1] / 100) * (stepsPercent * (i + 1))
							).toString(16),
							2
					  )
			const b =
				colsDiffRGB[2] > 0
					? this.pad(
							Math.round(
								(colsDiffRGB[2] / 100) * ((i + 1) * stepsPercent)
							).toString(16),
							2
					  )
					: this.pad(
							Math.round(
								col1RGB[2] + (colsDiffRGB[2] / 100) * (stepsPercent * (i + 1))
							).toString(16),
							2
					  )

			// console.log("r: " + r + ", g: " + g + ", b: " + b)
			arr_cols_temp.push(`#${r}${g}${b}`)
		}
		let n = NUMBER_OF_ARRAY_BARS
		console.log(arr_cols_temp)
		const arr_cols_ordered = []
		const arr_vals = []
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
		this.setState({ arr, arr_cols: arr_cols_ordered, arr_vals })
	}

	processColorValue(val) {
		const r = val.substr(0, 2)
		const g = val.substr(2, 2)
		const b = val.substr(4, 2)
		// console.log("processColorValue: r: " + r + ", g:" + g + ", b: " + b)
		return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
	}

	pad(n, width, z) {
		z = z || "0"
		n = n + ""
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
	}

	animate() {
		if (this.state.actions.length === 0) {
			return
		}
		const btns = document.getElementsByClassName("btn")
		console.log(btns)
		for (let i = 0; i < btns.length; ++i) {
			btns[i].disabled = true
		}
		const bars = document.getElementsByClassName("bar")
		for (let i = 0; i < this.state.actions.length; ++i) {
			const action = this.state.actions[i][0]
			const first = this.state.actions[i][1]
			let bar1Style = bars[first].style
			const second = this.state.actions[i][2]
			let bar2Style
			if (action !== PUT2 && action !== PUT1) {
				bar2Style = bars[second].style
			}
			if (action === COMPARE) {
				setTimeout(() => {
					bar1Style.backgroundColor = COMPARE_COLOR
					bar2Style.backgroundColor = COMPARE_COLOR
				}, i * ANIMATION_SPEED_MS)
			} else if (action === SWAPPING) {
				setTimeout(() => {
					bar1Style.backgroundColor = SWAP_COLOR
					bar2Style.backgroundColor = SWAP_COLOR
				}, i * ANIMATION_SPEED_MS)
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
				}, i * ANIMATION_SPEED_MS)
			} else if (action === PUT1) {
				setTimeout(() => {
					bar1Style.backgroundColor = SWAP_COLOR
				}, i * ANIMATION_SPEED_MS)
			} else if (action === PUT2) {
				setTimeout(() => {
					bar1Style.height = `${second}px`
				}, i * ANIMATION_SPEED_MS)
			} else if (action === DEFAULT) {
				setTimeout(() => {
					let arr_cols = this.state.arr_cols.slice()
					const gradientColVal = parseInt(GRADIENT_1, 16)
					const firstColVal = parseInt(arr_cols[first].substr(1, 6), 16)
					const secondColVal = parseInt(arr_cols[second].substr(1, 6), 16)
					if (
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
				}, i * ANIMATION_SPEED_MS)
				// } else {

				// }
			} else if (action === COMPLETE) {
				setTimeout(() => {
					const container = document.getElementById("bars-container")
					container.classList.add("complete")
					for (let i = 0; i < btns.length; ++i) {
						btns[i].disabled = false
					}
				}, i * ANIMATION_SPEED_MS + 750)
			}
		}

		// console.log(this.state.arr_cols)
		this.setState({
			actions: []
		})
		// generate.removeAttribute("disabled")
	}

	bubbleSortHelper() {
		bubbleSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(MAXIMUM_ANIMATION_SPEED_MS / ANIMATION_SPEED_MS / 10, 1)
		)
		this.animate()
	}

	selectionSortHelper() {
		selectionSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(MAXIMUM_ANIMATION_SPEED_MS / ANIMATION_SPEED_MS / 10, 1)
		)
		this.animate()
	}

	insertionSortHelper() {
		insertionSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(MAXIMUM_ANIMATION_SPEED_MS / ANIMATION_SPEED_MS / 10, 1)
		)
		this.animate()
	}

	heapSortHelper() {
		heapSort(
			this.state.arr_vals,
			0,
			NUMBER_OF_ARRAY_BARS - 1,
			this.state.actions,
			Math.max(MAXIMUM_ANIMATION_SPEED_MS / ANIMATION_SPEED_MS / 10, 1)
		)
		this.animate()
	}

	mergeSortHelper() {
		console.log(this.state.arr_vals)
		mergeSort(
			this.state.arr_vals,
			this.state.actions,
			Math.max(MAXIMUM_ANIMATION_SPEED_MS / ANIMATION_SPEED_MS / 10, 1)
		)
		console.log(this.state.arr_vals)

		complete(this.state.actions)
		this.animate()
	}

	render() {
		const { arr } = this.state

		return (
			<>
				<div className="bars-container" id="bars-container">
					{arr.map((item, index) => (
						<div
							className="bar"
							key={index}
							style={{
								height: `${item.val}px`,
								backgroundColor: `${item.color}`
							}}
						></div>
					))}
				</div>
				<button className="btn" onClick={() => this.generateArray()}>
					Generate New Array
				</button>
				<button className="btn" onClick={() => this.bubbleSortHelper()}>
					Bubble Sort
				</button>
				<button className="btn" onClick={() => this.selectionSortHelper()}>
					Selection Sort
				</button>
				<button className="btn" onClick={() => this.insertionSortHelper()}>
					Insertion Sort
				</button>
				<button className="btn" onClick={() => this.heapSortHelper()}>
					Heap Sort
				</button>
				<button className="btn" onClick={() => this.mergeSortHelper()}>
					Merge Sort
				</button>
			</>
		)
	}
}
