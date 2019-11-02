import React, { Component } from "react"
import "./styles/bars.css"

export default class BarsDisplay extends Component {
	constructor(props) {
		super(props)
		this.state = { width: 0, rerender: 1 }
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
	}

	componentDidMount() {
		this.updateWindowDimensions()
		window.addEventListener("resize", this.updateWindowDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions)
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, rerender: 0 }, () => {
			this.setState({ rerender: 1 })
		})
	}

	render() {
		return (
			<section className="bars-container" id="bars-container">
				{this.props.bars.map((item, index) => {
					return (
						<div
							key={index}
							style={{
								height: `${item.val}px`,
								backgroundColor: `${item.color}`,
								width: `${Math.max(
									this.state.width / (2 * this.props.num_bars),
									1
								) * this.state.rerender}px`
							}}
							className="bar"
						></div>
					)
				})}
			</section>
		)
	}
}

// import React from "react"
// import {useState} from 'react';
// import "./styles/bars.css"

// export default function BarsDisplay({ bars }) {
// 	let [width, setWidth] = useState(0);

// 	this.componentDidMount() {
// 		this.updateWindowDimensions();
// 		window.addEventListener('resize', this.updateWindowDimensions);
// 	  }

// 	  componentWillUnmount() {
// 		window.removeEventListener('resize', this.updateWindowDimensions);
// 	  }

// 	  updateWindowDimensions() {
// 		setWidth(window.innerWidth)
// 	  }

// 	return (
// 		<section className="bars-container" id="bars-container">
// 			{bars.map((item, index) => {
// 				return (
// 					<div
// 						key={index}
// 						style={{
// 							height: `${item.val}px`,
// 							backgroundColor: `${item.color}`
// 						}}
// 						className="bar"
// 					></div>
// 				)
// 			})}
// 		</section>
// 	)
// }
