import React, { Component } from "react"

const SortingContext = React.createContext()

export default class context extends Component {
	constructor(props) {
		super(props)
		this.state = {
			arr: [],
			arr_cols: [],
			arr_vals: [],
			actions: [],
			arr_cols_sorted: [],
			algo: 0,
			num_bars: 100,
			speed: 50,
			gradient1: "0000ff",
			gradient2: "ff3300"
		}
	}

	handleChange = event => {
		const target = event.target
		const value = target.value
		const name = event.target.name
		this.setState(
			{
				[name]: value
			},
			this.change
		)
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
		for (let i = 0; i < this.state.num_bars; ++i) {
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
		const col1RGB = this.processColorValue(this.state.gradient1)
		const col2RGB = this.processColorValue(this.state.gradient2)
		const colsDiffRGB = [
			col2RGB[0] - col1RGB[0],
			col2RGB[1] - col1RGB[1],
			col2RGB[2] - col1RGB[2]
		]
		// console.log(colsDiffRGB)
		let stepsPercent = 100 / this.state.num_bars
		for (let i = 0; i < this.state.num_bars; ++i) {
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
		let n = this.state.num_bars
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

	render() {
		return (
			<SortingContext.Provider
				value={{
					...this.state,
					handleChange: this.handleChange,
					generateArray: this.generateArray
				}}
			>
				{this.props.childrens}
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
