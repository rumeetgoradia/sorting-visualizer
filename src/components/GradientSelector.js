import React, { Component } from "react"
import gradientsList from "../gradients.json"
import { IoIosArrowDown } from "react-icons/io"
import "./styles/gradientselector.css"

export default class GradientSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gradient_name: "",
			color1: "",
			color2: ""
		}
	}

	componentDidMount() {
		this.updateState(this.props.gradient)
		console.log(this.props)
		const color1 = `#${this.props.gradient.substr(0, 6)}`
		const color2 = `#${this.props.gradient.substr(6, 6)}`
		console.log(color1, color2)
		for (let i = 0; i < gradientsList.length; ++i) {
			const gradient = gradientsList[i]
			console.log(gradient)
			if (gradient.color1 === color1 && gradient.color2 === color2) {
				const gradient_name = gradient.name
				this.setState({ gradient_name, color1, color2 })

				return
			}
		}
	}

	updateState = gradient => {
		const color1 = `#${gradient.substr(0, 6)}`
		const color2 = `#${gradient.substr(6, 6)}`
		console.log(color1, color2)
		for (let i = 0; i < gradientsList.length; ++i) {
			const gradientTemp = gradientsList[i]
			console.log(gradientTemp)
			if (gradientTemp.color1 === color1 && gradientTemp.color2 === color2) {
				const gradient_name = gradientTemp.name
				this.setState({ gradient_name, color1, color2 })

				return
			}
		}
	}

	handleChange = event => {
		this.props.change(event)
		this.updateState(event.target.value)
	}

	render() {
		return (
			<>
				<button className="gradient-selector-container">
					<div
						className="inner-gradient-display"
						style={{
							background: `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`
						}}
					>
						{this.state.gradient_name}
						{/* <IoIosArrowDown /> */}
					</div>
				</button>
				<div className="gradient-dropdown-list">
					{gradientsList.map((item, index) => {
						return (
							<div className="gradient-dropdown-option" key={index}>
								<input
									type="radio"
									name="gradient"
									id={item.name}
									value={item.color1.substr(1, 6) + item.color2.substr(1, 6)}
									onChange={this.handleChange}
									checked={
										this.props.gradient ===
										item.color1.substr(1, 6) + item.color2.substr(1, 6)
									}
									style={{
										background: `linear-gradient(to right, ${item.color1}, ${item.color2})`
									}}
								/>
								<label htmlFor={item.name}>{item.name}</label>
							</div>
						)
					})}
				</div>
			</>
		)
	}
}
