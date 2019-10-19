import React, { Component } from "react"
import "./styles/sortingvisualizer.css"

export default class SortingVisualizer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			arr: []
		}
	}

	componentDidMount() {
		this.generateArray()
	}

	generateArray() {
		const arr = []
		for (let i = 0; i < 100; ++i) {
			arr.push({
				val: this.randomInt(5, 650),
				color: "green"
			})
		}
		this.setState({ arr })
	}

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	mergeSort = (startingIndex, arr) => {}

	// mergeSort() {
	// 	for (let i = 0; i < 100; ++i) {
	// 		--this.state.arr[i]
	// 		this.forceUpdate()
	// 	}
	// }

	render() {
		const { arr } = this.state

		return (
			<>
				<div className="bars-container">
					{arr.map((item, index) => (
						<div
							className="bar"
							key={index}
							style={{ height: `${item.val}px` }}
						></div>
					))}
				</div>
				<button onClick={() => this.generateArray()}>Generate New Array</button>
				<button onClick={() => this.mergeSort()}>Merge Sort</button>
			</>
		)
	}
}
